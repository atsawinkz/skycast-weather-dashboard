import { getCurrentWeather, getForecast } from "@/lib/weather-api";
import { groupForecastByDay, getWeatherGradientClass } from "@/lib/weather-utils";
import { Header } from "@/components/layout/header";
import { CurrentWeatherCard } from "@/components/weather/current-weather-card";
import { WeatherDetailsGrid } from "@/components/weather/weather-details-grid";
import { HourlyForecast } from "@/components/weather/hourly-forecast";
import { ForecastChart } from "@/components/weather/forecast-chart";
import { DailyForecastList } from "@/components/weather/daily-forecast";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ city?: string }>;
}) {
  const { city } = await searchParams;
  const defaultCity = "Bangkok";
  const searchCity = city || defaultCity;

  // Fetch data in parallel
  const [currentWeather, forecastData] = await Promise.all([
    getCurrentWeather(searchCity),
    getForecast(searchCity),
  ]);

  const timezoneOffset = currentWeather.timezone;
  const dailyForecasts = groupForecastByDay(forecastData.list, timezoneOffset);

  const isNight = currentWeather.weather[0].icon.includes("n");
  const bgGradient = getWeatherGradientClass(currentWeather.weather[0].id, isNight);

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500 ease-in-out bg-background text-foreground">
      <div className="max-w-6xl mx-auto w-full px-4 md:px-8 py-8 space-y-8 flex-1">
        <Header city={searchCity} country={currentWeather.sys.country} />
        
        <main className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="md:col-span-8 space-y-8">
            <CurrentWeatherCard weather={currentWeather} />
            <HourlyForecast list={forecastData.list} timezoneOffset={timezoneOffset} />
            <ForecastChart data={dailyForecasts} />
            <WeatherDetailsGrid weather={currentWeather} />
          </div>

          {/* Right Column */}
          <div className="md:col-span-4">
            <DailyForecastList data={dailyForecasts} />
          </div>
        </main>
      </div>
      
      {/* Footer */}
      <div className="max-w-6xl mx-auto w-full px-4 md:px-8">
        <footer className="pt-12 pb-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-muted-foreground text-xs uppercase tracking-widest font-medium">
          <p>© 2026 Meteorology Edition — Monocle Series</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-accent transition-colors">Documentation</a>
            <a href="#" className="hover:text-accent transition-colors">API Access</a>
            <a href="#" className="hover:text-accent transition-colors">Privacy</a>
          </div>
        </footer>
      </div>
    </div>
  );
}

import type { Metadata, Viewport } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ city?: string }>;
}): Promise<Metadata> {
  const { city } = await searchParams;
  const currentCity = city || "Bangkok";
  return {
    title: `${currentCity} Weather Forecast — SkyCast`,
    description: `Get dynamic local weather data, dynamic outlooks, and advanced metrics for ${currentCity}. Powered by SkyCast.`,
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d1b2a",
};
