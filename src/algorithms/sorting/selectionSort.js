export const selectionSortCode = [
  'function selectionSort(arr) {',
  '  let n = arr.length;',
  '  for (let i = 0; i < n - 1; i++) {',
  '    let minIdx = i;',
  '    for (let j = i + 1; j < n; j++) {',
  '      if (arr[j] < arr[minIdx])',
  '        minIdx = j;',
  '    }',
  '    if (minIdx !== i)',
  '      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];',
  '  }',
  '  return arr;',
  '}',
]

export function generateSelectionSteps(arr) {
  const steps = []
  const a = [...arr]
  const n = a.length
  const sorted = []
  let swapCount = 0

  steps.push({ array: [...a], current: -1, minIdx: -1, comparing: [], swapping: [], sorted: [], swapCount, activeLine: 0, description: 'Starting Selection Sort' })

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i
    steps.push({ array: [...a], current: i, minIdx, comparing: [], swapping: [], sorted: [...sorted], swapCount, activeLine: 3, description: `Pass ${i+1}: Assume arr[${i}]=${a[i]} is minimum` })

    for (let j = i + 1; j < n; j++) {
      steps.push({ array: [...a], current: i, minIdx, comparing: [j, minIdx], swapping: [], sorted: [...sorted], swapCount, activeLine: 5, description: `Comparing arr[${j}]=${a[j]} with current min arr[${minIdx}]=${a[minIdx]}` })
      if (a[j] < a[minIdx]) {
        minIdx = j
        steps.push({ array: [...a], current: i, minIdx, comparing: [j], swapping: [], sorted: [...sorted], swapCount, activeLine: 6, description: `New minimum found! arr[${j}]=${a[j]} at index ${j}` })
      }
    }

    if (minIdx !== i) {
      swapCount++
      steps.push({ array: [...a], current: i, minIdx, comparing: [], swapping: [i, minIdx], sorted: [...sorted], swapCount, activeLine: 9, description: `Swapping arr[${i}]=${a[i]} with arr[${minIdx}]=${a[minIdx]}` })
      ;[a[i], a[minIdx]] = [a[minIdx], a[i]]
      steps.push({ array: [...a], current: i, minIdx: -1, comparing: [], swapping: [], sorted: [...sorted], swapCount, activeLine: 9, description: `Swapped! arr[${i}]=${a[i]} placed correctly` })
    }

    sorted.push(i)
    steps.push({ array: [...a], current: -1, minIdx: -1, comparing: [], swapping: [], sorted: [...sorted], swapCount, activeLine: 10, description: `arr[${i}]=${a[i]} is in its final position` })
  }
  sorted.push(n - 1)
  steps.push({ array: [...a], current: -1, minIdx: -1, comparing: [], swapping: [], sorted: [...Array(n).keys()], swapCount, activeLine: 11, description: '✓ Array fully sorted!' })
  return steps
}
