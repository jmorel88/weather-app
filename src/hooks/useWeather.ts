import { useState } from "react";

export interface Weather {
  name: string;
  weather: {
    description: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

/*
 * In a real world application,
 * this would prpbably be a server side API call,
 * using CORS policy to allow the client to access the endpoint
 * for the sake of this example, we'll expost the API key
 */
const BASE_URL = "https://api.openweathermap.org";

/**
 * Validates a zipCode is provided and 5 digits
 */
const validateZipCode = (zipCode?: string) => {
  if (!zipCode) throw new Error("Zip code is required");
  const zipCodePattern = /^\d{5}$/;
  if (!zipCodePattern.test(zipCode)) throw new Error("Invalid zip code");
};

/**
 * Fetches the coordinates for a given zipCode
 */
const fetchCoordsByZipcode = async (
  zipCode: string,
): Promise<Coordinates> => {
  validateZipCode(zipCode);

  const response = await fetch(
    `${BASE_URL}/geo/1.0/zip?zip=${zipCode}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`,
  );

  const coords = await response.json();

  if (coords.cod === "404") throw Error("Coordinates could not be found");

  return {
    latitude: coords.lat,
    longitude: coords.lon,
  };
};

/**
 * Fetches the coordinates for the current geolocation
 */
const fetchCoordsByGeolocation = (): Promise<Coordinates> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(Error("Geolocation is not supported"));
    }

    navigator.geolocation.getCurrentPosition((position) => {
      resolve({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    }, reject);
  });
};

/**
 * Fetches the weather data for a given set of coordinates
 */
const fetchWeather = async ({ latitude, longitude }: Coordinates) => {
  try {
    const response = await fetch(
      `${BASE_URL}/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=imperial`,
    );

    const data = await response.json();
    return data;
  } catch (e) {
    throw new Error("Weather data could not be fetched");
  }
};

export default function useWeather() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getWeatherByZipCode = async (zipCode: string) => {
    setError(null);
    setLoading(true);
    try {
      const coords = await fetchCoordsByZipcode(zipCode);
      const weather = await fetchWeather(coords);
      setWeather(weather);
    } catch (e) {
      setError(e as Error);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherByGeolocation = async () => {
    setError(null);
    setLoading(true);
    try {
      const coords = await fetchCoordsByGeolocation();
      const weather = await fetchWeather(coords);
      setWeather(weather);
    } catch (e) {
      setError(e as Error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    weather,
    getWeatherByZipCode,
    getWeatherByGeolocation,
  };
}
