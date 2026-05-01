import { CurrentWeather, CurrentWeatherSchema, ForecastResponse, ForecastResponseSchema } from "@/types/weather";

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export class WeatherAPIError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "WeatherAPIError";
  }
}

import { z } from "zod";

async function fetchWeather<T>(endpoint: string, schema: z.ZodSchema<T>): Promise<T> {
  if (!API_KEY) {
    throw new WeatherAPIError("Weather API key is not configured");
  }

  const url = `${BASE_URL}${endpoint}&appid=${API_KEY}&units=metric`;
  
  const res = await fetch(url, {
    next: { revalidate: 600 }, // Cache for 10 minutes
  });

  if (!res.ok) {
    if (res.status === 404) {
      throw new WeatherAPIError("City not found", 404);
    }
    if (res.status === 401) {
      throw new WeatherAPIError("Invalid API key", 401);
    }
    if (res.status === 429) {
      throw new WeatherAPIError("API rate limit exceeded", 429);
    }
    throw new WeatherAPIError("Failed to fetch weather data", res.status);
  }

  const data = await res.json();
  
  try {
    return schema.parse(data) as T;
  } catch (error) {
    console.error("API response validation failed:", error);
    throw new WeatherAPIError("Invalid data format received from weather service");
  }
}

export async function getCurrentWeather(city: string): Promise<CurrentWeather> {
  return fetchWeather<CurrentWeather>(`/weather?q=${encodeURIComponent(city)}`, CurrentWeatherSchema);
}

export async function getForecast(city: string): Promise<ForecastResponse> {
  return fetchWeather<ForecastResponse>(`/forecast?q=${encodeURIComponent(city)}`, ForecastResponseSchema);
}

export async function getWeatherByCoords(lat: number, lon: number): Promise<CurrentWeather> {
  return fetchWeather<CurrentWeather>(`/weather?lat=${lat}&lon=${lon}`, CurrentWeatherSchema);
}

export async function getForecastByCoords(lat: number, lon: number): Promise<ForecastResponse> {
  return fetchWeather<ForecastResponse>(`/forecast?lat=${lat}&lon=${lon}`, ForecastResponseSchema);
}
