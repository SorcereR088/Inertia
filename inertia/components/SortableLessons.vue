<script setup lang="ts">
import CourseDto from '#dtos/course';
import ModuleDto from '#dtos/module';
import LessonFormDto from '#dtos/lesson_form'
import Organization from '#models/organization';
import { EllipsisVertical, GripVertical, Pencil, Plus, CalendarClock } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import Sortable from 'vuedraggable'
import Button from './ui/button/Button.vue';
import { useResourceActions } from '~/composables/resource_actions';
import FormDialog from './FormDialog.vue';
import FormInput from './FormInput.vue';
import SelectItem from './ui/select/SelectItem.vue';
import ConfirmDestroyDialog from './ConfirmDestroyDialog.vue';
import { nextTick } from 'vue';
import { DateTime } from 'luxon';
import DatePicker from './DatePicker.vue';

import DropdownMenu from './ui/dropdown-menu/DropdownMenu.vue';
import DropdownMenuContent from './ui/dropdown-menu/DropdownMenuContent.vue';
import DropdownMenuItem from './ui/dropdown-menu/DropdownMenuItem.vue';
import DropdownMenuTrigger from './ui/dropdown-menu/DropdownMenuTrigger.vue';
import LessonDto from '#dtos/lesson';

const props = defineProps<{
  organization: Organization
  course: CourseDto
  modelValue: ModuleDto
}>()

const emit = defineEmits(['update:modelValue', 'end'])
const dialogFocusEl = ref()

const module = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const { form, dialog, destroy, onSuccess } = useResourceActions<LessonDto>()<LessonFormDto>({
  name: '',
  statusId: props.organization.statuses.at(0)?.id,
  accessLevelId: props.organization.accessLevels.at(0)?.id,
  moduleId: module.value.id,
  publishAtDate: null,
  publishAtTime: null,
})

function onCreate() {
  dialog.value.open()
  nextTick(() => dialogFocusEl.value.inputEl.$el.focus())
}

function onEdit(resource: LessonDto) {
  dialog.value.open(resource, new LessonFormDto(resource))
  nextTick(() => dialogFocusEl.value.inputEl.$el.focus())
}

function onSubmit() {
  const id = dialog.value.resource?.id
  const action = form.transform(({ publishAtDate, publishAtTime, ...data }) => ({
    ...data,
    publishAt:
      publishAtDate && publishAtTime
        ? DateTime.fromISO([publishAtDate, publishAtTime].join('T')).toUTC()
        : null,
  }))

  if (id) {
    return action.put(`/lessons/${id}`, { onSuccess, preserveScroll: true })
  }

  action.post(`/lessons`, { onSuccess, preserveScroll: true })
}
</script>

<template>
  <Sortable
    v-model="module.lessons"
    item-key="id"
    tag="ul"
    group="lessons"
    handle=".handle"
    @end="$emit('end')"
  >
    <template #item="{ element: lesson }">
      <li class="flex flex-wrap items-center justify-between gap-2 rounded-md px-2 py-1.5 hover:bg-slate-50 duration-300 group relative">
        <div class="flex-1 max-w-full flex items-center gap-4">
          <div class="text-slate-400 hover:text-slate-950 handle cursor-move opacity-0 group-hover:opacity-100 duration-300">
            <GripVertical class="w-4 h-4" />
          </div>
          <span class="text-slate-400 slashed-zero w-[3ch] text-sm handle cursor-move">
            {{ module.order }}.{{ lesson.order }}
          </span>
          <span class="text-sm text-black">{{ lesson.name }}</span>

          <span
            v-if="lesson.publishAt"
            class="text-slate-400 text-xs hidden lg:flex items-center gap-2"
          >
            <CalendarClock class="w-3 h-3" />
            {{ DateTime.fromISO(lesson.publishAt).toRelative() }}
          </span>

          <div class="opacity-0 group-hover:opacity-100 duration-300 ml-2 relative">
            <Button
              variant="ghost"
              size="icon"
              class="absolute left-0 top-1/2 -translate-y-1/2 w-7 h-7"
              @click="onEdit(lesson)"
            >
              <Pencil class="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        <div class="flex gap-2 items-center justify-end">
          <TagSelector
            v-model="lesson.accessLevelId"
            :options="organization.accessLevels"
            :patch="{ path: `/lessons/${lesson.id}/tags`, key: 'accessLevelId' }"
          />

          <TagSelector
            v-model="lesson.statusId"
            :options="organization.statuses"
            :patch="{ path: `/lessons/${lesson.id}/tags`, key: 'statusId' }"
          />

          <DropdownMenu>
            <DropdownMenuTrigger class="ml-2 text-slate-400 hover:text-slate-950 duration-300">
              <EllipsisVertical class="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem @click="onEdit(lesson)">Edit</DropdownMenuItem>
              <DropdownMenuItem @click="destroy.open(lesson)">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </li>
    </template>
  </Sortable>

  <ul>
    <li class="px-2 ml-[3ch]">
      <Button variant="ghost" size="sm" class="flex gap-2" @click="onCreate">
        <Plus class="w-4 h-4" />
        Add Lesson
      </Button>
    </li>
  </ul>

  <FormDialog
    resource="Lesson"
    v-model:open="dialog.isOpen"
    :editing="dialog.resource?.id"
    :processing="form.processing"
    @create="onSubmit"
    @update="onSubmit"
  >
    <FormInput
      ref="dialogFocusEl"
      label="Name"
      v-model="form.name"
      :error="form.errors.name"
      placeholder="My Cool Lesson"
    />

    <FormInput
      type="group"
      label="Publish At"
      :error="form.errors.publishAtDate || form.errors.publishAtTime"
    >
      <DatePicker v-model:date="form.publishAtDate" v-model:time="form.publishAtTime" />
    </FormInput>

    <FormInput
      type="select"
      label="Access Level"
      v-model="form.accessLevelId"
      :error="form.errors.accessLevelId"
    >
      <SelectItem
        v-for="level in props.organization.accessLevels"
        :key="level.id"
        :value="level.id"
      >
        {{ level.name }}
      </SelectItem>
    </FormInput>

    <FormInput type="select" label="Status" v-model="form.statusId" :error="form.errors.statusId">
      <SelectItem v-for="status in props.organization.statuses" :key="status.id" :value="status.id">
        {{ status.name }}
      </SelectItem>
    </FormInput>
  </FormDialog>

  <ConfirmDestroyDialog
    v-model:open="destroy.isOpen"
    title="Delete Lesson?"
    :action-href="`/lessons/${destroy.resource?.id}`"
  >
    Are you sure you'd like to delete your
    <strong>{{ destroy.resource?.name }}</strong> lesson? All this lesson's data will be deleted
    forever.
  </ConfirmDestroyDialog>
</template>