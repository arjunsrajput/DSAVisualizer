export const mergeSortCode = [
  'function mergeSort(arr, l, r) {',
  '  if (l >= r) return;',
  '  let mid = Math.floor((l + r) / 2);',
  '  mergeSort(arr, l, mid);',
  '  mergeSort(arr, mid+1, r);',
  '  merge(arr, l, mid, r);',
  '}',
  'function merge(arr, l, mid, r) {',
  '  let left = arr.slice(l, mid+1);',
  '  let right = arr.slice(mid+1, r+1);',
  '  let i=0, j=0, k=l;',
  '  while (i<left.length && j<right.length)',
  '    arr[k++] = left[i]<right[j] ? left[i++] : right[j++];',
  '  while (i < left.length) arr[k++] = left[i++];',
  '  while (j < right.length) arr[k++] = right[j++];',
  '}',
]

export function generateMergeSteps(arr) {
  const steps = []
  const a = [...arr]
  const swapCount = 0

  steps.push({ array: [...a], left: [], right: [], merging: [], sorted: [], swapCount, activeLine: 0, description: `Starting Merge Sort on [${a.join(', ')}]` })

  function merge(arr, l, mid, r) {
    const leftArr = arr.slice(l, mid + 1)
    const rightArr = arr.slice(mid + 1, r + 1)
    steps.push({ array: [...arr], left: [...Array(mid-l+1).keys()].map(i=>i+l), right: [...Array(r-mid).keys()].map(i=>i+mid+1), merging: [], sorted: [], swapCount, activeLine: 8, description: `Merging [${leftArr.join(',')}] and [${rightArr.join(',')}]` })

    let i = 0, j = 0, k = l
    while (i < leftArr.length && j < rightArr.length) {
      steps.push({ array: [...arr], left: [...Array(mid-l+1).keys()].map(i=>i+l), right: [...Array(r-mid).keys()].map(i=>i+mid+1), merging: [k], sorted: [], swapCount, activeLine: 12, description: `Compare ${leftArr[i]} vs ${rightArr[j]} → place ${Math.min(leftArr[i], rightArr[j])}` })
      if (leftArr[i] <= rightArr[j]) { arr[k++] = leftArr[i++] }
      else { arr[k++] = rightArr[j++] }
      steps.push({ array: [...arr], left: [], right: [], merging: [k-1], sorted: [], swapCount, activeLine: 12, description: `Placed ${arr[k-1]} at position ${k-1}` })
    }
    while (i < leftArr.length) { arr[k++] = leftArr[i++] }
    while (j < rightArr.length) { arr[k++] = rightArr[j++] }
    const sortedRange = [...Array(r-l+1).keys()].map(i=>i+l)
    steps.push({ array: [...arr], left: [], right: [], merging: [], sorted: sortedRange, swapCount, activeLine: 14, description: `Merged segment [${l}..${r}]: [${arr.slice(l,r+1).join(',')}]` })
  }

  function sort(arr, l, r) {
    if (l >= r) return
    steps.push({ array: [...arr], left: [], right: [], merging: [], sorted: [], swapCount, activeLine: 1, description: `Dividing [${l}..${r}]: [${arr.slice(l,r+1).join(',')}]` })
    const mid = Math.floor((l + r) / 2)
    steps.push({ array: [...arr], left: [], right: [], merging: [], sorted: [], swapCount, activeLine: 2, description: `mid = ${mid}` })
    sort(arr, l, mid)
    sort(arr, mid + 1, r)
    merge(arr, l, mid, r)
  }

  sort(a, 0, a.length - 1)
  steps.push({ array: [...a], left: [], right: [], merging: [], sorted: [...Array(a.length).keys()], swapCount, activeLine: 5, description: '✓ Array fully sorted!' })
  return steps
}
