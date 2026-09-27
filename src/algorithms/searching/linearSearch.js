export const linearSearchCode = [
  'function linearSearch(arr, target) {',
  '  for (let i = 0; i < arr.length; i++) {',
  '    if (arr[i] === target) {',
  '      return i;         // found!',
  '    }',
  '  }',
  '  return -1;            // not found',
  '}',
]

export function generateLinearSteps(arr, target) {
  const steps = []
  const a = [...arr]

  steps.push({ array: a, current: -1, found: -1, checked: [], activeLine: 0, description: `Searching for target: ${target}` })

  for (let i = 0; i < a.length; i++) {
    steps.push({ array: a, current: i, found: -1, checked: [...Array(i).keys()], activeLine: 1, description: `Loop iteration i = ${i}` })
    steps.push({ array: a, current: i, found: -1, checked: [...Array(i).keys()], activeLine: 2, description: `Checking arr[${i}] = ${a[i]} against target ${target}` })

    if (a[i] === target) {
      steps.push({ array: a, current: i, found: i, checked: [...Array(i).keys()], activeLine: 3, description: `✓ Found! arr[${i}] = ${a[i]} equals target ${target}` })
      return steps
    } else {
      steps.push({ array: a, current: i, found: -1, checked: [...Array(i + 1).keys()], activeLine: 4, description: `✗ arr[${i}] = ${a[i]} ≠ ${target}, continue...` })
    }
  }

  steps.push({ array: a, current: -1, found: -1, checked: [...Array(a.length).keys()], activeLine: 6, description: `Target ${target} not found in array` })
  return steps
}
