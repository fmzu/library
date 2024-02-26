export const toFamousTagNames = (tagNames: string[], n = 16) => {
  const famousTags = tagNames.reduce<Record<string, number>>((acc, tagName) => {
    if (acc[tagName]) {
      acc[tagName]++
    } else {
      acc[tagName] = 1
    }
    return acc
  }, {})

  const sortedFamousTags = Object.entries(famousTags)
    .sort(([, a], [, b]) => b - a)
    .slice(0, n)

  return sortedFamousTags.map(([tagName]) => tagName)
}
