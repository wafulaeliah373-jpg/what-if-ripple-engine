import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'c526wkjm',
  dataset: 'production',
  apiVersion: '2026-07-01',
  useCdn: false,
})
