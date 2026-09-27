export const radixSortCode = [
  'function radixSort(arr) {',
  '  let max = Math.max(...arr);',
  '  for (let exp = 1; max/exp >= 1; exp *= 10) {',
  '    countByDigit(arr, exp);',
  '  }',
  '}',
  'function countByDigit(arr, exp) {',
  '  let buckets = Array.from({length:10}, () => []);',
  '  for (let n of arr)',
  '    buckets[Math.floor(n/exp) % 10].push(n);',
  '  let i = 0;',
  '  for (let b = 0; b < 10; b++)',
  '    for (let n of buckets[b])',
  '      arr[i++] = n;',
  '}',
]

export function generateRadixSteps(arr) {
  const steps = []
  const a = [...arr]
  const max = Math.max(...a)

  const snap = (phase, buckets, activeIdx, digit, exp, activeLine, description) =>
    steps.push({ array: [...a], buckets: buckets.map(b => [...b]), activeIdx, digit, exp, phase, activeLine, description })

  const emptyBuckets = () => Array.from({ length: 10 }, () => [])

  snap('start', emptyBuckets(), -1, -1, 1, 0, `radixSort called. Max = ${max}. Sorting by each digit (1s, 10s, 100s...).`)

  for (let exp = 1; Math.floor(max / exp) >= 1; exp *= 10) {
    const digitName = exp === 1 ? '1s' : exp === 10 ? '10s' : exp === 100 ? '100s' : `${exp}s`
    snap('newpass', emptyBuckets(), -1, -1, exp, 2, `Pass: sorting by ${digitName} digit (exp=${exp})`)

    const buckets = emptyBuckets()
    for (let i = 0; i < a.length; i++) {
      const d = Math.floor(a[i] / exp) % 10
      buckets[d].push(a[i])
      snap('distribute', buckets, i, d, exp, 9, `arr[${i}]=${a[i]} → digit=${d} → bucket[${d}]`)
    }

    snap('collect', buckets, -1, -1, exp, 11, `Collecting from buckets 0-9 back into array`)
    let idx = 0
    for (let b = 0; b < 10; b++) {
      for (const n of buckets[b]) {
        a[idx++] = n
        snap('collect', buckets, idx - 1, b, exp, 13, `Collect ${n} from bucket[${b}] → arr[${idx - 1}]`)
      }
    }
    snap('passend', emptyBuckets(), -1, -1, exp, 4, `${digitName} pass done. Array: [${a.join(', ')}]`)
  }

  snap('done', emptyBuckets(), -1, -1, -1, 5, '✓ Radix sort complete!')
  return steps
}
