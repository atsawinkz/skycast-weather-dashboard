import * as React from "react";
import { CloudRain } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { SearchForm } from "@/components/ui/search-form";
import Link from "next/link";

interface HeaderProps {
  city?: string;
  country?: string;
}

export function Header({ city, country }: HeaderProps) {
  const displayCity = city || "Bangkok";
  const fullCountryName = country 
    ? new Intl.DisplayNames(['en'], { type: 'region' }).of(country) 
    : "";
  const displayLocation = fullCountryName ? `${displayCity}, ${fullCountryName}` : displayCity;
  
  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
      <div className="space-y-1">
        <span className="text-xs uppercase tracking-monocle-caps font-semibold text-muted-foreground">
          Meteorology
        </span>
        <h1 className="text-4xl md:text-5xl font-serif-display font-medium capitalize">
          {displayLocation}
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <SearchForm defaultValue={city} />
        <ThemeToggle />
      </div>
    </header>
  );
}
