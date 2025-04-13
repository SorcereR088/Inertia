<script setup lang="ts">
import CourseDto from '#dtos/course';
import ModuleDto from '#dtos/module';
import Organization from '#models/organization';
import { EllipsisVertical, GripVertical, Pencil, Plus } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import Sortable from 'vuedraggable'
import Button from './ui/button/Button.vue';
import { useResourceActions } from '~/composables/resource_actions';
import FormDialog from './FormDialog.vue';
import FormInput from './FormInput.vue';
import SelectItem from './ui/select/SelectItem.vue';
import ConfirmDestroyDialog from './ConfirmDestroyDialog.vue';
import { nextTick } from 'vue';

import DropdownMenu from './ui/dropdown-menu/DropdownMenu.vue';
import DropdownMenuContent from './ui/dropdown-menu/DropdownMenuContent.vue';
import DropdownMenuItem from './ui/dropdown-menu/DropdownMenuItem.vue';
import DropdownMenuTrigger from './ui/dropdown-menu/DropdownMenuTrigger.vue';

const props = defineProps<{
    organization: Organization
    course: CourseDto
    modelValue: ModuleDto
}>()

const emit = defineEmits(['update:modelValue'])
const prefixUrl = computed(() => `/courses/${props.course.id}`)
const dialogFocusEl = ref()

const module = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})

const { form, dialog, destroy, onSuccess } = useResourceActions<ModuleDto>()({
    name: '',
    statusId: props.organization.statuses.at(0)?.id
})

function onCreate() {
    dialog.value.open()
    nextTick(() => dialogFocusEl.value.inputEl.$el.focus())
}
function onEdit(resource: ModuleDto) {
    dialog.value.open(resource, {
        name: resource.name,
        statusId: resource.statusId
    })
    nextTick(() => dialogFocusEl.value.inputEl.$el.focus())
}

</script>
<template>
    <Sortable v-model="module.lessons" item-key="id" tag="ul" group="lessons" handle=".handle">
        <template #item="{ element: lesson}">
            <li class="flex flex-col border-b border-slate-200 pb-2 mb-2">
                <div
                    class="flex items-center justify-between rounded-md p-2 hover:bg-slate-50 duration-300 group relative ">
                    <div class="flex items-center gap-4">

                        <div
                            class="text-slate-400 hover:text-slate-950 handle cursor-move opacity-0 group-hover:opacity-100 duration-300 pl-2 ">
                            <GripVertical class="w-4 h-4" />
                        </div>
                        <span class="text-slate-400 slashed-zero w-[3ch] text-sm handle cursor-move">
                            {{ module.order }}/{{ lesson.order }}
                        </span>

                        <span class="font-bold text-slate-700">{{ lesson.name }}</span>

                        <div class="opacity-0 group-hover:opacity-100 duration-300 ml-2 relative">
                            <Button variant="ghost" size="icon"
                                class="absolute left-0 top-1/2 -translate-y-1/2 w-7 h-7"
                                @click="onEdit(lesson)"
                                >
                                <Pencil class="w-3.5 h-3.5" />
                            </Button>
                        </div>
                    </div>
                    <div class="flex gap-2 items-center justify-end ">
                        <DropdownMenu>
                            <DropdownMenuTrigger class="ml-2 text-slate-400 hover:text-slate-950 duration-300">
                                <EllipsisVertical class="w-4 h-4"/>

                                <DropdownMenuContent class="bg-white">
                                    <DropdownMenuItem @click="onEdit(lesson)">Edit</DropdownMenuItem>
                                    <DropdownMenuItem @click="destroy.open(lesson)">Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenuTrigger>
                        </DropdownMenu>
                    </div>
                </div>
            </li>
        </template>
    </Sortable>

    <Button variant="ghost" size="sm" class="flex gap-2" @click="onCreate">
        <Plus class="w-4 h-4" />
        Add Lesson
    </Button>

    <FormDialog resource="Lesson"
        v-model:open="dialog.isOpen"
        :editing="dialog.resource?.id"
        :processing="form.processing"
        @create="form.post(`/lessons`), {onSuccess, preserveScroll: true}"
        @update="form.put(`/lesson/${dialog.resource?.id}`,{onSuccess, preserveScroll: true})">

        <FormInput ref="dialogFocusEl" label="Name" v-model="form.name" :error="form.errors.name"
            placeholder="My Module" />

        <FormInput type="select" label="Access Label" v-model="form.accessLevelId" :error="form.errors.accessLevelId">
            <SelectItem v-for="label in props.organization.accessLevels" :key="level.id" :value="level.id">
                {{ level.name }}
            </SelectItem>
        </FormInput>

        <FormInput type="select" label="Status" v-model="form.statusId" :error="form.errors.statusId">
            <SelectItem v-for="status in props.organization.statuses" :key="status.id" :value="status.id">
                {{ status.name }}
            </SelectItem>
        </FormInput>

        <ConfirmDestroyDialog v-model:open="destroy.isOpen" title="Delete Module?"
            :action-href="`/lessons/${destroy.resource?.id}`">
            Are you sure you'd like to your <strong>{{ destroy.resource?.name }}</strong> lesson ? All the modules data
            including lessons, will be deleted forever.
        </ConfirmDestroyDialog>
    </FormDialog>
</template>