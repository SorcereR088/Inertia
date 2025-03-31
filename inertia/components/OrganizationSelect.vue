<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { router, useForm } from '@inertiajs/vue3';
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

const props = defineProps<{
    organization: OrganizationDto
    organizations: OrganizationDto[]
}>()

const organizationId = ref(props.organization.id.toString())
const isDialogOpen = ref(false)

const dialogForm = useForm({
    name: ''
})

function onOrganizationChange(activeId: string){
    router.get(`/organizations/${activeId}`)
}

watchEffect(() => (organizationId.value = props.organization.id.toString()))

function onSubmit() {
    dialogForm.post('/organizations', {
        onSuccess: () => {
            dialogForm.reset()
            isDialogOpen.value = false
        }
    })
}

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

            <DropdownMenuItem @click="isDialogOpen = true">Add Organization</DropdownMenuItem>

            <FormDialog resource="Organization" v-model:open="isDialogOpen" :processing="dialogForm.processing"
                @submit="onSubmit">
                <FormInput label="Name" v-model="dialogForm.name" :error="dialogForm.errors.name" />
            </FormDialog>
        </DropdownMenuContent>
    </DropdownMenu>
</template>