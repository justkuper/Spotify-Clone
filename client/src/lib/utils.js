export const formatDuration = (seconds) => {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export const formatPlays = (num) => {
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}B`
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`
  return num.toString()
}

export const formatFollowers = (num) => {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M followers`
  if (num >= 1_000) return `${(num / 1_000).toFixed(0)}K followers`
  return `${num} followers`
}
