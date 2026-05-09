import * as React from "react";
import { CurrentWeather } from "@/types/weather";
import { formatTemp, getWeatherIcon } from "@/lib/weather-utils";

interface CurrentWeatherCardProps {
  weather: CurrentWeather;
}

export function CurrentWeatherCard({ weather }: CurrentWeatherCardProps) {
  const isNight = weather.weather[0].icon.includes("n");
  const temp = formatTemp(weather.main.temp);
  const highTemp = formatTemp(weather.main.temp_max);
  const lowTemp = formatTemp(weather.main.temp_min);
  const description = weather.weather[0].description;
  
  // Create a dynamic editorial sentence
  const conditionWords = description.split(" ");
  const mainCondition = conditionWords[conditionWords.length - 1];
  const timeOfDay = isNight ? "evening" : "afternoon";
  const editorialSentence = `A ${weather.main.temp > 28 ? "warm" : weather.main.temp < 15 ? "cool" : "mild"}, ${mainCondition} ${timeOfDay} in ${weather.name}. Humid conditions persist at ${weather.main.humidity}% with a gentle breeze from the ${weather.wind.speed}m/s.`;

  return (
    <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
      <div className="space-y-2">
        <div className="flex items-center gap-4">
          <span className="text-8xl md:text-[10rem] font-serif-display leading-none">
            {temp}
          </span>
          <div className="space-y-1">
            <p className="text-2xl font-serif-display capitalize">{description}</p>
            <p className="text-muted-foreground tracking-monocle-caps text-[10px] uppercase font-bold">
              High: {highTemp} Low: {lowTemp}
            </p>
          </div>
        </div>
        <p className="max-w-md text-muted-foreground text-sm italic">
          {editorialSentence}
        </p>
      </div>
      <div className="w-32 h-32 md:w-48 md:h-48 flex items-center justify-center bg-accent/5">
        {React.createElement(getWeatherIcon(weather.weather[0].id, isNight), { 
          className: "w-full h-full p-4 text-accent drop-shadow-sm",
          "aria-label": description,
          role: "img"
        })}
      </div>
    </section>
  );
}
