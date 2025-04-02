<script setup lang="ts">
import DifficultyDto from '#dtos/difficulty';
import OrganizationDto from '#dtos/organization';
import { ref, watchEffect } from 'vue';
import { useResourceActions } from '~/composables/resource_actions';
import AppHead from '~/components/AppHead.vue';
import { Plus, Pencil } from 'lucide-vue-next';
import FormInput from '~/components/FormInput.vue';
import FormDialog from '~/components/FormDialog.vue';
import Button from '~/components/ui/button/Button.vue';

const props = defineProps<{
    difficulties: DifficultyDto[]
    organization: OrganizationDto
}>()

const list = ref(props.difficulties)
const { form, dialog, destroy, onSuccess } = useResourceActions<DifficultyDto>()({
    name: '',
    color: '#818cf8'
})

watchEffect(() => (list.value = props.difficulties))

function onEdit(resource: DifficultyDto){
    dialog.value.open(resource, {
        name: resource.name,
        color: resource.color
    })
}


</script>

<template>
    <AppHead title="Difficulties" :description="`Manage the difficulties of ${organization?.name || 'Organization'}`" />

    <div class="w-full max-w-2xl mx-auto bg-slate-200 mt-4 rounded-xl p-4">
        <div class="flex items-center justify-between mb-3">
            <h1 class="text-2xl font-bold px-4">Difficulties</h1>

            <Button class="sm" variant="ghost" @click="dialog.open()">
                <Plus class="w-3 h-3 mr-2" />
                Add Difficulty
            </Button>
        </div>

        <ul class="flex flex-col">
            <li v-for="item in list" :key="item.id"
                class="flex items-center justify-between rounded-md px-3 py-1.5 hover:bg-slate-100 duration-300 group ">
                <div class="flex items-center gap-4">
                    <div class="w-3 h-3 rounded-full bg-slate-100" :style="{ backgroundColor: item.color }"></div>
                    <span class="font-bold">{{ item.name }}</span>
                    <span v-if="item.is_default" class="text-sm text-slate-400">(Default)</span>
                </div>

                <div class="flex gap-2 opacity-0 group-hover:opacity-100 duration-300">
                    <Button size="sm" @click="onEdit(item)">
                        <Pencil class="w-3 h-3 text-white" aria-label="Edit Difficulty" />
                    </Button>
                </div>
            </li>
        </ul>

        <FormDialog resource="Difficulty"
        v-model:open="dialog.isOpen"
        :editing="dialog.resource?.id"
        :processing="form.processing"
        @create="form.post('/difficulties', { onSuccess })"
        @update="form.put(`/difficulties/${dialog.resource?.id}`, {onSuccess})"
        >
            <FormInput label="Name" v-model="form.name" :error="form.errors.name" />
            <FormInput type="color" label="Color" v-model="form.color" :error="form.errors.color" />
        </FormDialog>
    </div>
</template>