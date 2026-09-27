export const countingSortCode = [
  'function countingSort(arr, max) {',
  '  let count = new Array(max + 1).fill(0);',
  '  for (let i = 0; i < arr.length; i++)',
  '    count[arr[i]]++;',
  '  let out = [], i = 0;',
  '  while (i <= max) {',
  '    while (count[i] > 0) {',
  '      out.push(i);',
  '      count[i]--;',
  '    }',
  '    i++;',
  '  }',
  '  return out;',
  '}',
]

export function generateCountingSteps(arr) {
  const steps = []
  const a = [...arr]
  const max = Math.max(...a)
  const count = new Array(max + 1).fill(0)
  const output = []

  const snap = (phase, activeInput, activeCount, activeOutput, activeLine, description) =>
    steps.push({ array: [...a], count: [...count], output: [...output], phase, activeInput, activeCount, activeOutput, activeLine, description })

  snap('count', -1, -1, -1, 0, `countingSort called. Max value = ${max}. Building count array of size ${max + 1}.`)
  snap('count', -1, -1, -1, 1, `Initialize count[0..${max}] = 0`)

  for (let i = 0; i < a.length; i++) {
    count[a[i]]++
    snap('count', i, a[i], -1, 3, `arr[${i}]=${a[i]} → count[${a[i]}]++ = ${count[a[i]]}`)
  }

  snap('build', -1, -1, -1, 4, 'Count phase complete. Now rebuilding sorted output from count array.')

  for (let i = 0; i <= max; i++) {
    while (count[i] > 0) {
      output.push(i)
      count[i]--
      snap('build', -1, i, output.length - 1, 7, `count[${i}]=${count[i]+1} > 0 → push ${i} to output`)
    }
    if (count[i] === 0) snap('build', -1, i, -1, 9, `count[${i}] exhausted, move to ${i + 1}`)
  }

  snap('done', -1, -1, -1, 12, '✓ Array fully sorted!')
  return steps
}
