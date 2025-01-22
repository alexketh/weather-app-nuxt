<template>
  <div class="weather-icon">{{ getIcon }}</div>
</template>

<script setup>
const props = defineProps({
  condition: {
    type: String,
    required: true
  },
  isDay: {
    type: Boolean,
    default: true
  }
})

const iconMap = {
  Clear: props.isDay ? '☀️' : '🌙',
  Clouds: '☁️',
  Rain: '🌧️',
  Drizzle: '🌦️',
  Thunderstorm: '⛈️',
  Snow: '🌨️',
  Mist: '🌫️',
  Smoke: '🌫️',
  Haze: '🌫️',
  Dust: '🌫️',
  Fog: '🌫️',
  Sand: '🌫️',
  Ash: '🌫️',
  Squall: '💨',
  Tornado: '🌪️'
}

const getIcon = computed(() => iconMap[props.condition] || '❓')
</script>

<style scoped>
.weather-icon {
  font-size: 2rem;
  line-height: 1;
}
</style>