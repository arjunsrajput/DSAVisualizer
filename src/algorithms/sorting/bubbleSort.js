export const bubbleSortCode = [
  'function bubbleSort(arr) {',
  '  let n = arr.length;',
  '  for (let i = 0; i < n - 1; i++) {',
  '    for (let j = 0; j < n - i - 1; j++) {',
  '      if (arr[j] > arr[j + 1]) {',
  '        // swap',
  '        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];',
  '      }',
  '    }',
  '  }',
  '  return arr;',
  '}',
]

export function generateBubbleSteps(arr) {
  const steps = []
  const a = [...arr]
  const n = a.length
  const sorted = []
  let swapCount = 0

  steps.push({ array: [...a], comparing: [], swapping: [], sorted: [], swapCount, activeLine: 0, description: 'Starting Bubble Sort' })

  for (let i = 0; i < n - 1; i++) {
    steps.push({ array: [...a], comparing: [], swapping: [], sorted: [...sorted], swapCount, activeLine: 2, description: `Outer pass i=${i}: elements after index ${n-i-1} are sorted` })
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({ array: [...a], comparing: [j, j + 1], swapping: [], sorted: [...sorted], swapCount, activeLine: 3, description: `Comparing arr[${j}]=${a[j]} and arr[${j+1}]=${a[j+1]}` })

      if (a[j] > a[j + 1]) {
        swapCount++
        steps.push({ array: [...a], comparing: [], swapping: [j, j + 1], sorted: [...sorted], swapCount, activeLine: 6, description: `${a[j]} > ${a[j+1]} → swapping` })
        ;[a[j], a[j + 1]] = [a[j + 1], a[j]]
        steps.push({ array: [...a], comparing: [], swapping: [], sorted: [...sorted], swapCount, activeLine: 6, description: `Swapped! arr[${j}]=${a[j]}, arr[${j+1}]=${a[j+1]}` })
      } else {
        steps.push({ array: [...a], comparing: [], swapping: [], sorted: [...sorted], swapCount, activeLine: 4, description: `${a[j]} ≤ ${a[j+1]} → no swap needed` })
      }
    }
    sorted.unshift(n - 1 - i)
    steps.push({ array: [...a], comparing: [], swapping: [], sorted: [...sorted], swapCount, activeLine: 8, description: `Pass ${i+1} complete. arr[${n-1-i}]=${a[n-1-i]} is in final position` })
  }
  sorted.unshift(0)
  steps.push({ array: [...a], comparing: [], swapping: [], sorted: [...Array(n).keys()], swapCount, activeLine: 10, description: '✓ Array fully sorted!' })
  return steps
}
