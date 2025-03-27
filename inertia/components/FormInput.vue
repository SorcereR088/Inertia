<script lang="ts" setup>
import { computed, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    label?: string
    type: string
    modelValue?: string | number
    placeholder?: string
    error?: string
    disabled?: boolean
    required?: boolean
  }>(),
  {
    type: 'text',
  }
)

const emit = defineEmits(['update:modelValue'])

const inputEl = ref()

const internalValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

defineExpose({
  inputEl,
})
</script>
<template>
  <div class="grid gap-1">
    <Label class="grid gap-2">
      <span>{{ label }}</span>
      <slot v-if="type === 'group'" />
      <div v-else-if="type === 'color'" class="relative w-full items-center">
        <input
          v-model="internalValue"
          type="color"
          class="absolute start-2 inset-y-2 w-6 rounded"
          :disabled="disabled"
        />
        <input
          ref="inputEl"
          v-model="internalValue"
          class="p-10"
          :disabled="disabled"
          :required="required"
        />
      </div>
      <Input
        :class="{ 'border-red-500': error }"
        v-else
        v-model="internalValue"
        ref="inputEl"
        :type="type"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
      />
    </Label>
    <div v-if="error" class="text-red-500 text-sm">
      {{ error }}
    </div>
  </div>
</template>
