type SanityImage = {
  asset?: {
    _ref?: string
  }
}

export function sanityImageUrl(image: SanityImage | null | undefined, width = 1200) {
  const reference = image?.asset?._ref
  const match = reference?.match(/^image-(.+)-(\d+x\d+)-([a-z0-9]+)$/)

  if (!match) return undefined

  const [, assetId, dimensions, format] = match
  return `https://cdn.sanity.io/images/c526wkjm/production/${assetId}-${dimensions}.${format}?w=${width}&auto=format`
}
