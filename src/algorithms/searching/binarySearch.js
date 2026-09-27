export const binarySearchCode = [
  'function binarySearch(arr, target) {',
  '  let low = 0, high = arr.length - 1;',
  '  while (low <= high) {',
  '    let mid = Math.floor((low + high) / 2);',
  '    if (arr[mid] === target)',
  '      return mid;',
  '    else if (arr[mid] < target)',
  '      low = mid + 1;',
  '    else',
  '      high = mid - 1;',
  '  }',
  '  return -1;',
  '}',
]

export function generateBinarySteps(arr, target) {
  const steps = []
  const a = [...arr].sort((x, y) => x - y)

  steps.push({ array: a, low: 0, high: a.length - 1, mid: -1, found: -1, activeLine: 0, description: `Array sorted. Searching for ${target}` })
  steps.push({ array: a, low: 0, high: a.length - 1, mid: -1, found: -1, activeLine: 1, description: `Initialize low=0, high=${a.length - 1}` })

  let low = 0, high = a.length - 1

  while (low <= high) {
    steps.push({ array: a, low, high, mid: -1, found: -1, activeLine: 2, description: `low(${low}) ≤ high(${high})? Yes — enter loop` })
    const mid = Math.floor((low + high) / 2)
    steps.push({ array: a, low, high, mid, found: -1, activeLine: 3, description: `mid = ⌊(${low} + ${high}) / 2⌋ = ${mid} → value ${a[mid]}` })

    if (a[mid] === target) {
      steps.push({ array: a, low, high, mid, found: mid, activeLine: 5, description: `✓ arr[${mid}] = ${a[mid]} = target! Found at index ${mid}` })
      return { steps, sorted: a }
    } else if (a[mid] < target) {
      steps.push({ array: a, low, high, mid, found: -1, activeLine: 6, description: `arr[${mid}]=${a[mid]} < ${target} → search right half` })
      low = mid + 1
      steps.push({ array: a, low, high, mid, found: -1, activeLine: 7, description: `low = ${mid} + 1 = ${low}` })
    } else {
      steps.push({ array: a, low, high, mid, found: -1, activeLine: 8, description: `arr[${mid}]=${a[mid]} > ${target} → search left half` })
      high = mid - 1
      steps.push({ array: a, low, high, mid, found: -1, activeLine: 9, description: `high = ${mid} - 1 = ${high}` })
    }
  }

  steps.push({ array: a, low, high, mid: -1, found: -1, activeLine: 11, description: `✗ low(${low}) > high(${high}), target ${target} not found` })
  return { steps, sorted: a }
}
