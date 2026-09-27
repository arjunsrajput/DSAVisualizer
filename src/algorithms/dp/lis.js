export const lisCode = [
  'function lis(nums) {',
  '  let dp = Array(nums.length).fill(1);',
  '  for (let i = 0; i < nums.length; i++) {',
  '    for (let j = 0; j < i; j++) {',
  '      if (nums[j] < nums[i])',
  '        dp[i] = Math.max(dp[i], dp[j] + 1);',
  '    }',
  '  }',
  '  return Math.max(...dp);',
  '}',
]

export function generateLISSteps(nums = [10, 9, 2, 5, 3, 7, 101, 18]) {
  const arr = nums.filter(Number.isFinite).slice(0, 14)
  const dp = Array(arr.length).fill(1)
  const prev = Array(arr.length).fill(null)
  const steps = []

  const snap = (activeIndex, comparing, accepted, activeLine, description) => {
    steps.push({
      array: [...arr],
      dp: [...dp],
      prev: [...prev],
      activeIndex,
      comparing,
      accepted,
      activeLine,
      description,
      result: arr.length ? Math.max(...dp) : 0,
    })
  }

  if (arr.length === 0) {
    snap(null, [], false, 0, 'Add numbers to compute LIS.')
    return steps
  }

  snap(null, [], false, 0, 'dp[i] stores the longest increasing subsequence ending at index i.')
  snap(null, [], false, 1, 'Initialize every dp[i] = 1 because each number alone is an increasing subsequence.')

  for (let i = 0; i < arr.length; i++) {
    snap(i, [], false, 2, `Compute LIS ending at index ${i} (value ${arr[i]}).`)
    for (let j = 0; j < i; j++) {
      const canExtend = arr[j] < arr[i]
      snap(i, [j], canExtend, 4, `Compare nums[${j}]=${arr[j]} with nums[${i}]=${arr[i]}.`)
      if (canExtend && dp[j] + 1 > dp[i]) {
        dp[i] = dp[j] + 1
        prev[i] = j
        snap(i, [j], true, 5, `Extend subsequence from index ${j}. dp[${i}] becomes ${dp[i]}.`)
      }
    }
  }

  snap(null, [], false, 8, `LIS length = ${Math.max(...dp)}.`)
  return steps
}
