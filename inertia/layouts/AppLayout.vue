<script setup lang="ts">
import UserDto from '#dtos/user';
import Navigation from '~/components/Navigation.vue';
import DropdownMenu from '~/components/ui/dropdown-menu/DropdownMenu.vue';
import DropdownMenuTrigger from '~/components/ui/dropdown-menu/DropdownMenuTrigger.vue';
import DropdownMenuContent from '~/components/ui/dropdown-menu/DropdownMenuContent.vue';
import DropdownMenuSeparator from '~/components/ui/dropdown-menu/DropdownMenuSeparator.vue';
import DropdownMenuItem from '~/components/ui/dropdown-menu/DropdownMenuItem.vue';
import DropdownMenuLabel from '~/components/ui/dropdown-menu/DropdownMenuLabel.vue';
import Button from '~/components/ui/button/Button.vue';
import { UserCircle } from 'lucide-vue-next';
import { Link } from '@inertiajs/vue3';
import ToastManager from '~/components/ToastManager.vue';
import OrganizationDto from '#dtos/organization';

const props = defineProps<{
    organization: OrganizationDto
    organizations: OrganizationDto[]
    user: UserDto
    messages: Record<string,string | Record<string, string>>
}>();

</script>

<template>
    <div class="flex min-h-screen w-full flex-col">
        <header class="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 mb-4">
            
            <Navigation v-bind="props" />
            <div class="flex flex-1 items-center justify-end">
                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <Button variant="secondary" size="icon" class="rounded-full">
                            <UserCircle class="w-5 h-5" />
                            <span class="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>{{user.fullname}}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem as-child>
                            <Link href="/settings/profile">Profile Settings</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem as-child>
                            <Link href="/settings/account">Account Settings</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem as-child>
                            <Link href="/settings/organization">Organization Settings</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem :as="Link" href="/logout" method="post">Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
        
        <slot class="flex flex-1">
            
        </slot>

        <ToastManager :messages="messages"/>
    </div>
</template>
