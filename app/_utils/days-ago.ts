export function daysAgo(date: Date) {
  const now = new Date()
  const diffInTime = now.getTime() - date.getTime()
  const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24))
  return `${diffInDays}日前`
}
