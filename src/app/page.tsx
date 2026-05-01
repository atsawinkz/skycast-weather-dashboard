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
    <div className={`min-h-screen flex flex-col transition-colors duration-1000 ease-in-out bg-gradient-to-br ${bgGradient}`}>
      <Header city={searchCity} />
      
      <main className="container mx-auto px-4 pb-12 flex-1">
        <div className="flex flex-col gap-6">
          <CurrentWeatherCard weather={currentWeather} />
          
          <WeatherDetailsGrid weather={currentWeather} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 flex flex-col gap-6">
              <HourlyForecast list={forecastData.list} timezoneOffset={timezoneOffset} />
              <ForecastChart data={dailyForecasts} />
            </div>
            
            <div className="lg:col-span-1">
              <DailyForecastList data={dailyForecasts} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


