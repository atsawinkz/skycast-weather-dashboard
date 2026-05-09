import * as React from "react";
import { CloudRain } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { SearchForm } from "@/components/ui/search-form";
import Link from "next/link";

interface HeaderProps {
  city?: string;
}

export function Header({ city }: HeaderProps) {
  const displayCity = city || "Bangkok";
  
  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
      <div className="space-y-1">
        <span className="text-xs uppercase tracking-monocle-caps font-semibold text-muted-foreground">
          Meteorology — Edition 01
        </span>
        <h1 className="text-4xl md:text-5xl font-serif-display font-medium capitalize">
          {displayCity}
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <SearchForm defaultValue={city} />
        <ThemeToggle />
      </div>
    </header>
  );
}
