import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2025-01-30",
  useCdn: false,
});

export async function getUmrahAvailability(): Promise<boolean> {
  const result = await client.fetch(`*[_type == "umrahAvailability"][0]{showComingSoonMessage}`);
  return result?.showComingSoonMessage ?? false;
}
