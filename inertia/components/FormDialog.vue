<script setup lang="ts">
import {computed} from 'vue'
import Dialog from './ui/dialog/Dialog.vue';
import DialogContent from './ui/dialog/DialogContent.vue';
import DialogHeader from './ui/dialog/DialogHeader.vue';
import DialogTitle from './ui/dialog/DialogTitle.vue';
import DialogFooter from './ui/dialog/DialogFooter.vue';
import Button from './ui/button/Button.vue';
import { Loader } from 'lucide-vue-next';

const props = defineProps<{
    open: boolean
    editing?: boolean
    processing?: boolean
    resource: string
}>()

const emit = defineEmits(['update:open','update', 'create'])
const internalOpen = computed({
    get: () => props.open,
    set: (value) => emit('update:open', value)
})
</script>

<template>
    <Dialog v-model:open="internalOpen">
        <DialogContent class="sm:max-w-[425px] bg-white">
            <DialogHeader>
                <slot name="title">
                    <DialogTitle v-if="editing">Edit {{ resource }}</DialogTitle>
                    <DialogTitle v-else>Add {{ resource }}</DialogTitle>
                </slot>
            </DialogHeader>

            <form :id="resource" class="grid gap-4 py-4" @submit.prevent="editing ? $emit('update') : $emit('create')">
                <slot></slot>
            </form>

            <DialogFooter>
                <Button type="submit" :form="resource" :disable="processing" class="bg-black text-white hover:bg-zinc-800 ">
                    <Loader v-if="processing" class="mr-2 w-4 h-4 animate-spin" />
                    <span v-if="editing">Update {{ resource }}</span>
                    <span v-else>Add {{ resource }}</span>
                </Button> 
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>