export const medianOfMediansCode = [
  'function select(arr, k) {',
  '  if (arr.length <= 5) {',
  '    arr.sort((a, b) => a - b);',
  '    return arr[k - 1];',
  '  }',
  '  const groups = chunk(arr, 5);',
  '  const medians = groups.map(g => {',
  '    g.sort((a, b) => a - b);',
  '    return g[Math.floor(g.length / 2)];',
  '  });',
  '  const pivot = select(medians, Math.ceil(medians.length / 2));',
  '  const less = arr.filter(x => x < pivot);',
  '  const equal = arr.filter(x => x === pivot);',
  '  const greater = arr.filter(x => x > pivot);',
  '  if (k <= less.length)',
  '    return select(less, k);',
  '  if (k <= less.length + equal.length)',
  '    return pivot;',
  '  return select(greater, k - less.length - equal.length);',
  '}',
]

const groupByFive = (arr) => {
  const groups = []
  for (let i = 0; i < arr.length; i += 5) {
    const values = arr.slice(i, i + 5)
    const sorted = [...values].sort((a, b) => a - b)
    groups.push({
      id: groups.length + 1,
      values,
      sorted,
      median: sorted[Math.floor(sorted.length / 2)],
    })
  }
  return groups
}

const makeBaseStep = (arr, k, depth, activeLine, description, extra = {}) => ({
  array: arr,
  activeArray: arr,
  k,
  depth,
  activeLine,
  description,
  groups: [],
  medians: [],
  pivot: null,
  partitions: null,
  decision: null,
  metrics: null,
  answer: null,
  ...extra,
})

function selectWithTrace(arr, k, steps, depth = 0) {
  steps.push(makeBaseStep(
    arr,
    k,
    depth,
    0,
    `select([${arr.join(', ')}], k=${k}) starts at recursion depth ${depth}.`,
  ))

  if (arr.length === 0) {
    steps.push(makeBaseStep(arr, k, depth, 0, 'The active array is empty, so no selection can be made.'))
    return null
  }

  if (arr.length <= 5) {
    const sorted = [...arr].sort((a, b) => a - b)
    const answer = sorted[k - 1]
    steps.push(makeBaseStep(
      sorted,
      k,
      depth,
      2,
      `Base case: sort the group directly -> [${sorted.join(', ')}].`,
      {
        groups: [{ id: 1, values: arr, sorted, median: answer, role: 'base' }],
      },
    ))
    steps.push(makeBaseStep(
      sorted,
      k,
      depth,
      3,
      `Return the ${k}${ordinalSuffix(k)} smallest element: ${answer}.`,
      {
        answer,
        groups: [{ id: 1, values: arr, sorted, median: answer, role: 'answer' }],
      },
    ))
    return answer
  }

  const groups = groupByFive(arr)
  steps.push(makeBaseStep(
    arr,
    k,
    depth,
    5,
    `Split the active array into ${groups.length} group${groups.length === 1 ? '' : 's'} of at most 5 elements.`,
    { groups },
  ))

  steps.push(makeBaseStep(
    arr,
    k,
    depth,
    7,
    'Sort each small group and mark the middle element as that group median.',
    { groups: groups.map(group => ({ ...group, role: 'median' })) },
  ))

  const medians = groups.map(group => group.median)
  steps.push(makeBaseStep(
    arr,
    k,
    depth,
    10,
    `Collect group medians: [${medians.join(', ')}]. Now select their median to get a strong pivot.`,
    { groups, medians },
  ))

  const pivotK = Math.ceil(medians.length / 2)
  const pivot = selectWithTrace(medians, pivotK, steps, depth + 1)

  const less = arr.filter(value => value < pivot)
  const equal = arr.filter(value => value === pivot)
  const greater = arr.filter(value => value > pivot)
  const pivotRankStart = less.length + 1
  const pivotRankEnd = less.length + equal.length

  steps.push(makeBaseStep(
    arr,
    k,
    depth,
    11,
    `Use ${pivot} as pivot and partition the original active array into less, equal, and greater groups.`,
    {
      groups,
      medians,
      pivot,
      partitions: { less, equal, greater },
      metrics: {
        originalK: k,
        lessSize: less.length,
        equalSize: equal.length,
        pivotRankStart,
        pivotRankEnd,
      },
    },
  ))

  if (k <= less.length) {
    steps.push(makeBaseStep(
      less,
      k,
      depth,
      14,
      `k=${k} is inside the less-than-pivot group of size ${less.length}; recurse into [${less.join(', ')}].`,
      {
        pivot,
        partitions: { less, equal, greater },
        decision: 'left',
        metrics: {
          originalK: k,
          nextK: k,
          lessSize: less.length,
          equalSize: equal.length,
          pivotRankStart,
          pivotRankEnd,
        },
      },
    ))
    return selectWithTrace(less, k, steps, depth + 1)
  }

  if (k <= pivotRankEnd) {
    steps.push(makeBaseStep(
      arr,
      k,
      depth,
      16,
      `The pivot occupies rank ${pivotRankStart}${pivotRankStart === pivotRankEnd ? '' : ` to ${pivotRankEnd}`}; k=${k}, so the answer is ${pivot}.`,
      {
        groups,
        medians,
        pivot,
        partitions: { less, equal, greater },
        decision: 'found',
        metrics: {
          originalK: k,
          lessSize: less.length,
          equalSize: equal.length,
          pivotRankStart,
          pivotRankEnd,
        },
        answer: pivot,
      },
    ))
    return pivot
  }

  const newK = k - pivotRankEnd
  steps.push(makeBaseStep(
    greater,
    newK,
    depth,
    18,
    `Skip ${less.length} smaller element${less.length === 1 ? '' : 's'} and ${equal.length} pivot copy/copies. New k = ${k} - ${pivotRankEnd} = ${newK}.`,
    {
      pivot,
      partitions: { less, equal, greater },
      decision: 'right',
      metrics: {
        originalK: k,
        nextK: newK,
        lessSize: less.length,
        equalSize: equal.length,
        pivotRankStart,
        pivotRankEnd,
      },
    },
  ))
  return selectWithTrace(greater, newK, steps, depth + 1)
}

function ordinalSuffix(n) {
  const mod100 = n % 100
  if (mod100 >= 11 && mod100 <= 13) return 'th'
  if (n % 10 === 1) return 'st'
  if (n % 10 === 2) return 'nd'
  if (n % 10 === 3) return 'rd'
  return 'th'
}

export function generateMedianOfMediansSteps(arr, k) {
  const clean = arr.filter(Number.isFinite)
  if (clean.length === 0) {
    return [makeBaseStep([], k, 0, 0, 'Enter at least one numeric value to run deterministic selection.')]
  }

  if (!Number.isInteger(k) || k < 1 || k > clean.length) {
    return [makeBaseStep(
      clean,
      k,
      0,
      0,
      `k must be between 1 and ${clean.length}. Current k=${k} is out of range.`,
    )]
  }

  const steps = []
  const answer = selectWithTrace(clean, k, steps)
  steps.push(makeBaseStep(
    clean,
    k,
    0,
    0,
    `Final result: the ${k}${ordinalSuffix(k)} smallest element is ${answer}.`,
    { answer },
  ))
  return steps
}
