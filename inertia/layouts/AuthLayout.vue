<script setup lang="ts">
import ToastManager from '~/components/ToastManager.vue';

defineProps<{
  messages: Record<string, string | Record<string, string>>
}>()
</script>

<template>
  <div>
    <header class="absolute top-0 ">
      <nav class="w-full flex items-center justify-between p-8 lg:px-8">
        <div class="flex lg:flex-1">
          <a href="/" class="-m-1.5 p-1.5">
            <span class="sr-only">PlotMyCourse</span>
          </a>
        </div>
        <div v-if="!$page.url.includes('/organizations')" class="flex flex-1 justify-end gap-4">
          <Link href="/register" class="text-sm font-semibold leading-6 text-slate-900">
          Register
          </Link>
          <Link href="/login" class="text-sm font-semibold leading-6 text-slate-900"> Login </Link>
        </div>
      </nav>
    </header>
    <div class="">
      <slot></slot>
    </div>


    <ToastManager :messages="messages" />
  </div>
</template>
