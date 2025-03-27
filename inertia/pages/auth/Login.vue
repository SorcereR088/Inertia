<script setup lang="ts">
import Banner from '../../assets/image 1.jpg'
import { useForm } from '@inertiajs/vue3';
import AuthLayout from '~/layouts/AuthLayout.vue';
import { AlertCircle, Loader } from 'lucide-vue-next'
import Alert from '~/components/ui/alert/Alert.vue';
import AlertDescription from '~/components/ui/alert/AlertDescription.vue';
import FormInput from '~/components/FormInput.vue';
import Checkbox from '~/components/ui/checkbox/Checkbox.vue';

defineOptions({ layout: AuthLayout })

const form = useForm({
    email: '',
    password: '',
    remember: false
})

defineProps<{
    exceptions: Record<string, string>
}>()

function onSubmit() {
    form.post('/login',
        { onSuccess: () => form.reset() })

}
</script>

<template>
    <div class="w-full h-screen flex items-center justify-center tracking-tight]"
        :style="{ backgroundImage: `url(${Banner})`, backgroundSize: 'cover', backgroundPosition: 'center' }">
        <div class="bg-white w-[450px] h-[480px] rounded-xl shadow-md p-8 opacity-90">
            <h1 class="text-[1.8rem] font-semibold">Login</h1>
            <p class="text-lg text-gray-600 mb-4">Create an account
                <Link href="/register" class="hover:underline cursor-pointer">Signup</Link>
            </p>

            <form @submit.prevent="onSubmit">
                <Alert v-if="exceptions.E_INVALID_CREDENTIALS" variant="destructive" class="mb-6">
                    <AlertCircle class="w-4 h-4" />
                    <AlertDescription>{{ exceptions.E_INVALID_CREDENTIALS }}</AlertDescription>
                </Alert>

                <label class="block mb-2">Email</label>
                <input class="w-full bg-gray-50 p-2 rounded-md" type="email" v-model="form.email">
                <div v-if="form.errors.email" class="text-red-500 text-sm h-5">{{ form.errors.email }}</div>


                <label class="block mb-2">Password</label>
                <input class="w-full bg-gray-50 p-2 rounded-md" type="password" v-model="form.password">
                <div v-if="form.errors.password" class="text-red-500 text-sm h-5">{{ form.errors.password }}</div>


                <div class="flex items-center justify-between flex-wrap gap-4">
                    <FormInput type="group" :error="form.errors.remember">
                        <div class="flex items-center gap-2">
                            <Checkbox v-model:checked="form.remember" />
                            <span>Remember Me</span>
                        </div>
                    </FormInput>
                </div>


                <button
                    class="bg-black text-white px-3 py-1 rounded-lg font-semibold text-lg mt-4 flex items-center gap-2"
                    type="submit" :disabled="form.processing">
                    <Loader v-if="form.processing" class="mr-2 h-4 w-4 animate-spin" />
                    Login
                </button>
            </form>
        </div>
    </div>
</template>