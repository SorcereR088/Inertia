<script setup lang="ts">
import { Link, useForm } from '@inertiajs/vue3';
import { Info, Loader } from 'lucide-vue-next';
import AppHead from '~/components/AppHead.vue';
import Alert from '~/components/ui/alert/Alert.vue';
import AlertDescription from '~/components/ui/alert/AlertDescription.vue';
import AlertTitle from '~/components/ui/alert/AlertTitle.vue';
import Button from '~/components/ui/button/Button.vue';
import AuthLayout from '~/layouts/AuthLayout.vue';
defineOptions({ layout: AuthLayout })

const props = defineProps<{ value: string, isValid: boolean, email: string | null }>()

const form = useForm({
    value: props.value,
    password: ''
})
</script>


<template>
    <AppHead title="Reset Your Password ?" description="Reset your password" />

    <div class="w-full h-screen flex items-center justify-center tracking-tight">
        <div class="bg-white w-[450px] h-[480px] rounded-xl shadow-md p-8 opacity-90">
            <h1 class="text-[1.8rem] font-semibold">Reset Your Password ?</h1>
            <p class="mb-4">Please Enter your new password.</p>

            <div v-if="!isValid">
                <Alert>
                    <Info class="w-4 h-4" />
                    <AlertTitle>Password Reset Link Invalid</AlertTitle>
                    <AlertDescription>This password reset link is invalid or expored. Please try again.
                    </AlertDescription>
                </Alert>

                <Button as-child class="mt-3 fles">
                    <Link href="/forgot-password">Request New Password Reset Link</Link>
                </Button>
            </div>

            <form v-else
                @submit.prevent="form.post('/forgot-password/reset', { onSuccess: () => form.reset(), preserveScroll: true })">
                <label class="mb-2 block">Enter Your Email</label>
                <input type="email" :value="email" class="w-full px-3 py-2 mb-2 border rounded-md" readonly />
                <input type="password" label="Email" v-model="form.password" :error="form.errors.password"
                    class="w-full px-3 py-2 mb-2 border rounded-md" disable></input>
                <Button type="submit" :disable="form.processing" class="text-white bg-black w-full">
                    <Loader v-if="form.processing" class="mr-2 w-4 h-4 animate-spin" />
                    Reset Password
                </Button>
            </form>
        </div>
    </div>
</template>