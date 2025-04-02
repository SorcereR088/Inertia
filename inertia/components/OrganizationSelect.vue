<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { router } from '@inertiajs/vue3';
import { ChevronsUpDown } from 'lucide-vue-next';
import Button from './ui/button/Button.vue';
import OrganizationDto from '#dtos/organization';
import DropdownMenu from './ui/dropdown-menu/DropdownMenu.vue';
import DropdownMenuTrigger from './ui/dropdown-menu/DropdownMenuTrigger.vue';
import DropdownMenuContent from './ui/dropdown-menu/DropdownMenuContent.vue';
import DropdownMenuLabel from './ui/dropdown-menu/DropdownMenuLabel.vue';
import DropdownMenuSeparator from './ui/dropdown-menu/DropdownMenuSeparator.vue';
import DropdownMenuRadioGroup from './ui/dropdown-menu/DropdownMenuRadioGroup.vue';
import DropdownMenuRadioItem from './ui/dropdown-menu/DropdownMenuRadioItem.vue';
import DropdownMenuItem from './ui/dropdown-menu/DropdownMenuItem.vue';
import FormDialog from './FormDialog.vue';
import FormInput from './FormInput.vue';
import { useResourceActions } from '~/composables/resource_actions';
import ConfirmDestroyDialog from './ConfirmDestroyDialog.vue';

const props = defineProps<{
    organization: OrganizationDto
    organizations: OrganizationDto[]
}>()

const organizationId = ref(props.organization.id.toString())

const { form, dialog, destroy, onSuccess } = useResourceActions<OrganizationDto>()({
    name: '',
})

function onOrganizationChange(activeId: string) {
    router.get(`/organizations/${activeId}`)
}

watchEffect(() => (organizationId.value = props.organization.id.toString()))

</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button variant="ghost">
                {{ organization.name }}
                <ChevronsUpDown class="w-4 h-4 ml-2" />
            </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
            <DropdownMenuLabel>
                Your Organizations ({{ organizations.length }})
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuRadioGroup v-model="organizationId" @update:modelValue="onOrganizationChange">
                <DropdownMenuRadioItem v-for="org in organizations" :key="org.id" :value="org.id.toString()">
                    {{ org.name }}
                </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>

            <DropdownMenuSeparator />
            <DropdownMenuItem @click="dialog.open(organization, { name: organization.name })"><span
                    class="text-orange-500 cursor-pointer font-semibold">Edit:</span> {{ organization.name
                    }}</DropdownMenuItem>

            <DropdownMenuItem @click="destroy.open(organization)"><span
                    class="text-red-500 cursor-pointer font-semibold">Delete:</span> {{
                        organization.name }}</DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem @click="dialog.open()">Add Organization</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>



    <FormDialog resource="Organization" v-model:open="dialog.isOpen" :editing="dialog.resource?.id"
        :processing="form.processing" @create="form.post('/organizations', { onSuccess })"
        @update=" form.put(`/organizations/${organization.id}`, { onSuccess })">
        <FormInput label="Name" v-model="form.name" :error="form.errors.name" />
    </FormDialog>
    
    <ConfirmDestroyDialog 
    v-model:open="destroy.isOpen" 
    title="Delete Organization ?"
    :action-href="`/organizations/${destroy.resource?.id}`">
    Are you sure you'd like to delete your <strong>{{ destroy.resource?.name }}</strong> organization? All data
    associated with this organization, including courses and lessons, will all be deleted forever.
</ConfirmDestroyDialog>
</template>