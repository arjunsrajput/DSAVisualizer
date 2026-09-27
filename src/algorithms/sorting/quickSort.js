export const quickSortCode = [
  'function quickSort(arr, low, high) {',
  '  if (low < high) {',
  '    let pi = partition(arr, low, high);',
  '    quickSort(arr, low, pi - 1);',
  '    quickSort(arr, pi + 1, high);',
  '  }',
  '}',
  'function partition(arr, low, high) {',
  '  let pivot = arr[high];',
  '  let i = low - 1;',
  '  for (let j = low; j < high; j++) {',
  '    if (arr[j] <= pivot) {',
  '      i++;',
  '      [arr[i], arr[j]] = [arr[j], arr[i]];',
  '    }',
  '  }',
  '  [arr[i+1], arr[high]] = [arr[high], arr[i+1]];',
  '  return i + 1;',
  '}',
]

export function generateQuickSteps(arr) {
  const steps = []
  const a = [...arr]
  const sortedSet = new Set()
  let swapCount = 0

  steps.push({ array: [...a], pivot: -1, comparing: [], swapping: [], sorted: [], range: [], swapCount, activeLine: 0, description: 'Starting Quick Sort' })

  function partition(arr, low, high) {
    const pivot = arr[high]
    steps.push({ array: [...arr], pivot: high, comparing: [], swapping: [], sorted: [...sortedSet], range: [low, high], swapCount, activeLine: 8, description: `Pivot = arr[${high}] = ${pivot}` })
    let i = low - 1

    for (let j = low; j < high; j++) {
      steps.push({ array: [...arr], pivot: high, comparing: [j], swapping: [], sorted: [...sortedSet], range: [low, high], swapCount, activeLine: 11, description: `arr[${j}]=${arr[j]} ≤ pivot(${pivot})?` })
      if (arr[j] <= pivot) {
        i++
        if (i !== j) {
          swapCount++
          steps.push({ array: [...arr], pivot: high, comparing: [], swapping: [i, j], sorted: [...sortedSet], range: [low, high], swapCount, activeLine: 13, description: `Yes → swap arr[${i}]=${arr[i]} with arr[${j}]=${arr[j]}` })
          ;[arr[i], arr[j]] = [arr[j], arr[i]]
          steps.push({ array: [...arr], pivot: high, comparing: [], swapping: [], sorted: [...sortedSet], range: [low, high], swapCount, activeLine: 13, description: `Swapped` })
        }
      }
    }
    if (i + 1 !== high) swapCount++
    steps.push({ array: [...arr], pivot: high, comparing: [], swapping: [i + 1, high], sorted: [...sortedSet], range: [low, high], swapCount, activeLine: 16, description: `Place pivot: swap arr[${i+1}] with arr[${high}]` })
    ;[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
    sortedSet.add(i + 1)
    steps.push({ array: [...arr], pivot: i + 1, comparing: [], swapping: [], sorted: [...sortedSet], range: [low, high], swapCount, activeLine: 17, description: `Pivot ${arr[i+1]} placed at final position ${i+1}` })
    return i + 1
  }

  function sort(arr, low, high) {
    if (low < high) {
      steps.push({ array: [...arr], pivot: -1, comparing: [], swapping: [], sorted: [...sortedSet], range: [low, high], swapCount, activeLine: 1, description: `Sorting subarray [${low}..${high}]` })
      const pi = partition(arr, low, high)
      sort(arr, low, pi - 1)
      sort(arr, pi + 1, high)
    } else if (low === high) {
      sortedSet.add(low)
    }
  }

  sort(a, 0, a.length - 1)
  steps.push({ array: [...a], pivot: -1, comparing: [], swapping: [], sorted: [...Array(a.length).keys()], range: [], swapCount, activeLine: 6, description: '✓ Array fully sorted!' })
  return steps
}
