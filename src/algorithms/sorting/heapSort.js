export const heapSortCode = [
  'function heapSort(arr) {',
  '  let n = arr.length;',
  '  // Build heap',
  '  for (let i = Math.floor(n/2)-1; i >= 0; i--)',
  '    heapify(arr, n, i);',
  '  // Extract elements from heap',
  '  for (let i = n - 1; i > 0; i--) {',
  '    [arr[0], arr[i]] = [arr[i], arr[0]];',
  '    heapify(arr, i, 0);',
  '  }',
  '  return arr;',
  '}',
  'function heapify(arr, n, i) {',
  '  let largest = i;',
  '  let left = 2*i + 1, right = 2*i + 2;',
  '  if (left < n && arr[left] > arr[largest])',
  '    largest = left;',
  '  if (right < n && arr[right] > arr[largest])',
  '    largest = right;',
  '  if (largest !== i) {',
  '    [arr[i], arr[largest]] = [arr[largest], arr[i]];',
  '    heapify(arr, n, largest);',
  '  }',
  '}',
]

export function generateHeapSteps(arr) {
  const steps = []
  const a = [...arr]
  const n = a.length
  let swapCount = 0
  const heapIndices = new Set()

  steps.push({
    array: [...a],
    comparing: [],
    swapping: [],
    sorted: [],
    heapIndices: new Set(),
    swapCount,
    activeLine: 0,
    description: 'Starting Heap Sort',
  })

  // Heapify function for step tracking
  function heapifyWithSteps(arr, n, i, phase) {
    let largest = i
    const left = 2 * i + 1
    const right = 2 * i + 2

    steps.push({
      array: [...arr],
      comparing: [i, left < n ? left : -1, right < n ? right : -1].filter(x => x !== -1),
      swapping: [],
      sorted: phase === 'extract' ? [...Array(n).keys()].slice(n) : [],
      heapIndices: new Set([...Array(n).keys()]),
      swapCount,
      activeLine: 13,
      description: `Heapify at index ${i}, comparing with children`,
    })

    if (left < n && arr[left] > arr[largest]) {
      largest = left
    }
    if (right < n && arr[right] > arr[largest]) {
      largest = right
    }

    if (largest !== i) {
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [i, largest],
        sorted: phase === 'extract' ? [...Array(a.length - n).keys()].slice(-Math.max(0, a.length - n)) : [],
        heapIndices: new Set([...Array(n).keys()]),
        swapCount: swapCount + 1,
        activeLine: 20,
        description: `Swap arr[${i}]=${arr[i]} with arr[${largest}]=${arr[largest]}`,
      })

      swapCount++
      ;[arr[i], arr[largest]] = [arr[largest], arr[i]]

      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: phase === 'extract' ? [...Array(a.length - n).keys()].slice(-Math.max(0, a.length - n)) : [],
        heapIndices: new Set([...Array(n).keys()]),
        swapCount,
        activeLine: 21,
        description: `Swapped! Now heapify subtree at ${largest}`,
      })

      heapifyWithSteps(arr, n, largest, phase)
    } else {
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: phase === 'extract' ? [...Array(a.length - n).keys()].slice(-Math.max(0, a.length - n)) : [],
        heapIndices: new Set([...Array(n).keys()]),
        swapCount,
        activeLine: 23,
        description: `Index ${i} is already larger than children, heap property satisfied`,
      })
    }
  }

  // Build heap phase
  steps.push({
    array: [...a],
    comparing: [],
    swapping: [],
    sorted: [],
    heapIndices: new Set(),
    swapCount,
    activeLine: 3,
    description: 'Building max heap...',
  })

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    steps.push({
      array: [...a],
      comparing: [],
      swapping: [],
      sorted: [],
      heapIndices: new Set([...Array(n).keys()]),
      swapCount,
      activeLine: 4,
      description: `Building heap: heapifying from index ${i}`,
    })
    heapifyWithSteps(a, n, i, 'build')
  }

  steps.push({
    array: [...a],
    comparing: [],
    swapping: [],
    sorted: [],
    heapIndices: new Set([...Array(n).keys()]),
    swapCount,
    activeLine: 5,
    description: '✓ Max heap constructed!',
  })

  // Extract elements phase
  steps.push({
    array: [...a],
    comparing: [],
    swapping: [],
    sorted: [],
    heapIndices: new Set([...Array(n).keys()]),
    swapCount,
    activeLine: 6,
    description: 'Extracting elements from heap...',
  })

  for (let i = n - 1; i > 0; i--) {
    steps.push({
      array: [...a],
      comparing: [0, i],
      swapping: [],
      sorted: [...Array(n - i).keys()].map(x => n - 1 - x),
      heapIndices: new Set([...Array(i).keys()]),
      swapCount,
      activeLine: 7,
      description: `Swap arr[0]=${a[0]} with arr[${i}]=${a[i]} (move max to end)`,
    })

    swapCount++
    ;[a[0], a[i]] = [a[i], a[0]]

    steps.push({
      array: [...a],
      comparing: [],
      swapping: [],
      sorted: [...Array(n - i).keys()].map(x => n - 1 - x),
      heapIndices: new Set([...Array(i).keys()]),
      swapCount,
      activeLine: 8,
      description: `Swapped! Now heapify reduced heap [0..${i - 1}]`,
    })

    heapifyWithSteps(a, i, 0, 'extract')
  }

  steps.push({
    array: [...a],
    comparing: [],
    swapping: [],
    sorted: [...Array(n).keys()],
    heapIndices: new Set(),
    swapCount,
    activeLine: 11,
    description: '✓ Array fully sorted!',
  })

  return steps
}
