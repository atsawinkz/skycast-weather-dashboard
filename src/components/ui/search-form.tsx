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
      className="absolute right-0 top-0 h-full rounded-l-none rounded-r-full hover:bg-transparent"
      disabled={pending}
    >
      <Search className={`h-5 w-5 ${pending ? "animate-pulse text-primary" : "text-muted-foreground"}`} />
      <span className="sr-only">Search</span>
    </Button>
  );
}

export function SearchForm({ defaultValue = "" }: { defaultValue?: string }) {
  return (
    <form action={searchCity} className="relative w-full max-w-md mx-auto sm:mx-0 flex items-center">
      <div className="relative w-full group">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
          <MapPin className="h-4 w-4" />
        </div>
        <Input
          type="text"
          name="city"
          placeholder="Search for a city..."
          defaultValue={defaultValue}
          className="pl-10 pr-12 py-6 rounded-full glass-panel focus-visible:ring-2 focus-visible:ring-primary/50 text-base shadow-sm transition-all"
          required
          autoComplete="off"
        />
        <SubmitButton />
      </div>
    </form>
  );
}
