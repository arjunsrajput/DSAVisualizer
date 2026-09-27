export const mergeSortedListsCode = [
  'function mergeSorted(l1, l2) {',
  '  let dummy = new Node(0);',
  '  let curr = dummy;',
  '  while (l1 && l2) {',
  '    if (l1.val <= l2.val) {',
  '      curr.next = l1;',
  '      l1 = l1.next;',
  '    } else {',
  '      curr.next = l2;',
  '      l2 = l2.next;',
  '    }',
  '    curr = curr.next;',
  '  }',
  '  curr.next = l1 || l2;',
  '  return dummy.next;',
  '}',
]

export function generateMergeSortedSteps(arr1, arr2) {
  const steps = []
  let p1 = 0, p2 = 0
  const merged = []

  const snap = (p1idx, p2idx, activeLine, description) =>
    steps.push({ arr1: [...arr1], arr2: [...arr2], merged: [...merged], p1: p1idx, p2: p2idx, activeLine, description })

  snap(0, 0, 0, `mergeSorted([${arr1}], [${arr2}]). Compare head of each list, pick smaller.`)

  while (p1 < arr1.length && p2 < arr2.length) {
    snap(p1, p2, 3, `Compare l1[${p1}]=${arr1[p1]} vs l2[${p2}]=${arr2[p2]}`)
    if (arr1[p1] <= arr2[p2]) {
      merged.push(arr1[p1])
      snap(p1, p2, 5, `${arr1[p1]} ≤ ${arr2[p2]} → take from l1. Merged: [${merged}]`)
      p1++
    } else {
      merged.push(arr2[p2])
      snap(p1, p2, 8, `${arr2[p2]} < ${arr1[p1]} → take from l2. Merged: [${merged}]`)
      p2++
    }
    snap(p1, p2, 11, `Advance pointer. l1 ptr=${p1}, l2 ptr=${p2}`)
  }

  while (p1 < arr1.length) { merged.push(arr1[p1]); p1++ }
  while (p2 < arr2.length) { merged.push(arr2[p2]); p2++ }

  snap(p1, p2, 13, `One list exhausted. Append remaining. Merged: [${merged}]`)
  snap(-1, -1, 14, `✓ Merge complete! [${merged.join(' → ')}]`)
  return steps
}

export const defaultMergeArr1 = [1, 3, 5, 7, 9]
export const defaultMergeArr2 = [2, 4, 6, 8, 10]
