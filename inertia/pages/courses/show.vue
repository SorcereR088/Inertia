<script setup lang="ts">
import CourseDto from '#dtos/course';
import { computed, ref, toRaw, watchEffect } from 'vue';
import Button from '~/components/ui/button/Button.vue';

import AppHead from '~/components/AppHead.vue';
import { Pencil, Trash2 } from 'lucide-vue-next';
import CourseActions from '../CourseActions.vue';
import TagSelector from '~/components/TagSelector.vue';
import OrganizationDto from '#dtos/organization';
import ModuleDto from '#dtos/module';
import SortableModules from '~/components/SortableModules.vue';

const props = defineProps < {
    organization: OrganizationDto
    course: CourseDto
    modules: ModuleDto[]
} > ()

const actions = ref()
const path = computed(() => `/courses/${props.course.id}/tags`)

const internalCourse = ref({ ...props.course})
const internalModules = ref(structuredClone(toRaw(props.modules)))

watchEffect(() =>  (internalCourse.value = {...props.course}))
watchEffect(() => (internalModules.value = structuredClone(toRaw(props.modules))))

</script>
<template>
    <AppHead :title="course.name" :description="`Manage your course ${course.name}`" />
        <div class="w-full max-w-screen-lg mx-auto bg-background border rounded-xl py-4 lg-px-4"> 
            <div class="flex flex-wrap items-center justify-between mb-6">
                <h1 class="text-2xl font-bold px-4">{{ course.name }}</h1>
                <div class="flex items-center justify-end gap-2">
                    <Button size="sm" variant="ghost" @click="actions.edit(internalCourse)">
                        <Pencil class="w-3 h-2 mr-2" /> Edit
                    </Button>

                    <Button size="sm" variant="ghost" class="hover:text-red-500" @click="actions.destroy(internalCourse)">
                        <Trash2 class="w-3 h-2 mr-2" /> Delete
                    </Button>
                </div>
            </div>

            <ul class="grid gap-4 mb-6 px-4">
                <li class="flex items-center gap-3">
                    <div class="w-24">Status</div>
                    <TagSelector v-model="internalCourse.statusId" :options="organization.statuses" :patch="{path, key: 'statusId'}" />
                </li>

                <li class="flex items-center gap-3">
                    <div class="w-24">Difficulty</div>
                    <TagSelector v-model="internalCourse.difficultyId" :options="organization.difficulties" :patch="{path, key: 'difficultyId'}" />
                </li>

                <li class="flex items-center gap-3">
                    <div class="w-24">Access</div>
                    <TagSelector v-model="internalCourse.accessLevelId" :options="organization.accessLevels" :patch="{path, key: 'accessLevelId'}" />
                </li>
            </ul>


            <div class="border-b border-slate-200 text-slate-400 tex-sm p-2 mb-2">
                {{ modules.length }} Modules, {{ course.meta.lessons_count }} Lessons
                <SortableModules v-model="internalModules" :organization="organization" :course="course" />
            </div>
            <CourseActions ref="actions" :organization="organization"></CourseActions>
        </div>
</template>