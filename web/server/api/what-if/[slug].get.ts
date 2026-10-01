import { sanityClient } from '../../utils/sanityClient'

const query =
  '*[_type == "whatIf" && slug.current == $slug][0] { _id, title, slug, summary, body, image, ripples[] { horizon, consequence } }'

export default defineEventHandler((event) => {
  const { slug } = getRouterParams(event)

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'A story slug is required.' })
  }

  return sanityClient.fetch(query, { slug })
})
