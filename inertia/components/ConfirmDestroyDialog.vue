<script setup lang='ts'>
import { computed } from 'vue';
import { Link } from '@inertiajs/vue3';

import AlertDialog from './ui/alert-dialog/AlertDialog.vue';
import AlertDialogHeader from './ui/alert-dialog/AlertDialogHeader.vue';
import AlertDialogTitle from './ui/alert-dialog/AlertDialogTitle.vue';
import AlertDialogDescription from './ui/alert-dialog/AlertDialogDescription.vue';
import AlertDialogFooter from './ui/alert-dialog/AlertDialogFooter.vue';
import AlertDialogContent from './ui/alert-dialog/AlertDialogContent.vue';
import AlertDialogCancel from './ui/alert-dialog/AlertDialogCancel.vue';
import AlertDialogAction from './ui/alert-dialog/AlertDialogAction.vue';
import Button from './ui/button/Button.vue';

const props = withDefaults(defineProps<{
    open: boolean
    title?: string 
    cancelText?: string
    actionText?: string
    actionHref: string
    actionData?: Record<string, any>
}>(), {
    cancelText: 'Cancel',
    actionText: 'Delete'
})

const emit = defineEmits(['update:open', 'confirm'])

const internalOpen = computed({
     get: () => props.open,
     set: (value) => emit('update:open', value)
})
</script>

<template>
    <AlertDialog v-model:open="internalOpen">
        <AlertDialogContent class="bg-white">
            <AlertDialogHeader>
                <AlertDialogTitle v-if="title">{{ title }}</AlertDialogTitle>
                <AlertDialogDescription>
                    <slot />
                </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
                <AlertDialogCancel>{{ cancelText }}</AlertDialogCancel>
                <AlertDialogAction as-child>
                    <Link v-if="actionHref" :href="actionHref" method="delete" :data="actionData" as="button" preserve-scroll>{{ actionText }}</Link>
                    <Button v-else type="button" variant="destructive" @click="emit('confirm')">{{ actionText }}</Button>
                </AlertDialogAction>
            </AlertDialogFooter>

        </AlertDialogContent>
    </AlertDialog>
</template>