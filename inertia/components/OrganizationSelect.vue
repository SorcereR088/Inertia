<script setup lang="ts">
import OrganizationDto from '#dtos/organization';
import DropdownMenu from './ui/dropdown-menu/DropdownMenu.vue';
import DropdownMenuTrigger from './ui/dropdown-menu/DropdownMenuTrigger.vue';
import Button from './ui/button/Button.vue';
import { ChevronsUpDown } from 'lucide-vue-next';
import DropdownMenuContent from './ui/dropdown-menu/DropdownMenuContent.vue';
import DropdownMenuLabel from './ui/dropdown-menu/DropdownMenuLabel.vue';
import DropdownMenuSeparator from './ui/dropdown-menu/DropdownMenuSeparator.vue';
import DropdownMenuRadioGroup from './ui/dropdown-menu/DropdownMenuRadioGroup.vue';
import { ref } from 'vue';
import DropdownMenuRadioItem from './ui/dropdown-menu/DropdownMenuRadioItem.vue';

const props = defineProps<{
    organization: OrganizationDto
    organizations: OrganizationDto[]
}>()

const organizationId = ref(props.organization.id.toString())
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
            <DropdownMenuRadioGroup v-model="organizationId">
                <DropdownMenuRadioItem v-for="org in organizations" :key="org.id" :value="org.id.toString()">
                    {{ org.name }}
                </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
        </DropdownMenuContent>
    </DropdownMenu>
</template>