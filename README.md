
# Simple Weather Application

This is a simple weather application built using the Vite React-TS template. The application fetches weather data using the OpenWeatherMap API and displays it in a user-friendly dashboard. It also utilizes the native geolocation API to determine the user's current location.

## Features

- [**Vite React-TS**](https://vitejs.dev/): Fast and optimized development experience.
- [**Tailwind CSS**](https://tailwindcss.com/): Utility-first CSS framework for styling.
- [**OpenWeatherMap API**](https://openweathermap.org/api): Fetches real-time weather data.
- [**Native Geolocation**](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API): Gets the user's current location.
- [**Testing**](https://vitest.dev/): Uses Vitest and React Testing Library for unit and integration tests (Jest compatible).


## Project Structure

- src: Contains the source code.
    - components: React components.
    - hooks: Application hooks.
    - utils: Helper functions.
    - __tests__: Test files.


## Installation and Setup

1. **Clone the repository**:
    ```bash
    git clone https://github.com/jmorel88/weather-app.git
    cd weather-app
    ```
2. **Create .env file and store your openweather API key**
    ```bash
    VITE_WEATHER_API_KEY=<API_KEY>
    ```

2. **Install dependencies**:
    ```bash
    pnpm install
    ```

3. **Start the development server**:
    ```bash
    pnpm dev
    ```

4. **Build for production**:
    ```bash
    pnpm build
    ```

5. **Preview the production build**:
    ```bash
    pnpm preview
    ```


## Testing

To run the tests, use the following command:
```bash
pnpm test
```

