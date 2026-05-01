import { format } from "date-fns";
import { DailyForecast, ForecastItem } from "@/types/weather";
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Moon,
  Sun,
  Tornado,
  LucideProps
} from "lucide-react";

export function formatTemp(temp: number, unit: "C" | "F" = "C"): string {
  const convertedTemp = unit === "F" ? (temp * 9) / 5 + 32 : temp;
  return `${Math.round(convertedTemp)}°${unit}`;
}

export function formatTime(unix: number, timezoneOffset: number): string {
  // OWM timezone offset is in seconds
  const localDate = new Date((unix + timezoneOffset) * 1000);
  // Extract hours and minutes from the adjusted UTC date
  return format(
    new Date(
      localDate.getUTCFullYear(),
      localDate.getUTCMonth(),
      localDate.getUTCDate(),
      localDate.getUTCHours(),
      localDate.getUTCMinutes()
    ),
    "h:mm a"
  );
}

export function groupForecastByDay(
  list: ForecastItem[],
  timezoneOffset: number
): DailyForecast[] {
  const dailyData = new Map<string, ForecastItem[]>();

  list.forEach((item) => {
    // Determine the local date string for grouping
    const localDate = new Date((item.dt + timezoneOffset) * 1000);
    const dateStr = format(
      new Date(
        localDate.getUTCFullYear(),
        localDate.getUTCMonth(),
        localDate.getUTCDate()
      ),
      "yyyy-MM-dd"
    );
    
    if (!dailyData.has(dateStr)) {
      dailyData.set(dateStr, []);
    }
    dailyData.get(dateStr)!.push(item);
  });

  const processed: DailyForecast[] = [];

  dailyData.forEach((items, dateStr) => {
    const temps = items.map((i) => i.main.temp);
    // Use the middle of the day's weather condition
    const midDayItem = items[Math.floor(items.length / 2)];
    
    processed.push({
      date: dateStr,
      timestamp: midDayItem.dt,
      temp_min: Math.min(...temps),
      temp_max: Math.max(...temps),
      weather: midDayItem.weather[0],
    });
  });

  return processed.slice(0, 5); // Return up to 5 days
}

export function getWeatherIcon(code: number, isNight = false) {
  if (code >= 200 && code < 300) return CloudLightning;
  if (code >= 300 && code < 400) return CloudDrizzle;
  if (code >= 500 && code < 600) return CloudRain;
  if (code >= 600 && code < 700) return CloudSnow;
  if (code >= 700 && code < 800) {
    if (code === 781) return Tornado;
    return CloudFog;
  }
  if (code === 800) return isNight ? Moon : Sun;
  if (code === 801 || code === 802) return isNight ? CloudMoon : CloudSun;
  if (code > 802) return Cloud;
  return Sun;
}

// Internal fallback if icon not found
function CloudMoon(props: LucideProps) {
  return <Cloud {...props} />;
}

export function getWeatherGradientClass(code: number, isNight = false): string {
  if (isNight && code === 800) return "from-slate-900 to-indigo-950";
  if (isNight) return "from-slate-800 to-slate-950";
  
  if (code >= 200 && code < 300) return "from-slate-700 to-slate-900"; // Thunderstorm
  if (code >= 300 && code < 600) return "from-sky-700 to-slate-800"; // Rain/Drizzle
  if (code >= 600 && code < 700) return "from-sky-200 to-indigo-300 dark:from-slate-600 dark:to-slate-800"; // Snow
  if (code >= 700 && code < 800) return "from-slate-300 to-slate-500 dark:from-slate-700 dark:to-slate-800"; // Fog/Mist
  
  if (code === 800) return "from-sky-400 to-blue-600 dark:from-sky-800 dark:to-blue-950"; // Clear
  if (code === 801 || code === 802) return "from-sky-300 to-blue-500 dark:from-slate-700 dark:to-slate-900"; // Partly cloudy
  return "from-slate-400 to-slate-600 dark:from-slate-800 dark:to-slate-900"; // Cloudy
}
