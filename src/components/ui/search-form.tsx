"use client";

import * as React from "react";
import { Search, MapPin } from "lucide-react";
import { searchCity } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="ghost"
      size="icon"
      className="absolute right-0 top-0 h-full rounded-none hover:bg-transparent"
      disabled={pending}
      aria-label="Submit search"
    >
      <Search className={`h-4 w-4 ${pending ? "animate-pulse text-accent" : "text-muted-foreground"}`} />
      <span className="sr-only">Search</span>
    </Button>
  );
}

export function SearchForm({ defaultValue = "" }: { defaultValue?: string }) {
  return (
    <form action={searchCity} className="relative w-full md:w-64 flex items-center">
      <div className="relative w-full group">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground group-focus-within:text-accent transition-colors">
          <Search className="h-4 w-4" />
        </div>
        <Input
          type="text"
          name="city"
          placeholder="Search city..."
          defaultValue={defaultValue}
          className="pl-10 pr-10 py-2 rounded-none bg-card border-border focus-visible:border-accent focus-visible:ring-0 text-sm shadow-none transition-all"
          required
          autoComplete="off"
          aria-label="City name"
        />
        <SubmitButton />
      </div>
    </form>
  );
}
