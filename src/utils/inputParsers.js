export function formatOperations(operations) {
  return operations
    .map(op => op.value !== undefined ? `${op.type}(${op.value})` : `${op.type}()`)
    .join(', ')
}

export function parseOperations(input, allowedTypes, valueTypes = []) {
  const allowed = new Set(allowedTypes)

  return input
    .split(/[\n,;]+/)
    .map(token => token.trim())
    .filter(Boolean)
    .map(token => {
      const match = token.match(/^([a-zA-Z]+)(?:\s*\(\s*([^)]*)\s*\)|\s+(.+))?$/)
      if (!match) return null

      const type = match[1]
      const rawValue = (match[2] ?? match[3] ?? '').trim()
      if (!allowed.has(type)) return null

      const needsValue = valueTypes.includes(type)
      if (!needsValue) return { type }
      if (rawValue === '') return null

      const numericValue = Number(rawValue)
      return {
        type,
        value: Number.isNaN(numericValue) ? rawValue : numericValue,
      }
    })
    .filter(Boolean)
}

export function parseNumericOperations(input, allowedTypes, valueTypes = []) {
  return parseOperations(input, allowedTypes, valueTypes)
    .filter(op => op.value === undefined || typeof op.value === 'number')
}
