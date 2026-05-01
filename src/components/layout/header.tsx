import * as React from "react";
import { CloudRain } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { SearchForm } from "@/components/ui/search-form";
import Link from "next/link";

interface HeaderProps {
  city?: string;
}

export function Header({ city }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b-0 rounded-b-3xl mb-6">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" aria-label="SkyCast Home" className="flex items-center gap-2 group shrink-0">
          <div className="bg-gradient-to-br from-blue-500 to-cyan-400 p-2 rounded-xl text-white shadow-lg group-hover:scale-105 transition-transform">
            <CloudRain className="h-6 w-6" role="img" aria-label="SkyCast Logo" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 hidden sm:inline-block">
            SkyCast
          </span>
        </Link>

        {/* Search Form */}
        <div className="flex-1 max-w-xl flex justify-center">
          <SearchForm defaultValue={city} />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
