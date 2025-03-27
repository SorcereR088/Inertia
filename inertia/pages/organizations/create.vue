<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'
import { Loader } from 'lucide-vue-next'
import AuthLayout from '~/layouts/AuthLayout.vue'
import AppHead from '~/components/AppHead.vue'
import FormInput from '~/components/FormInput.vue'
import Button from '~/components/ui/button/Button.vue'

defineOptions({ layout: AuthLayout })

const form = useForm({
    name: '',
})
</script>

<template>
    <div class="w-full h-screen flex items-center justify-center bg-white ">
        <div class="w-1/4 h-auto p-8 bg-gray-50 rounded-lg shadow">
            <AppHead title="Create An Organization" description="Create an organization to hold your courses" />

            <div class="flex flex-col space-y-2 mb-4">
                <h1 class="text-2xl font-semibold tracking-tight">Create An Organization</h1>
                <p class="text-sm text-muted-foreground">
                    To get started, you'll need an organization to hold your courses! You can have a s many
                    organizations as you want.
                </p>
            </div>

            <form @submit.prevent="form.post('/organizations')">
                <div class="grid gap-3">
                    <!-- <FormInput label="Name" v-model="form.name" :error="form.errors.name" /> -->
                    <input class="w-full bg-gray-50 p-2 rounded-md" type="text" v-model="form.name">
                    <div v-if="form.errors.name" class="text-red-500 text-sm h-5">{{ form.errors.name }}</div>
                    <Button :disabled="form.processing" class="text-white">
                        <Loader v-if="form.processing" class="mr-2 h-4 w-4 animate-spin" />
                        Create Organization
                    </Button>
                </div>
            </form>
        </div>
    </div>
</template>