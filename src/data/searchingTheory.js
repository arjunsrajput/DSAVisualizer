export const linearSearchTheory = {
  name: 'Linear Search',
  overview: 'Linear Search sequentially checks each element in the array until the target is found or the array ends. It works on both sorted and unsorted arrays.',
  concept: 'Start from the first element and compare each element with the target until a match is found or the end is reached.',
  useCase: [
    'Searching in unsorted arrays',
    'Small datasets where simplicity matters more than speed',
    'Real-time data streams (online processing)',
  ],
  pros: [
    'Works on unsorted arrays',
    'Simple implementation',
    'No preprocessing needed',
  ],
  cons: [
    'Slow for large datasets',
    'Checks every element in worst case',
  ],
  complexity: {
    time: {
      best: { notation: 'O(1)', explanation: 'Element found at first position' },
      average: { notation: 'O(n)', explanation: 'Element found somewhere in middle on average' },
      worst: { notation: 'O(n)', explanation: 'Element at last position or not present' },
    },
    space: { notation: 'O(1)', explanation: 'Only uses a fixed amount of extra space for loop variables' },
  },
  characteristics: [
    { label: 'Stability', value: 'N/A' },
    { label: 'In-place', value: 'Yes' },
    { label: 'Adaptive', value: 'No' },
    { label: 'Online', value: 'Yes' },
  ],
  workedExample: {
    array: [9, 3, 7, 1, 15, 6, 12, 4],
    target: 15,
    trace: [
      { step: 1, index: 0, value: 9, comparison: '9 ≠ 15', action: 'Continue' },
      { step: 2, index: 1, value: 3, comparison: '3 ≠ 15', action: 'Continue' },
      { step: 3, index: 2, value: 7, comparison: '7 ≠ 15', action: 'Continue' },
      { step: 4, index: 3, value: 1, comparison: '1 ≠ 15', action: 'Continue' },
      { step: 5, index: 4, value: 15, comparison: '15 = 15', action: '✓ FOUND!' },
    ],
    result: 'Found at index 4 after 5 comparisons',
  },
  realExample: {
    title: 'Example: Finding a book in unsorted pile',
    description: 'You have a stack of 8 books (unsorted by title). Looking for "The Great Gatsby":',
    steps: [
      'Check book 1 → Not Gatsby',
      'Check book 2 → Not Gatsby',
      'Check book 3 → Not Gatsby',
      'Check book 4 → Not Gatsby',
      'Check book 5 → Found Gatsby! ✓',
    ],
  },
};

export const binarySearchTheory = {
  name: 'Binary Search',
  overview: 'Binary Search efficiently finds a target in a sorted array by repeatedly dividing the search space in half. It\'s much faster than linear search for large datasets.',
  concept: 'Divide and Conquer: Compare target with the middle element. If smaller, search left half; if larger, search right half. Repeat until found.',
  useCase: [
    'Large sorted datasets',
    'Dictionary/phonebook searches',
    'Database queries on indexed columns',
    'Finding boundaries (first occurrence, upper/lower bounds)',
  ],
  pros: [
    'Very fast - O(log n) complexity',
    'Efficient even for millions of elements',
    'Predictable performance',
  ],
  cons: [
    'Requires sorted array',
    'Sorting cost not included in analysis',
    'More complex than linear search',
  ],
  complexity: {
    time: {
      best: { notation: 'O(1)', explanation: 'Target is at the middle position on first check' },
      average: { notation: 'O(log n)', explanation: 'Average case requires ~log(n) divisions' },
      worst: { notation: 'O(log n)', explanation: 'Even if not found, only needs ~log(n) divisions' },
    },
    space: { notation: 'O(1)', explanation: 'Only uses variables for low, high, mid pointers' },
  },
  characteristics: [
    { label: 'Requires', value: 'Sorted array' },
    { label: 'In-place', value: 'Yes' },
    { label: 'Adaptive', value: 'No' },
    { label: 'Online', value: 'No' },
  ],
  workedExample: {
    array: [2, 5, 8, 12, 16, 23, 38, 45],
    target: 23,
    trace: [
      { iteration: 1, low: 0, high: 7, mid: 3, midValue: 12, comparison: '12 < 23', action: 'Search right half' },
      { iteration: 2, low: 4, high: 7, mid: 5, midValue: 23, comparison: '23 = 23', action: '✓ FOUND!' },
    ],
    result: 'Found at index 5 in 2 comparisons (vs 6 for linear)',
  },
  comparisonTable: {
    title: 'Linear vs Binary Search Comparisons',
    data: [
      { size: '10 elements', linear: '10 worst', binary: '4 worst' },
      { size: '1,000 elements', linear: '1,000 worst', binary: '10 worst' },
      { size: '1,000,000 elements', linear: '1,000,000 worst', binary: '20 worst' },
      { size: '1 billion elements', linear: '1 billion worst', binary: '30 worst' },
    ],
  },
  realExample: {
    title: 'Example: Finding a name in sorted phonebook',
    description: 'Looking for "Smith" in a phonebook with 1000 entries:',
    steps: [
      'Open to middle (page ~500) → Find entries starting with "M"',
      'Smith comes after M → Search right half, open to middle of pages 500-1000 (page ~750) → Find entries starting with "S"',
      'Smith is in S → Search in this section, refine position',
      'Found "Smith" in just 3-4 checks!',
    ],
  },
};

export const medianOfMediansTheory = {
  name: 'Median of Medians',
  overview: 'Median of Medians is a deterministic selection algorithm for finding the kth smallest element without sorting the whole array. It chooses a pivot by grouping elements into small groups, taking each group median, and recursively finding the median of those medians.',
  concept: 'Split the active array into groups of 5, sort each small group, collect the group medians, recursively select the median of those medians as pivot, partition around that pivot, and recurse only into the partition that contains k.',
  useCase: [
    'Finding kth smallest or kth largest with worst-case O(n) time',
    'Choosing robust pivots for selection',
    'Teaching why pivot quality matters in partition algorithms',
  ],
  pros: [
    'Guaranteed O(n) worst-case time',
    'Does not need full sorting',
    'Makes pivot selection predictable instead of random',
  ],
  cons: [
    'More complex than Quickselect',
    'Larger constant factors in practice',
    'Usually slower than randomized Quickselect on average',
  ],
  complexity: {
    time: {
      best: { notation: 'O(n)', explanation: 'Grouping, median extraction, and partitioning still scan the active elements' },
      average: { notation: 'O(n)', explanation: 'The selected pivot guarantees enough elements are discarded each round' },
      worst: { notation: 'O(n)', explanation: 'Median-of-medians avoids consistently bad pivots, keeping the recurrence linear' },
    },
    space: { notation: 'O(n)', explanation: 'This visual implementation builds groups, medians, and partition arrays for clarity' },
  },
  characteristics: [
    { label: 'Goal', value: 'kth smallest' },
    { label: 'Pivot', value: 'Median of medians' },
    { label: 'Group size', value: '5' },
    { label: 'Worst case', value: 'Linear' },
  ],
  workedExample: {
    array: [12, 3, 5, 7, 19, 26, 4, 15, 9, 1, 30, 18, 11],
    target: 'k = 6',
    trace: [
      { step: 1, action: 'Group into chunks of 5', groups: ['[12,3,5,7,19]', '[26,4,15,9,1]', '[30,18,11]'] },
      { step: 2, action: 'Sort each group and take medians', medians: [7, 9, 18] },
      { step: 3, action: 'Median of medians is 9', pivot: 9 },
      { step: 4, action: 'Partition around 9', less: [3, 5, 7, 4, 1], equal: [9], greater: [12, 19, 26, 15, 30, 18, 11] },
      { step: 5, action: 'k=6 matches pivot rank 6', result: 9 },
    ],
    result: 'The 6th smallest element is 9.',
  },
  realExample: {
    title: 'Finding a percentile threshold',
    description: 'To find an exact percentile value in unsorted data, selection avoids sorting every item.',
    steps: [
      'Convert the percentile into a kth-position query',
      'Choose a deterministic pivot using medians of groups',
      'Partition values below and above the pivot',
      'Continue only in the side containing the target position',
    ],
  },
  comparisonTable: {
    title: 'Selection Approaches',
    data: [
      { approach: 'Sort then index', average: 'O(n log n)', worst: 'O(n log n)', pivot: 'None' },
      { approach: 'Randomized Quickselect', average: 'O(n)', worst: 'O(n²)', pivot: 'Random/partition' },
      { approach: 'Median of Medians', average: 'O(n)', worst: 'O(n)', pivot: 'Deterministic' },
    ],
  },
}
