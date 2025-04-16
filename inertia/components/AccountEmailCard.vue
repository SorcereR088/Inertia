<script setup lang="ts">
import { useForm } from '@inertiajs/vue3';
import Card from './ui/card/Card.vue';
import CardHeader from './ui/card/CardHeader.vue';
import CardTitle from './ui/card/CardTitle.vue';
import CardDescription from './ui/card/CardDescription.vue';
import CardContent from './ui/card/CardContent.vue';
import FormInput from './FormInput.vue';
import CardFooter from './ui/card/CardFooter.vue';
import Button from './ui/button/Button.vue';
import { Loader } from 'lucide-vue-next';

defineProps<{
    email: string
}>()

const form = useForm({
    email: '',
    password: ''
})
</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle>Update Email</CardTitle>
            <CardDescription>Update  your account's email</CardDescription>
        </CardHeader>

        <CardContent>
            <form id="accountEmailForm" class="grid gap-4" @submit.prevent="form.put('/settings/account/email', {onSuccess: () => form.reset()})">
                <FormInput v-model="form.email" type="email" label="email" :error="form.errors.email" :placeholder="email" />
                <FormInput  v-model="form.password" type="password" label="Confirm Password" placeholder="Please confirm your password to change email" :error="form.errors.password"/>
            </form>
        </CardContent>

        <CardFooter class="border-t px-6 py-4">
            <Button form="accountEmailForm" type="submit" class="bg-black text-white hover:bg-zinc-800">
                <Loader v-if="form.processing" class="w-4 h-4 mr-2 animate-spin" />
                Update Email
            </Button>
        </CardFooter>
    </Card>
</template>