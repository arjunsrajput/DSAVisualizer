export const fibonacciTheory = {
  name: 'Fibonacci DP',
  overview: 'Fibonacci DP computes Fibonacci numbers by storing answers to smaller Fibonacci subproblems instead of recomputing them repeatedly.',
  concept: 'The recurrence is dp[i] = dp[i - 1] + dp[i - 2]. Once dp[0] and dp[1] are known, every later value can be built from already solved values.',
  useCase: [
    'Introducing overlapping subproblems',
    'Understanding tabulation from left to right',
    'Replacing exponential recursion with linear DP',
  ],
  pros: [
    'Very easy recurrence to see visually',
    'Turns exponential recursion into O(n)',
    'Good first example for tabulation',
  ],
  cons: [
    'Too simple for choice-based DP',
    'Can be optimized to O(1) space, which hides the table idea',
  ],
  complexity: {
    time: {
      best: { notation: 'O(n)', explanation: 'Each state from 0 to n is computed once' },
      average: { notation: 'O(n)', explanation: 'Same amount of work for a fixed n' },
      worst: { notation: 'O(n)', explanation: 'Computes n + 1 table entries' },
    },
    space: { notation: 'O(n)', explanation: 'Stores all Fibonacci values from 0 to n' },
  },
  characteristics: [
    { label: 'DP Type', value: '1D table' },
    { label: 'Transition', value: 'Previous 2' },
    { label: 'Direction', value: 'Left to right' },
    { label: 'Base Cases', value: '0 and 1' },
  ],
  workedExample: {
    trace: [
      { state: 'dp[0]', value: 0, action: 'Base case' },
      { state: 'dp[1]', value: 1, action: 'Base case' },
      { state: 'dp[2]', formula: 'dp[1] + dp[0]', value: 1 },
      { state: 'dp[3]', formula: 'dp[2] + dp[1]', value: 2 },
      { state: 'dp[4]', formula: 'dp[3] + dp[2]', value: 3 },
    ],
    result: 'Every value is computed once and reused by later states.',
  },
  realExample: {
    title: 'Example: Reusing cached sub-results',
    description: 'If many later calculations need the same smaller answers, store them once and reuse them.',
    steps: [
      'Solve the smallest cases first',
      'Store their answers in a table',
      'Build larger answers from stored smaller answers',
    ],
  },
}

export const knapsackTheory = {
  name: '0/1 Knapsack',
  overview: '0/1 Knapsack chooses a subset of items with maximum value without exceeding a capacity. Each item can be taken once or skipped.',
  concept: 'dp[i][w] means the best value using the first i items with capacity w. For each cell, compare skipping the current item with taking it if it fits.',
  useCase: [
    'Choosing items under a weight/budget limit',
    'Subset selection with maximum reward',
    'Classic two-choice DP problems',
  ],
  pros: [
    'Makes take/skip decisions explicit',
    'Works for many resource allocation problems',
    'Easy to reconstruct choices from the table',
  ],
  cons: [
    'Can use a lot of memory for large capacity',
    'Only pseudo-polynomial in capacity',
  ],
  complexity: {
    time: {
      best: { notation: 'O(nW)', explanation: 'Fills one cell for every item and capacity' },
      average: { notation: 'O(nW)', explanation: 'The table size controls the work' },
      worst: { notation: 'O(nW)', explanation: 'n items times W capacity values' },
    },
    space: { notation: 'O(nW)', explanation: 'Stores a 2D table of item/capacity states' },
  },
  characteristics: [
    { label: 'DP Type', value: '2D table' },
    { label: 'Choice', value: 'Take / Skip' },
    { label: 'Items', value: '0/1 only' },
    { label: 'Goal', value: 'Max value' },
  ],
  workedExample: {
    trace: [
      { item: 'w=2, v=12', capacity: 2, skip: 0, take: 12, chosen: 12 },
      { item: 'w=1, v=10', capacity: 3, skip: 12, take: 22, chosen: 22 },
      { item: 'w=3, v=20', capacity: 5, skip: 22, take: 32, chosen: 32 },
    ],
    result: 'Each cell asks: is it better to skip this item, or take it and use the remaining capacity?',
  },
  realExample: {
    title: 'Example: Packing a bag',
    description: 'You have limited space and each object has weight and usefulness.',
    steps: [
      'Try each capacity from 0 up to the limit',
      'For every item, compare not taking it vs taking it',
      'The bottom-right cell contains the best possible value',
    ],
  },
}

export const lcsTheory = {
  name: 'Longest Common Subsequence',
  overview: 'LCS finds the longest sequence that appears in two strings in the same relative order, not necessarily contiguously.',
  concept: 'dp[i][j] stores the LCS length for the first i characters of string A and first j characters of string B. A character match uses the diagonal; a mismatch takes the best of top or left.',
  useCase: [
    'Text diff tools',
    'Comparing DNA/protein sequences',
    'Finding similarity between ordered sequences',
  ],
  pros: [
    'Clear match vs mismatch recurrence',
    'Useful in real comparison tools',
    'Table shows exactly how prefixes relate',
  ],
  cons: [
    'O(mn) memory can be large',
    'Subsequence is less strict than substring',
  ],
  complexity: {
    time: {
      best: { notation: 'O(mn)', explanation: 'Every pair of prefixes is evaluated' },
      average: { notation: 'O(mn)', explanation: 'Depends on the full grid size' },
      worst: { notation: 'O(mn)', explanation: 'm by n table cells are filled' },
    },
    space: { notation: 'O(mn)', explanation: 'Stores a grid for all prefix pairs' },
  },
  characteristics: [
    { label: 'DP Type', value: '2D grid' },
    { label: 'Match', value: 'Diagonal + 1' },
    { label: 'Mismatch', value: 'Max(top,left)' },
    { label: 'Goal', value: 'Length' },
  ],
  workedExample: {
    trace: [
      { chars: 'A vs A', action: 'Match', formula: 'diagonal + 1' },
      { chars: 'B vs E', action: 'Mismatch', formula: 'max(top, left)' },
      { chars: 'D vs D', action: 'Match', formula: 'diagonal + 1' },
    ],
    result: 'The final cell stores the LCS length for both full strings.',
  },
  realExample: {
    title: 'Example: File diff',
    description: 'A diff tool can use LCS to find lines that stayed in the same relative order.',
    steps: [
      'Compare prefixes of the old and new file',
      'Keep matches from the diagonal',
      'Use top/left cells to skip changed lines',
    ],
  },
}

export const coinChangeTheory = {
  name: 'Coin Change',
  overview: 'Coin Change finds the minimum number of coins needed to make a target amount using unlimited copies of each coin.',
  concept: 'dp[a] stores the minimum coins needed for amount a. For every amount, try every coin and use 1 + dp[a - coin].',
  useCase: ['Making change with denominations', 'Unbounded choice DP', 'Minimum-count optimization'],
  pros: ['Compact 1D DP', 'Clear recurrence', 'Shows unlimited reuse of choices'],
  cons: ['Only gives minimum count unless choices are tracked', 'Greedy does not always work, so DP is needed'],
  complexity: {
    time: {
      best: { notation: 'O(A·C)', explanation: 'Every amount tries every coin' },
      average: { notation: 'O(A·C)', explanation: 'A is amount and C is number of coin types' },
      worst: { notation: 'O(A·C)', explanation: 'All amount/coin combinations are considered' },
    },
    space: { notation: 'O(A)', explanation: 'Stores one value per amount from 0 to A' },
  },
  characteristics: [
    { label: 'DP Type', value: '1D table' },
    { label: 'Choice', value: 'Try coin' },
    { label: 'Reuse', value: 'Unlimited' },
    { label: 'Goal', value: 'Minimum' },
  ],
  workedExample: {
    trace: [
      { amount: 1, coins: '[1,3,4]', best: 1 },
      { amount: 3, coins: '[1,3,4]', best: 1 },
      { amount: 6, formula: '1 + dp[3] using coin 3', best: 2 },
    ],
    result: 'For coins [1,3,4] and amount 6, the answer is 2 coins: 3 + 3.',
  },
  realExample: {
    title: 'Example: Payment change',
    description: 'A register chooses the fewest coins to return a customer.',
    steps: ['Solve small amounts first', 'Try each coin for the current amount', 'Store the best minimum so later amounts can reuse it'],
  },
}

export const lisTheory = {
  name: 'Longest Increasing Subsequence',
  overview: 'LIS finds the longest subsequence whose values strictly increase while keeping original order.',
  concept: 'dp[i] stores the LIS length ending exactly at index i. Look left for smaller values that can extend into nums[i].',
  useCase: ['Sequence trend analysis', 'Ordering problems', 'Building intuition for state ending at i'],
  pros: ['Easy 1D state', 'Shows pairwise transitions clearly', 'Can be optimized later to O(n log n)'],
  cons: ['O(n²) version checks many pairs', 'Only length is shown unless predecessors are tracked'],
  complexity: {
    time: {
      best: { notation: 'O(n²)', explanation: 'Every pair j < i is checked' },
      average: { notation: 'O(n²)', explanation: 'Nested loops dominate' },
      worst: { notation: 'O(n²)', explanation: 'All previous values are checked for each i' },
    },
    space: { notation: 'O(n)', explanation: 'Stores LIS length ending at each index' },
  },
  characteristics: [
    { label: 'DP Type', value: '1D table' },
    { label: 'State', value: 'Ends at i' },
    { label: 'Check', value: 'j < i' },
    { label: 'Goal', value: 'Max length' },
  ],
  workedExample: {
    trace: [
      { value: 5, previous: 2, action: 'extend', length: 2 },
      { value: 7, previous: 5, action: 'extend', length: 3 },
      { value: 101, previous: 7, action: 'extend', length: 4 },
    ],
    result: 'For [10,9,2,5,3,7,101,18], the LIS length is 4.',
  },
  realExample: {
    title: 'Example: Growth streak',
    description: 'Find the longest ordered streak of increasing measurements.',
    steps: ['Pick each value as the endpoint', 'Look back for smaller values', 'Extend the best previous streak'],
  },
}

export const editDistanceTheory = {
  name: 'Edit Distance',
  overview: 'Edit Distance measures the minimum insert, delete, and replace operations needed to convert one string into another.',
  concept: 'dp[i][j] stores the cost to convert the first i source characters into the first j target characters.',
  useCase: ['Spell correction', 'Fuzzy search', 'Text similarity'],
  pros: ['Operations are easy to map to neighboring cells', 'Very practical string DP', 'Good example of 3-way minimum'],
  cons: ['O(mn) table can be large', 'Only cost is shown unless operations are reconstructed'],
  complexity: {
    time: {
      best: { notation: 'O(mn)', explanation: 'Every prefix pair is evaluated' },
      average: { notation: 'O(mn)', explanation: 'The whole grid is filled' },
      worst: { notation: 'O(mn)', explanation: 'm by n cells' },
    },
    space: { notation: 'O(mn)', explanation: 'Stores all prefix conversion costs' },
  },
  characteristics: [
    { label: 'DP Type', value: '2D grid' },
    { label: 'Ops', value: 'Ins/Del/Rep' },
    { label: 'Match', value: 'Diagonal' },
    { label: 'Goal', value: 'Min edits' },
  ],
  workedExample: {
    trace: [
      { source: 'horse', target: 'ros', operation: 'replace h→r' },
      { source: 'rorse', target: 'ros', operation: 'delete r' },
      { source: 'rose', target: 'ros', operation: 'delete e' },
    ],
    result: 'horse → ros takes 3 edits.',
  },
  realExample: {
    title: 'Example: Autocorrect',
    description: 'Words with small edit distance are likely spelling candidates.',
    steps: ['Compare prefixes', 'Charge one operation for insert/delete/replace', 'Choose the cheapest path through the grid'],
  },
}

export const minPathSumTheory = {
  name: 'Minimum Path Sum',
  overview: 'Minimum Path Sum finds the cheapest path from the top-left to bottom-right of a grid when movement is only right or down.',
  concept: 'dp[r][c] stores the cheapest cost to reach cell r,c. It equals grid[r][c] plus the cheaper of the top and left DP cells.',
  useCase: ['Grid path planning', 'Cost accumulation problems', 'Introductory 2D DP'],
  pros: ['Very visual recurrence', 'Top/left dependencies are easy to see', 'Great first grid DP'],
  cons: ['Movement rules are restricted', 'Obstacles or diagonal moves need variants'],
  complexity: {
    time: {
      best: { notation: 'O(mn)', explanation: 'Every grid cell is filled once' },
      average: { notation: 'O(mn)', explanation: 'Work equals grid size' },
      worst: { notation: 'O(mn)', explanation: 'm rows times n columns' },
    },
    space: { notation: 'O(mn)', explanation: 'Stores a DP cost for every grid cell' },
  },
  characteristics: [
    { label: 'DP Type', value: '2D grid' },
    { label: 'Moves', value: 'Right/Down' },
    { label: 'Depends On', value: 'Top/Left' },
    { label: 'Goal', value: 'Min cost' },
  ],
  workedExample: {
    trace: [
      { cell: '(0,0)', cost: 1, dp: 1 },
      { cell: '(0,1)', cost: 3, dp: 4 },
      { cell: '(1,0)', cost: 1, dp: 2 },
      { cell: '(2,2)', cost: 1, dp: 7 },
    ],
    result: 'For the demo grid, the minimum path sum is 7.',
  },
  realExample: {
    title: 'Example: Cheapest route on a grid',
    description: 'Each cell has a cost, and the path can only move right or down.',
    steps: ['Start with the first cell cost', 'For each cell, choose the cheaper previous direction', 'The bottom-right cell contains the cheapest total'],
  },
}

fibonacciTheory.tips = {
  memoryHook: 'If the same recursive answer is asked again, store it once and reuse it.',
  pattern: {
    state: 'dp[i] = Fibonacci number at position i',
    transition: 'dp[i] = dp[i - 1] + dp[i - 2]',
    baseCases: ['dp[0] = 0', 'dp[1] = 1'],
    iterationOrder: 'Left to right from 2 to n',
    answerLocation: 'dp[n]',
    patternFamily: 'Linear 1D DP',
  },
  recognition: [
    'The recursive solution calls the same subproblem many times.',
    'The current answer depends on a fixed number of previous answers.',
    'The problem can be solved by building smaller indices before larger indices.',
    'You see a recurrence like f(n) = f(n - 1) + f(n - 2).',
  ],
  pitfalls: [
    'Forgetting n = 0 and directly writing dp[1] can break small inputs.',
    'Using plain recursion gives exponential time because values repeat.',
    'Returning the whole table instead of dp[n] when only the final answer is needed.',
    'Confusing memoization top-down with tabulation bottom-up; both are DP, but the flow differs.',
  ],
  tricks: [
    'Once the table idea is clear, optimize space to two variables because only the previous two states are needed.',
    'Use Fibonacci as a template for climbing stairs and tiling problems.',
    'If the recurrence depends on the previous k states, keep a rolling window of size k.',
    'Write base cases before the loop; most DP bugs start there.',
  ],
  edgeCases: [
    'n = 0 should return 0.',
    'n = 1 should return 1.',
    'Large n can overflow normal JavaScript numbers.',
  ],
  optimizations: [
    'Space can be reduced from O(n) to O(1).',
    'Matrix exponentiation can solve Fibonacci in O(log n), but it hides the beginner DP idea.',
  ],
  whenNotToUse: [
    'If you only need a closed-form mathematical approximation.',
    'If n is extremely large and exact integer handling is not available.',
  ],
}

knapsackTheory.tips = {
  memoryHook: 'Every item asks: take me or leave me?',
  pattern: {
    state: 'dp[i][w] = best value using first i items with capacity w',
    transition: 'max(skip item i, take item i if it fits)',
    baseCases: ['dp[0][w] = 0: no items gives value 0', 'dp[i][0] = 0: zero capacity gives value 0'],
    iterationOrder: 'Items row by row, capacity from 0 to W',
    answerLocation: 'dp[n][W]',
    patternFamily: '0/1 choice DP',
  },
  recognition: [
    'Each item can be used at most once.',
    'The problem asks for maximum value/profit under a capacity or budget.',
    'For every item, the natural decision is take or skip.',
    'Constraints include item weights/costs and a total limit.',
    'Subset Sum and Partition Equal Subset Sum are close relatives.',
  ],
  pitfalls: [
    'Using unbounded knapsack logic when each item is allowed only once.',
    'In 1D optimization, iterating capacity forward accidentally reuses the same item.',
    'Mixing item index i with item array index i - 1.',
    'Forgetting that capacity is part of the state, not just a condition.',
    'Assuming O(nW) is polynomial in the numeric input size; it is pseudo-polynomial.',
  ],
  tricks: [
    'To reconstruct chosen items, walk backward from dp[n][W] and see where the value changed.',
    'For 1D 0/1 knapsack, iterate capacity backward from W down to weight.',
    'For unbounded knapsack, iterate capacity forward so the same item can be reused.',
    'If values are small but weights are huge, consider DP by total value instead of capacity.',
    'Boolean knapsack is Subset Sum: replace max value with reachable true/false.',
  ],
  edgeCases: [
    'No items: answer is 0.',
    'Capacity 0: answer is 0.',
    'Items heavier than capacity are always skipped.',
    'Zero-weight positive-value items need special handling in variants.',
  ],
  optimizations: [
    'Space can be reduced from O(nW) to O(W).',
    'Keep the 2D table when teaching or when you need reconstruction.',
  ],
  whenNotToUse: [
    'If fractional items are allowed; use Fractional Knapsack with greedy sorting.',
    'If each item can be used unlimited times; use Unbounded Knapsack.',
    'If capacity is extremely large and item count is small, meet-in-the-middle may fit better.',
  ],
}

lcsTheory.tips = {
  memoryHook: 'Match takes the diagonal; mismatch chooses the better neighbor.',
  pattern: {
    state: 'dp[i][j] = LCS length of A[0..i-1] and B[0..j-1]',
    transition: 'if chars match: 1 + diagonal; else max(top, left)',
    baseCases: ['dp[0][j] = 0: empty A has no common subsequence', 'dp[i][0] = 0: empty B has no common subsequence'],
    iterationOrder: 'Rows left to right, top to bottom',
    answerLocation: 'dp[m][n]',
    patternFamily: 'Two-string prefix DP',
  },
  recognition: [
    'The problem compares two sequences while preserving order.',
    'Characters/items do not need to be contiguous.',
    'You need longest common sequence, not necessarily a substring.',
    'The recurrence naturally compares prefixes of two inputs.',
    'Diff-style problems often reduce to LCS.',
  ],
  pitfalls: [
    'Confusing subsequence with substring. Subsequence can skip characters.',
    'Using dp[i][j] with characters A[i] and B[j] instead of A[i - 1] and B[j - 1].',
    'On mismatch, taking diagonal is wrong; use max(top, left).',
    'Returning the string requires backtracking; the table only gives length by default.',
  ],
  tricks: [
    'To reconstruct one LCS, start at bottom-right and walk backward.',
    'If characters match, include that character and move diagonal.',
    'If not, move toward the larger of top and left.',
    'Longest Palindromic Subsequence can be solved as LCS(s, reverse(s)).',
    'For memory-only length, keep two rows instead of the full table.',
  ],
  edgeCases: [
    'One empty string gives answer 0.',
    'Repeated characters can produce multiple valid LCS strings.',
    'Case sensitivity changes results unless normalized first.',
  ],
  optimizations: [
    'Space can be reduced from O(mn) to O(min(m,n)) for length only.',
    'Keep full O(mn) table when reconstructing the actual subsequence.',
  ],
  whenNotToUse: [
    'If the common part must be contiguous; use Longest Common Substring.',
    'If edits are insert/delete/replace with costs; use Edit Distance.',
  ],
}

coinChangeTheory.tips = {
  memoryHook: 'For every amount, ask: what was the best way to make amount minus this coin?',
  pattern: {
    state: 'dp[a] = minimum coins needed to make amount a',
    transition: 'dp[a] = min(dp[a], 1 + dp[a - coin])',
    baseCases: ['dp[0] = 0', 'all other amounts start as Infinity'],
    iterationOrder: 'Amount from 1 to target; try every coin',
    answerLocation: 'dp[amount], or -1 if Infinity',
    patternFamily: 'Unbounded minimum DP',
  },
  recognition: [
    'You can use each coin denomination unlimited times.',
    'The problem asks for minimum number of pieces/coins/items to reach a target.',
    'A greedy choice can fail for arbitrary denominations.',
    'The current amount can be built from a smaller amount plus one coin.',
    'This is an unbounded knapsack-style problem with min instead of max.',
  ],
  pitfalls: [
    'Initializing dp values to 0 makes impossible amounts look solved.',
    'Forgetting dp[0] = 0 breaks every transition.',
    'Returning Infinity instead of -1 for impossible amounts.',
    'Assuming the largest coin first is always optimal.',
    'Mixing this minimum-coins version with the count-number-of-ways version.',
  ],
  tricks: [
    'Use Infinity as the initial value so min transitions work naturally.',
    'To reconstruct coins, store which coin improved each amount.',
    'If counting ways instead of minimum coins, the loop order changes meaning.',
    'For combinations count, loop coins outside and amounts inside.',
    'For permutations count, loop amounts outside and coins inside.',
  ],
  edgeCases: [
    'Amount 0 needs 0 coins.',
    'No coins and positive amount means impossible.',
    'Coins larger than the current amount are skipped.',
    'Duplicate coin denominations should be removed.',
  ],
  optimizations: [
    'The standard solution is already O(amount) space.',
    'Sort coins so skipped larger coins are easier to reason about.',
  ],
  whenNotToUse: [
    'If each coin can be used once; use 0/1 knapsack or subset DP.',
    'If the denominations are canonical and only a quick real-world answer is needed, greedy may be enough.',
  ],
}

lisTheory.tips = {
  memoryHook: 'dp[i] answers: how long is the best increasing chain that must end here?',
  pattern: {
    state: 'dp[i] = LIS length ending exactly at index i',
    transition: 'if nums[j] < nums[i], dp[i] = max(dp[i], dp[j] + 1)',
    baseCases: ['every dp[i] starts at 1'],
    iterationOrder: 'i from left to right; j scans all previous indices',
    answerLocation: 'max(dp)',
    patternFamily: 'Sequence ending-at-index DP',
  },
  recognition: [
    'The problem asks for a subsequence, not a subarray.',
    'Order must be preserved, but elements may be skipped.',
    'The phrase longest increasing/decreasing chain appears.',
    'A good state is often best answer ending at this position.',
    'Problems involving envelopes, bridges, or ordered pairs often reduce to LIS after sorting.',
  ],
  pitfalls: [
    'Confusing subsequence with contiguous subarray.',
    'Using nums[j] <= nums[i] when the problem requires strictly increasing.',
    'Returning dp[n - 1] instead of max(dp); the LIS does not have to end at the last element.',
    'Sorting the array directly destroys original order unless the transformed problem allows sorting.',
    'For pair problems, sorting tie-breakers incorrectly can allow invalid equal-width choices.',
  ],
  tricks: [
    'Store prev[i] to reconstruct the actual subsequence.',
    'The O(n log n) patience sorting method tracks smallest possible tail values.',
    'For non-decreasing subsequence, change the comparison to <= and adapt binary search.',
    'For Longest Bitonic Subsequence, combine LIS from left and LIS from right.',
    'For 2D envelope problems, sort one dimension ascending and the other descending, then run LIS.',
  ],
  edgeCases: [
    'Empty array gives 0.',
    'All decreasing values give 1.',
    'Duplicates do not extend a strictly increasing subsequence.',
    'Negative numbers work normally because only comparisons matter.',
  ],
  optimizations: [
    'O(n2) DP is easiest to understand and reconstruct.',
    'O(n log n) tail-array method is faster but less direct for learning.',
  ],
  whenNotToUse: [
    'If the elements must be contiguous; use subarray DP such as Kadane variants.',
    'If the sequence can be reordered freely, LIS is not the right model.',
  ],
}

editDistanceTheory.tips = {
  memoryHook: 'Match is free; mismatch pays 1 plus the cheapest neighbor.',
  pattern: {
    state: 'dp[i][j] = min edits to convert source prefix i into target prefix j',
    transition: 'match: diagonal; mismatch: 1 + min(delete from top, insert from left, replace from diagonal)',
    baseCases: ['dp[i][0] = i deletions', 'dp[0][j] = j insertions'],
    iterationOrder: 'Fill prefixes from small to large, row by row',
    answerLocation: 'dp[source.length][target.length]',
    patternFamily: 'Two-string edit DP',
  },
  recognition: [
    'The problem asks to transform one string into another.',
    'Allowed operations include insert, delete, replace, or similar edit operations.',
    'You need a minimum operation count.',
    'The current decision depends on smaller prefixes of both strings.',
    'Spellcheck, fuzzy search, and DNA mutation distance are common examples.',
  ],
  pitfalls: [
    'Forgetting base row/column causes all later cells to be wrong.',
    'Mixing up insert and delete directions; the cost may still be right, but reconstruction breaks.',
    'Treating a character match as cost 1 instead of cost 0.',
    'Using LCS recurrence on mismatch; Edit Distance uses min with operation cost.',
    'Not checking whether replacements are allowed in the problem variant.',
  ],
  tricks: [
    'If characters match, copy diagonal without adding cost.',
    'Delete corresponds to moving from dp[i - 1][j].',
    'Insert corresponds to moving from dp[i][j - 1].',
    'Replace corresponds to moving from dp[i - 1][j - 1].',
    'For actual operations, backtrack from bottom-right choosing the neighbor that produced the cell.',
  ],
  edgeCases: [
    'Empty source to target length j needs j insertions.',
    'Source length i to empty target needs i deletions.',
    'Identical strings have distance 0.',
    'Case sensitivity and punctuation should be normalized if the product requires it.',
  ],
  optimizations: [
    'For distance only, keep two rows and reduce space to O(min(m,n)).',
    'For bounded edit distance k, only compute a diagonal band around the main diagonal.',
  ],
  whenNotToUse: [
    'If only insert/delete are allowed, LCS-based formulas may be simpler.',
    'If you need exact common ordered content rather than transformation cost, use LCS.',
  ],
}

minPathSumTheory.tips = {
  memoryHook: 'The cheapest way to enter a cell comes from the cheaper of top or left.',
  pattern: {
    state: 'dp[r][c] = minimum path cost from start to cell r,c',
    transition: 'grid[r][c] + min(dp[r - 1][c], dp[r][c - 1])',
    baseCases: ['dp[0][0] = grid[0][0]', 'first row can only come from left', 'first column can only come from top'],
    iterationOrder: 'Top-left to bottom-right',
    answerLocation: 'dp[lastRow][lastCol]',
    patternFamily: 'Grid path DP',
  },
  recognition: [
    'The problem is on a grid or matrix.',
    'Movement is restricted to right/down or a small fixed set of directions.',
    'The goal is minimum or maximum accumulated cost.',
    'Each cell depends only on already-computed neighboring cells.',
    'Unique Paths is the counting version of this pattern.',
  ],
  pitfalls: [
    'Forgetting first row and first column have only one incoming direction.',
    'Using BFS for weighted costs when DP order is enough.',
    'Allowing diagonal moves when the problem only permits right and down.',
    'Mutating the input grid when the caller expects it unchanged.',
    'Using Infinity incorrectly can produce NaN if added carelessly.',
  ],
  tricks: [
    'You can store dp directly in the grid if mutation is allowed.',
    'For space optimization, keep one row because each cell needs current row left and previous row same column.',
    'Obstacles can be handled by setting blocked cells to Infinity.',
    'Maximum path sum is the same structure with max instead of min.',
    'If movement is four-directional, this simple DP order no longer works; consider Dijkstra/BFS depending on weights.',
  ],
  edgeCases: [
    'Single-cell grid answer is that cell cost.',
    'Single row means only move right.',
    'Single column means only move down.',
    'Empty grid should be rejected or treated as 0 depending on requirements.',
  ],
  optimizations: [
    'Space can be reduced from O(mn) to O(n).',
    'In-place update can reduce extra space to O(1) if modifying the grid is acceptable.',
  ],
  whenNotToUse: [
    'If movement can go up/left repeatedly, cycles may exist and graph shortest path is safer.',
    'If edge weights vary and movement is not acyclic, use Dijkstra.',
  ],
}
