import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, 
  token: process.env.SANITY_API_TOKEN,// Set to false if statically generating pages, using ISR or tag-based revalidation
})

export async function  sanityFetch ({query, params={}}:{query:string, params?:any}){
  return await client.fetch(query, params)
}