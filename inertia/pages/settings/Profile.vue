<script setup lang="ts">
import AppHead from '~/components/AppHead.vue';
import {useForm } from '@inertiajs/vue3';
import SettingsShell from '~/components/SettingsShell.vue';
import Card from '~/components/ui/card/Card.vue';
import CardHeader from '~/components/ui/card/CardHeader.vue';
import CardTitle from '~/components/ui/card/CardTitle.vue';
import CardDescription from '~/components/ui/card/CardDescription.vue';
import CardContent from '~/components/ui/card/CardContent.vue';
import FormInput from '~/components/FormInput.vue';
import UserDto from '#dtos/user';
import CardFooter from '~/components/ui/card/CardFooter.vue';
import { Loader } from 'lucide-vue-next';
import Button from '~/components/ui/button/Button.vue';

const props = defineProps<{
    user: UserDto
}>()

const form = useForm({
    fullname: props.user.fullname
})

const formConfig = {
    preserveScroll: true,
    onSuccess: () => {
        form.defaults({
            fullname: props.user.fullname
        })
        form.reset()
    }
}
</script>

<template>
    <AppHead title="Profile Settings" description="Manage Your Profile" />
    
    <SettingsShell>
        <Card>
            <CardHeader>
                <CardTitle>Update Profile</CardTitle>
                <CardDescription>Update your profile.</CardDescription>
            </CardHeader>

            <CardContent>
                <form id="profileForm" @submit.prevent="form.put('/settings/profile', formConfig)">
                    <FormInput v-model="form.fullname" label="Full Name" :error="form.errors.fullname"/>
                </form>
            </CardContent>

            <CardFooter class="border-t px-6 py-4">
                <Button type="submit" form="profileForm" class="bg-black text-white hover:bg-zinc-700">
                    <Loader v-if="form.processing" class="mr-2 h-4 w-4 animate-spin" />
                    Update Profile
                </Button>
            </CardFooter>
        </Card>
    </SettingsShell>
</template>