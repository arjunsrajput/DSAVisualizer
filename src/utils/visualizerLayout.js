export function getAutoViewBox(nodes, {
  fallbackWidth = 800,
  fallbackHeight = 320,
  padding = 70,
  minWidth = 360,
  minHeight = 240,
} = {}) {
  if (!nodes || nodes.length === 0) {
    return {
      viewBox: `0 0 ${fallbackWidth} ${fallbackHeight}`,
      width: fallbackWidth,
      height: fallbackHeight,
    }
  }

  const xs = nodes.map(node => node.x)
  const ys = nodes.map(node => node.y)
  const minX = Math.min(...xs) - padding
  const maxX = Math.max(...xs) + padding
  const minY = Math.min(...ys) - padding
  const maxY = Math.max(...ys) + padding
  const width = Math.max(minWidth, maxX - minX)
  const height = Math.max(minHeight, maxY - minY)

  return {
    viewBox: `${minX} ${minY} ${width} ${height}`,
    width,
    height,
  }
}

export function getResponsiveSvgHeight(nodes, {
  base = 320,
  perLevel = 72,
  min = 280,
  max = 560,
} = {}) {
  if (!nodes || nodes.length === 0) return min
  const levels = new Set(nodes.map(node => Math.round((node.y || 0) / perLevel))).size
  return Math.max(min, Math.min(max, base + Math.max(0, levels - 3) * 44))
}
