export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-30'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "fehzg1rj",
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)
console.log("Sanity Project ID:", process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
console.log("Sanity Dataset:", process.env.NEXT_PUBLIC_SANITY_DATASET);
console.log("Sanity API Version:", process.env.NEXT_PUBLIC_SANITY_API_VERSION);


function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
