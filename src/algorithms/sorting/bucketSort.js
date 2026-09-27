export const bucketSortCode = [
  'function bucketSort(arr) {',
  '  let n = arr.length;',
  '  let max = Math.max(...arr);',
  '  let buckets = Array.from({length:n}, () => []);',
  '  for (let x of arr) {',
  '    let i = Math.floor((x / (max+1)) * n);',
  '    buckets[i].push(x);',
  '  }',
  '  for (let b of buckets)',
  '    b.sort((a,b) => a - b);',
  '  return [].concat(...buckets);',
  '}',
]

export function generateBucketSteps(arr) {
  const steps = []
  const a = [...arr]
  const n = a.length
  const max = Math.max(...a)
  const numBuckets = Math.min(n, 6)
  const buckets = Array.from({ length: numBuckets }, () => [])

  const snap = (phase, activeIdx, activeBucket, activeLine, description) =>
    steps.push({ array: [...a], buckets: buckets.map(b => [...b].sort((x,y)=>x-y)), phase, activeIdx, activeBucket, activeLine, description })

  snap('start', -1, -1, 0, `bucketSort called. ${n} elements, max=${max}. Creating ${numBuckets} buckets.`)

  for (let i = 0; i < a.length; i++) {
    const bi = Math.min(Math.floor((a[i] / (max + 1)) * numBuckets), numBuckets - 1)
    buckets[bi].push(a[i])
    snap('distribute', i, bi, 5, `arr[${i}]=${a[i]} → bucket[${bi}] (range ~${Math.floor(bi*(max+1)/numBuckets)}..${Math.floor((bi+1)*(max+1)/numBuckets)-1})`)
  }

  snap('sort', -1, -1, 8, 'Distribution done. Now sorting each bucket individually.')
  for (let b = 0; b < numBuckets; b++) {
    buckets[b].sort((x, y) => x - y)
    if (buckets[b].length > 0) snap('sort', -1, b, 9, `bucket[${b}] sorted: [${buckets[b].join(', ')}]`)
  }

  const sorted = [].concat(...buckets)
  for (let i = 0; i < sorted.length; i++) a[i] = sorted[i]
  snap('done', -1, -1, 10, `✓ Bucket sort complete! Merged: [${a.join(', ')}]`)
  return steps
}
