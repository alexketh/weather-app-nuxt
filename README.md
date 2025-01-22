# Weather App

A modern weather application built with Nuxt.js that provides current weather conditions and 5-day forecasts. Features include geolocation support, temperature unit conversion, and real-time weather updates.

## Features

- 🌡️ Current weather conditions
- 📅 5-day weather forecast
- 🌍 Geolocation support
- 🔄 Temperature unit conversion (°F/°C)
- 📱 Responsive design
- ⚡ Real-time updates
- 🎨 Loading states and animations

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- OpenWeatherMap API key

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/weather-app.git
cd weather-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
```env
NUXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
weather-app/
├── components/
│   ├── icons/
│   │   ├── LocationIcon.vue
│   │   ├── SpinnerIcon.vue
│   │   └── index.js
│   ├── LoadingSpinner.vue
│   ├── WeatherIcon.vue
│   ├── UnitToggle.vue
│   ├── WeatherSkeleton.vue
│   └── ForecastSkeleton.vue
├── pages/
│   └── index.vue
├── .env
├── nuxt.config.ts
└── package.json
```

## Key Components

- `UnitToggle`: Handles temperature unit conversion (°F/°C)
- `WeatherIcon`: Displays weather condition icons
- `LoadingSpinner`: Shows loading state animations
- `WeatherSkeleton`: Provides loading placeholder for weather data
- `ForecastSkeleton`: Provides loading placeholder for forecast data

## Features in Detail

### Current Weather
- Temperature
- Weather condition
- Humidity
- Wind speed

### 5-Day Forecast
- Daily temperature
- Weather condition
- Weather icons
- Date display

### Geolocation
- Automatic location detection
- Manual city search
- Error handling for location services

### Unit Conversion
- Fahrenheit (default)
- Celsius
- Persistent unit preference

## API Integration

This app uses the OpenWeatherMap API for weather data:
- Current weather endpoint: `/data/2.5/weather`
- 5-day forecast endpoint: `/data/2.5/forecast`

## Error Handling

The app includes comprehensive error handling for:
- Invalid city names
- API errors
- Geolocation errors
- Network issues
- Loading states

## Building for Production

1. Build the application:
```bash
npm run build
```

2. Preview the production build:
```bash
npm run preview
```

## Deployment

### GitHub Pages

1. Update `nuxt.config.ts` with your repository name:
```typescript
app: {
  baseURL: '/your-repo-name/'
}
```

2. Set up GitHub Actions:
- Add your OpenWeatherMap API key to your repository's secrets as `WEATHER_API_KEY`
- The included GitHub Actions workflow will automatically deploy to GitHub Pages

3. Enable GitHub Pages:
- Go to your repository settings
- Under "Pages", select the "gh-pages" branch as the source
- Your site will be available at `https://yourusername.github.io/your-repo-name/`

### Other Platforms

The app can also be deployed to other platforms:

1. Static hosting (Netlify, Vercel):
```bash
npm run generate
```

2. Server hosting:
```bash
npm run build
```

Remember to set your environment variables on your hosting platform.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [OpenWeatherMap API](https://openweathermap.org/api) for weather data
- [Nuxt.js](https://nuxt.com/) for the framework
- [Tailwind CSS](https://tailwindcss.com/) for styling

## Support

For support, please open an issue in the GitHub repository or contact the maintenance team.