"use server";

import { redirect } from "next/navigation";

export async function searchCity(formData: FormData) {
  const city = formData.get("city");
  if (!city || typeof city !== "string" || city.trim() === "") {
    return;
  }
  
  redirect(`/?city=${encodeURIComponent(city.trim())}`);
}
