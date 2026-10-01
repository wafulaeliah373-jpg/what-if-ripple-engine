import { sanityClient } from '../utils/sanityClient'

const query =
  '*[_type == "whatIf" && defined(slug.current)] | order(_createdAt desc) { _id, title, slug, summary, image }'

export default defineEventHandler(() => sanityClient.fetch(query))
