export const insertionSortCode = [
  'function insertionSort(arr) {',
  '  for (let i = 1; i < arr.length; i++) {',
  '    let key = arr[i];',
  '    let j = i - 1;',
  '    while (j >= 0 && arr[j] > key) {',
  '      arr[j + 1] = arr[j];',
  '      j--;',
  '    }',
  '    arr[j + 1] = key;',
  '  }',
  '  return arr;',
  '}',
]

export function generateInsertionSteps(arr) {
  const steps = []
  const a = [...arr]
  const n = a.length
  const swapCount = 0

  steps.push({ array: [...a], key: -1, keyIdx: -1, shifting: [], sorted: [0], swapCount, activeLine: 0, description: 'Starting Insertion Sort. First element is trivially sorted.' })

  for (let i = 1; i < n; i++) {
    const key = a[i]
    steps.push({ array: [...a], key, keyIdx: i, shifting: [], sorted: [...Array(i).keys()], swapCount, activeLine: 2, description: `Pick key = arr[${i}] = ${key}` })

    let j = i - 1
    steps.push({ array: [...a], key, keyIdx: i, shifting: [], sorted: [...Array(i).keys()], swapCount, activeLine: 3, description: `j = ${j}, compare with sorted portion` })

    const shifting = []
    while (j >= 0 && a[j] > key) {
      steps.push({ array: [...a], key, keyIdx: i, shifting: [...shifting, j], sorted: [...Array(i).keys()], swapCount, activeLine: 4, description: `arr[${j}]=${a[j]} > key(${key}) → shift right` })
      a[j + 1] = a[j]
      shifting.push(j)
      steps.push({ array: [...a], key, keyIdx: j + 1, shifting: [...shifting], sorted: [...Array(i).keys()], swapCount, activeLine: 5, description: `Shifted arr[${j}]=${a[j]} to position ${j + 1}` })
      j--
    }

    a[j + 1] = key
    steps.push({ array: [...a], key, keyIdx: j + 1, shifting: [], sorted: [...Array(i + 1).keys()], swapCount, activeLine: 8, description: `Insert key=${key} at position ${j + 1}` })
  }

  steps.push({ array: [...a], key: -1, keyIdx: -1, shifting: [], sorted: [...Array(n).keys()], swapCount, activeLine: 10, description: '✓ Array fully sorted!' })
  return steps
}
