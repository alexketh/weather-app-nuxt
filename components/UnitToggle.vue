<template>
  <div class="inline-flex rounded-lg border border-gray-200">
    <button
      @click="updateUnit('celsius')"
      class="px-4 py-2 text-sm rounded-l-lg"
      :class="modelValue === 'celsius' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'"
    >
      °C
    </button>
    <button
      @click="updateUnit('fahrenheit')"
      class="px-4 py-2 text-sm rounded-r-lg"
      :class="modelValue === 'fahrenheit' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'"
    >
      °F
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
    validator: (value) => ['celsius', 'fahrenheit'].includes(value)
  }
})

const emit = defineEmits(['update:modelValue'])

const updateUnit = (newUnit) => {
  emit('update:modelValue', newUnit)
}
</script>