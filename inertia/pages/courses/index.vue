<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import CourseDto from '#dtos/course';
import OrganizationDto from '#dtos/organization';

import AppHead from '~/components/AppHead.vue';
import Table from '~/components/ui/table/Table.vue';
import TableRow from '~/components/ui/table/TableRow.vue';
import TableHead from '~/components/ui/table/TableHead.vue';
import TableHeader from '~/components/ui/table/TableHeader.vue';
import TableBody from '~/components/ui/table/TableBody.vue';
import TableCell from '~/components/ui/table/TableCell.vue';

import DropdownMenu from '~/components/ui/dropdown-menu/DropdownMenu.vue';
import DropdownMenuContent from '~/components/ui/dropdown-menu/DropdownMenuContent.vue';
import DropdownMenuTrigger from '~/components/ui/dropdown-menu/DropdownMenuTrigger.vue';
import DropdownMenuItem from '~/components/ui/dropdown-menu/DropdownMenuItem.vue';
import Button from '~/components/ui/button/Button.vue';

import { EllipsisVertical, Plus } from 'lucide-vue-next';
import { Link } from '@inertiajs/vue3';
import CourseActions from '../CourseActions.vue';

const actions = ref()
const props = defineProps<{
  organization: OrganizationDto;
  courses: CourseDto[];
}>();

const courses = ref<CourseDto[]>(props.courses);


watchEffect(() => {
  courses.value = props.courses;
});
</script>

<template>
  <AppHead :title="'Courses'" :description="`Manage the courses for ${organization.name}`" />

  <div class="w-full max-w-screen-xl mx-auto bg-background border rounded-xl py-4 lg:px-4 mt-4">
    <div class="flex items-center justify-between mb-3">
      <h1 class="text-2xl font-bold px-4">Courses</h1>
      <Button class="sm" variant="ghost" @click="actions.create()">
        <Plus class="w-3 h-3 mr-2" />
        Add Course
      </Button>
    </div>

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Difficulty</TableHead>
          <TableHead>Access</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody v-if="courses?.length">
        <TableRow v-for="course in courses" :key="course.id" class="group">
          <TableCell>
            <Link :href="`/courses/${course.id}`" class="hover:underline">
              {{ course.name }}
            </Link>
          </TableCell>
          <TableCell>{{ course.status?.name }}</TableCell>
          <TableCell>{{ course.difficulty?.name }}</TableCell>
          <TableCell>{{ course.accessLevel?.name }}</TableCell>
          <TableCell>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisVertical class="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem :as="Link" :href="`/courses/${course.id}`">Open</DropdownMenuItem>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      </TableBody>

      <TableBody v-else>
        <TableRow>
          <TableCell :colSpan="5" class="text-center">
            You don't have any courses yet.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <CourseActions ref="actions" :organization="organization" />
  </div>
</template>
