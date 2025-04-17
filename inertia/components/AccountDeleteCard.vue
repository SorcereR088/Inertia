<script setup lang="ts">
import Card from './ui/card/Card.vue';
import CardHeader from './ui/card/CardHeader.vue';
import CardTitle from './ui/card/CardTitle.vue';
import CardDescription from './ui/card/CardDescription.vue';
import CardContent from './ui/card/CardContent.vue';
import FormInput from './FormInput.vue';
import CardFooter from './ui/card/CardFooter.vue';
import Button from './ui/button/Button.vue';
import { Loader } from 'lucide-vue-next';
import { useForm } from '@inertiajs/vue3';

defineProps<{
    email: string
}>()

const form = useForm({
    email: ''
})
</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle>Delete Account</CardTitle>
            <CardDescription>Delete your account and all your data.</CardDescription>
        </CardHeader>

        <CardContent>
            <form id="accountDeleteForm" class="grid gap-4" @submit.prevent="form.delete('/settings/account')">
                <FormInput v-model="form.email" type="email" label="Please confirm your account email to confirm deletion" :error="form.errors.email" :placeholder="email" />
            </form>
        </CardContent>

        <CardFooter class="border-t px-6 py-4">
            <Button form="accountDeleteForm" type="submit" class="bg-red-500 text-white hover:bg-red-600">
                <Loader v-if="form.processing" class="w-4 h-4 mr-2 animate-spin" />
                Delete Account
            </Button>
        </CardFooter>
    </Card>
</template>