<script setup lang="ts">
import { useForm } from '@inertiajs/vue3';
import { Info, Loader } from 'lucide-vue-next';
import AppHead from '~/components/AppHead.vue';
import FormInput from '~/components/FormInput.vue';
import Alert from '~/components/ui/alert/Alert.vue';
import AlertDescription from '~/components/ui/alert/AlertDescription.vue';
import AlertTitle from '~/components/ui/alert/AlertTitle.vue';
import Button from '~/components/ui/button/Button.vue';
import AuthLayout from '~/layouts/AuthLayout.vue';
defineOptions({ layout: AuthLayout })

defineProps<{isSent: boolean}>()

const form = useForm({
    email: ''
})
</script>


<template>
    <AppHead title="Forgot Your Password ?" description="Reset your password" />

    <div class="w-full h-screen flex items-center justify-center tracking-tight">
        <div class="bg-white w-[450px] h-[480px] rounded-xl shadow-md p-8 opacity-90">
            <h1 class="text-[1.8rem] font-semibold">Forgot Your Password ?</h1>
            <p class="mb-4">Enter your email below, if we find the matching email we will send you a password reset link.</p>

            <Alert v-if="isSent">
                <Info class="w-4 h-4" />
                <AlertTitle>Please Check Your Email</AlertTitle>
                <AlertDescription>We have sent a password reset link to your email. Please check your email and click on the link to reset your password.</AlertDescription>
            </Alert>

            <form @submit.prevent="form.post('/forgot-password', {onSuccess: () => form.reset(), preserveScroll: true})">
                <label class="mb-2 block">Enter Your Email</label>
                <input type="email" label="Email" v-model="form.email" :error="form.errors.email" class="w-full px-3 py-2 mb-2 border rounded-"></input>
                    <Button type="submit" :disable="form.processing" class="text-white bg-black w-full">
                        <Loader v-if="form.processing" class="mr-2 w-4 h-4 animate-spin" />
                        Email Reset Link
                    </Button>
            </form>
        </div>
    </div>
</template>