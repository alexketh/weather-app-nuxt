<template>
  <div class="max-w-4xl mx-auto p-4">
    <div class="grid gap-6">
      <!-- Current Weather Card -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <!-- Temperature Controls -->
        <div class="flex justify-between items-center mb-6">
          <!-- Unit Toggle -->
          <UnitToggle v-model="unit" />

          <!-- Location Button -->
          <button
            @click="getLocationWeather"
            class="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            :disabled="isLoadingLocation"
          >
            <LoadingSpinner v-if="isLoadingLocation" />
            <LocationIcon v-else />
            <span>My Location</span>
          </button>
        </div>

        <!-- Error Alert -->
        <div v-if="error" class="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{{ error }}</p>
        </div>

        <!-- Search Form -->
        <form @submit.prevent="searchWeather" class="mb-6">
          <div class="flex gap-2">
            <input
              v-model="city"
              type="text"
              placeholder="Enter city name"
              class="flex-1 p-2 border rounded"
              :class="{ 'border-red-500': error }"
              :disabled="isLoading"
            />
            <button
              type="submit"
              class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
              :disabled="isLoading"
            >
              <LoadingSpinner v-if="isLoading" />
              <span>{{ isLoading ? 'Searching...' : 'Search' }}</span>
            </button>
          </div>
        </form>

        <!-- Loading Skeleton -->
        <WeatherSkeleton v-if="isLoading" />

        <!-- Current Weather -->
        <div v-else-if="weather" class="text-center">
          <h2 class="text-2xl font-bold mb-4">{{ weather.name }}</h2>
          <div class="flex items-center justify-center gap-4 mb-4">
            <WeatherIcon 
              :condition="weather.weather[0].main" 
              :is-day="isDay(weather.sys.sunrise, weather.sys.sunset)"
              class="w-16 h-16"
            />
            <p class="text-4xl">{{ formatTemperature(weather.main.temp) }}</p>
          </div>
          <p class="text-gray-600 capitalize mb-6">{{ weather.weather[0].description }}</p>
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-gray-50 p-3 rounded">
              <p class="text-gray-600">Humidity</p>
              <p class="font-bold">{{ weather.main.humidity }}%</p>
            </div>
            <div class="bg-gray-50 p-3 rounded">
              <p class="text-gray-600">Wind Speed</p>
              <p class="font-bold">{{ weather.wind.speed }} m/s</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 5-Day Forecast -->
      <div v-if="forecast || isLoading" class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-xl font-bold mb-4">5-Day Forecast</h3>
        
        <ForecastSkeleton v-if="isLoading" />

        <div v-else class="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div v-for="day in forecast" :key="day.dt" class="bg-gray-50 p-4 rounded-lg text-center">
            <p class="font-semibold mb-2">{{ formatDate(day.dt) }}</p>
            <WeatherIcon 
              :condition="day.weather[0].main"
              :is-day="true"
              class="w-12 h-12 mx-auto mb-2"
            />
            <p class="text-lg font-bold mb-1">{{ formatTemperature(day.main.temp) }}</p>
            <p class="text-sm text-gray-600 capitalize">{{ day.weather[0].description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
const city = ref('')
const weather = ref(null)
const forecast = ref(null)
const error = ref(null)
const isLoading = ref(false)
const isLoadingLocation = ref(false)
const unit = ref('fahrenheit')

// Format date for forecast
const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000)
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

const celsiusToFahrenheit = (celsius) => {
  return (celsius * 9/5) + 32
}

const formatTemperature = (temp) => {
  const temperature = unit.value === 'celsius' ? temp : celsiusToFahrenheit(temp)
  return `${Math.round(temperature)}°${unit.value === 'celsius' ? 'C' : 'F'}`
}

const isDay = (sunrise, sunset) => {
  const now = Math.floor(Date.now() / 1000)
  return now >= sunrise && now <= sunset
}

// Get weather by coordinates
async function getWeatherByCoords(lat, lon) {
  try {
    // Get current weather
    const currentResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${config.public.weatherApiKey}`
    )
    const currentData = await currentResponse.json()
    
    if (!currentResponse.ok) throw new Error(currentData.message)
    weather.value = currentData

    // Get 5-day forecast
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${config.public.weatherApiKey}`
    )
    const forecastData = await forecastResponse.json()
    
    if (!forecastResponse.ok) throw new Error(forecastData.message)
    
    // Filter forecast to get one reading per day
    forecast.value = forecastData.list.filter(reading => 
      reading.dt_txt.includes('12:00:00')
    ).slice(0, 5)
  } catch (err) {
    error.value = err.message || 'Error fetching weather data'
  }
}

// Geolocation handler
async function getLocationWeather() {
  error.value = null
  isLoadingLocation.value = true

  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })

    const { latitude, longitude } = position.coords
    await getWeatherByCoords(latitude, longitude)
  } catch (err) {
    error.value = 'Unable to get your location. Please check your browser settings.'
  } finally {
    isLoadingLocation.value = false
  }
}

async function searchWeather() {
  if (!city.value.trim()) {
    error.value = 'Please enter a city name'
    return
  }

  isLoading.value = true
  error.value = null
  weather.value = null
  forecast.value = null

  try {
    // Get current weather
    const currentResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city.value)}&units=metric&appid=${config.public.weatherApiKey}`
    )
    
    const currentData = await currentResponse.json()

    if (!currentResponse.ok) {
      throw new Error(currentData.message || 'Error fetching weather data')
    }

    weather.value = currentData

    // Get 5-day forecast
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city.value)}&units=metric&appid=${config.public.weatherApiKey}`
    )
    
    const forecastData = await forecastResponse.json()

    if (!forecastResponse.ok) {
      throw new Error(forecastData.message || 'Error fetching forecast data')
    }

    forecast.value = forecastData.list.filter(reading => 
      reading.dt_txt.includes('12:00:00')
    ).slice(0, 5)

  } catch (err) {
    switch (err.message) {
      case 'city not found':
        error.value = 'City not found. Please check the spelling and try again.'
        break
      case 'invalid api key':
        error.value = 'Invalid API key. Please check your configuration.'
        break
      case 'too many requests':
        error.value = 'Too many requests. Please try again later.'
        break
      default:
        error.value = err.message || 'An error occurred while fetching weather data.'
    }
  } finally {
    isLoading.value = false
  }
}

watch(city, () => {
  if (error.value) error.value = null
})

watch(unit, (newUnit) => {
  localStorage.setItem('preferred-temp-unit', newUnit)
})

onMounted(() => {
  const savedUnit = localStorage.getItem('preferred-temp-unit') || 'fahrenheit'
  unit.value = savedUnit
})
</script>

<style scoped>
.weather-icon {
  font-size: 2rem;
  line-height: 1;
}

/* Add smooth transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>