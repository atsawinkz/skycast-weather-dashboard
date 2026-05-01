import { z } from "zod";

// Base schemas for nested objects
const WeatherConditionSchema = z.object({
  id: z.number(),
  main: z.string(),
  description: z.string(),
  icon: z.string(),
});

const CoordinatesSchema = z.object({
  lon: z.number(),
  lat: z.number(),
});

const MainWeatherDataSchema = z.object({
  temp: z.number(),
  feels_like: z.number(),
  temp_min: z.number(),
  temp_max: z.number(),
  pressure: z.number(),
  humidity: z.number(),
  sea_level: z.number().optional(),
  grnd_level: z.number().optional(),
});

const WindSchema = z.object({
  speed: z.number(),
  deg: z.number(),
  gust: z.number().optional(),
});

const SysSchema = z.object({
  type: z.number().optional(),
  id: z.number().optional(),
  country: z.string().optional(),
  sunrise: z.number().optional(),
  sunset: z.number().optional(),
});

// Current Weather API Response Schema
export const CurrentWeatherSchema = z.object({
  coord: CoordinatesSchema,
  weather: z.array(WeatherConditionSchema),
  base: z.string(),
  main: MainWeatherDataSchema,
  visibility: z.number(),
  wind: WindSchema,
  clouds: z.object({
    all: z.number(),
  }),
  dt: z.number(),
  sys: SysSchema,
  timezone: z.number(),
  id: z.number(),
  name: z.string(),
  cod: z.number(),
});

export type CurrentWeather = z.infer<typeof CurrentWeatherSchema>;

// Forecast API Response Schema
const ForecastItemSchema = z.object({
  dt: z.number(),
  main: MainWeatherDataSchema.extend({
    temp_kf: z.number().optional(),
  }),
  weather: z.array(WeatherConditionSchema),
  clouds: z.object({
    all: z.number(),
  }),
  wind: WindSchema,
  visibility: z.number(),
  pop: z.number(), // Probability of precipitation
  sys: z.object({
    pod: z.string(), // Part of the day (n - night, d - day)
  }),
  dt_txt: z.string(),
});

export const ForecastResponseSchema = z.object({
  cod: z.string(),
  message: z.number(),
  cnt: z.number(),
  list: z.array(ForecastItemSchema),
  city: z.object({
    id: z.number(),
    name: z.string(),
    coord: CoordinatesSchema,
    country: z.string(),
    population: z.number(),
    timezone: z.number(),
    sunrise: z.number(),
    sunset: z.number(),
  }),
});

export type ForecastResponse = z.infer<typeof ForecastResponseSchema>;
export type ForecastItem = z.infer<typeof ForecastItemSchema>;

// Processed Daily Forecast for UI
export interface DailyForecast {
  date: string;
  timestamp: number;
  temp_min: number;
  temp_max: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
}
