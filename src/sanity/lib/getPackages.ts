// lib/getPackages.ts
import { client } from "@/sanity/lib/client";
import { tourPackage } from "@/sanity/lib/queries";
import { TourType } from "@/app/types/destinations";

export async function getTourPackages(): Promise<TourType[]> {
  const data: TourType[] = await client.fetch(tourPackage);
  return data;
}
