<template>
  <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
    <div v-for="i in 5" :key="i" class="animate-pulse">
      <div class="h-6 bg-gray-200 rounded mb-3"></div>
      <div class="h-16 w-16 bg-gray-200 rounded-full mx-auto mb-3"></div>
      <div class="h-6 bg-gray-200 rounded w-20 mx-auto"></div>
    </div>
  </div>
</template>