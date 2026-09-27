export const countingSortTheory = {
  name: 'Counting Sort',
  overview: 'Counting Sort is a non-comparison integer sorting algorithm. It counts occurrences of each value, then reconstructs the sorted array from the count array. It works in linear time when the value range (k) is not significantly larger than the number of elements (n).',
  concept: 'Build a count array of size (max+1). Increment count[arr[i]] for each element. Then reconstruct the sorted array by iterating the count array and appending each value count[i] times.',
  useCase: ['Sorting integers in a known range', 'Counting occurrences of characters in strings', 'Stable sort for radix sort passes'],
  pros: ['O(n+k) time — linear when k is small', 'Stable sort', 'No comparisons needed'],
  cons: ['Only works for non-negative integers', 'Wastes space if value range is huge', 'Not in-place'],
  complexity: { time: { best: { notation: 'O(n+k)', explanation: 'Always same' }, average: { notation: 'O(n+k)', explanation: 'Always same' }, worst: { notation: 'O(n+k)', explanation: 'Always same' } }, space: { notation: 'O(k)', explanation: 'Count array of size k = max value' } },
  characteristics: [{ label: 'Type', value: 'Non-comparison' }, { label: 'Stable', value: 'Yes' }, { label: 'In-place', value: 'No' }, { label: 'Range required', value: 'Yes' }],
}

export const radixSortTheory = {
  name: 'Radix Sort',
  overview: 'Radix Sort processes integers digit by digit, from least significant to most significant (LSD approach). Each digit-pass uses a stable sort (counting sort). After d passes (d = number of digits), the array is fully sorted.',
  concept: 'For each digit position (1s, 10s, 100s...), do a stable counting sort based only on that digit. Since counting sort is stable, the relative order from previous passes is preserved.',
  useCase: ['Sorting large integers or fixed-length strings', 'Sorting IP addresses, zip codes', 'When digit count is small'],
  pros: ['O(d·n) — linear when d is constant', 'Stable sort', 'Beats comparison sorts for integers'],
  cons: ['Only for integers or fixed-length keys', 'Extra space for buckets', 'Slower than quicksort for small n'],
  complexity: { time: { best: { notation: 'O(d·n)', explanation: 'Always same' }, average: { notation: 'O(d·n)', explanation: 'Always same' }, worst: { notation: 'O(d·n)', explanation: 'Always same' } }, space: { notation: 'O(n+k)', explanation: 'Buckets and auxiliary array' } },
  characteristics: [{ label: 'Type', value: 'Non-comparison' }, { label: 'Stable', value: 'Yes' }, { label: 'In-place', value: 'No' }, { label: 'Based on', value: 'Counting Sort per digit' }],
}

export const bucketSortTheory = {
  name: 'Bucket Sort',
  overview: 'Bucket Sort distributes elements into a number of "buckets" based on their value range. Each bucket is then sorted individually (usually with insertion sort), and the buckets are concatenated.',
  concept: 'Divide the value range into n equal intervals (buckets). Place each element into its corresponding bucket using index = floor((x / (max+1)) * n). Sort each bucket and concatenate.',
  useCase: ['Uniformly distributed floating-point numbers', 'Data in a known range', 'When average-case O(n) is needed'],
  pros: ['O(n) average for uniform distribution', 'Parallelizable', 'Stable if stable bucket-sort used'],
  cons: ['Worst case O(n²) if all in one bucket', 'Requires uniform distribution for best performance', 'Extra space for buckets'],
  complexity: { time: { best: { notation: 'O(n)', explanation: 'Uniform distribution, 1 element per bucket' }, average: { notation: 'O(n+k)', explanation: 'Elements evenly spread' }, worst: { notation: 'O(n²)', explanation: 'All elements in one bucket' } }, space: { notation: 'O(n+k)', explanation: 'Buckets' } },
  characteristics: [{ label: 'Type', value: 'Distribution' }, { label: 'Stable', value: 'Depends' }, { label: 'In-place', value: 'No' }, { label: 'Ideal for', value: 'Uniform distribution' }],
}

export const bubbleSortTheory = {
  name: 'Bubble Sort',
  overview: 'Bubble Sort repeatedly compares adjacent elements and swaps them if they are in the wrong order. After each full pass, the largest unsorted element "bubbles up" to its correct position.',
  concept: 'Compare adjacent elements. If arr[i] > arr[i+1], swap them. Repeat for n-1 passes. Each pass guarantees one more element is in its final position.',
  useCase: ['Simple educational example', 'Nearly sorted small arrays', 'When swap count matters'],
  pros: ['Simple to implement', 'Detects already-sorted array in O(n) with optimization', 'Stable sort'],
  cons: ['O(n²) always — very slow on large data', 'Many unnecessary swaps'],
  complexity: { time: { best: { notation: 'O(n)', explanation: 'Already sorted (with early exit)' }, average: { notation: 'O(n²)', explanation: 'Random input' }, worst: { notation: 'O(n²)', explanation: 'Reverse sorted' } }, space: { notation: 'O(1)', explanation: 'In-place, no extra array' } },
  characteristics: [{ label: 'Stable', value: 'Yes' }, { label: 'In-place', value: 'Yes' }, { label: 'Adaptive', value: 'Yes (with flag)' }],
}

export const selectionSortTheory = {
  name: 'Selection Sort',
  overview: 'Selection Sort divides the array into a sorted and unsorted region. In each pass, it finds the minimum element in the unsorted region and swaps it to the beginning of that region.',
  concept: 'For i=0 to n-1: find index of minimum element in arr[i..n-1], swap arr[minIdx] with arr[i].',
  useCase: ['Small datasets', 'When minimizing swaps is important (at most n-1 swaps)', 'Educational example'],
  pros: ['Simple', 'At most n-1 swaps — good when write cost is high', 'In-place'],
  cons: ['Always O(n²) — no early exit', 'Not stable', 'Not adaptive'],
  complexity: { time: { best: { notation: 'O(n²)', explanation: 'Always scans full unsorted region' }, average: { notation: 'O(n²)', explanation: 'Always scans full unsorted region' }, worst: { notation: 'O(n²)', explanation: 'Always scans full unsorted region' } }, space: { notation: 'O(1)', explanation: 'In-place' } },
  characteristics: [{ label: 'Stable', value: 'No' }, { label: 'In-place', value: 'Yes' }, { label: 'Swaps', value: 'At most n-1' }],
}

export const insertionSortTheory = {
  name: 'Insertion Sort',
  overview: 'Insertion Sort builds a sorted array one element at a time by picking each element and inserting it into its correct position in the already-sorted left portion.',
  concept: 'For i=1 to n-1: pick arr[i] as key. Shift all elements in arr[0..i-1] greater than key one position right. Place key in the gap.',
  useCase: ['Small or nearly-sorted arrays', 'Online sorting (elements arrive one by one)', 'Part of hybrid sorts like TimSort'],
  pros: ['O(n) on nearly sorted data', 'Stable', 'In-place', 'Low overhead'],
  cons: ['O(n²) worst case', 'Many shifts for reverse-sorted input'],
  complexity: { time: { best: { notation: 'O(n)', explanation: 'Already sorted' }, average: { notation: 'O(n²)', explanation: 'Random data' }, worst: { notation: 'O(n²)', explanation: 'Reverse sorted' } }, space: { notation: 'O(1)', explanation: 'In-place' } },
  characteristics: [{ label: 'Stable', value: 'Yes' }, { label: 'Adaptive', value: 'Yes' }, { label: 'Online', value: 'Yes' }],
}

export const mergeSortTheory = {
  name: 'Merge Sort',
  overview: 'Merge Sort uses divide-and-conquer: recursively split the array in half until single elements, then merge sorted halves back together.',
  concept: 'Divide array at midpoint. Recursively sort left and right halves. Merge two sorted halves using two-pointer technique.',
  useCase: ['Large datasets', 'Linked list sorting (O(1) extra space)', 'External sorting', 'Stable sort requirement'],
  pros: ['O(n log n) guaranteed', 'Stable', 'Predictable performance'],
  cons: ['O(n) extra space for arrays', 'Slower in practice than quicksort due to memory allocations'],
  complexity: { time: { best: { notation: 'O(n log n)', explanation: 'Always divides evenly' }, average: { notation: 'O(n log n)', explanation: 'Always divides evenly' }, worst: { notation: 'O(n log n)', explanation: 'Guaranteed' } }, space: { notation: 'O(n)', explanation: 'Temp arrays during merge' } },
  characteristics: [{ label: 'Stable', value: 'Yes' }, { label: 'In-place', value: 'No' }, { label: 'Divide', value: 'Halves' }],
}

export const quickSortTheory = {
  name: 'Quick Sort',
  overview: 'Quick Sort picks a pivot element, partitions the array so all elements less than pivot come before it and greater after, then recursively sorts both partitions.',
  concept: 'Choose pivot (e.g. last element). Partition: move elements smaller than pivot to left, larger to right, pivot goes to its correct index. Recurse on left and right partitions.',
  useCase: ['General-purpose sorting', 'When average case performance matters', 'In-place sorting'],
  pros: ['O(n log n) average', 'In-place (O(log n) stack)', 'Cache-friendly', 'Fastest in practice for most inputs'],
  cons: ['O(n²) worst case on bad pivot', 'Not stable', 'Performance depends on pivot choice'],
  complexity: { time: { best: { notation: 'O(n log n)', explanation: 'Balanced partitions' }, average: { notation: 'O(n log n)', explanation: 'Random data' }, worst: { notation: 'O(n²)', explanation: 'Already sorted + bad pivot' } }, space: { notation: 'O(log n)', explanation: 'Recursion stack' } },
  characteristics: [{ label: 'Stable', value: 'No' }, { label: 'In-place', value: 'Yes' }, { label: 'Pivot', value: 'Last element (here)' }],
}

export const heapSortTheory = {
  name: 'Heap Sort',
  overview: 'Heap Sort builds a max-heap from the array, then repeatedly extracts the maximum element (root) and places it at the end.',
  concept: 'Build max-heap by calling heapify on all internal nodes bottom-up. Then repeatedly: swap root with last unsorted element, reduce heap size, heapify root to restore heap property.',
  useCase: ['When guaranteed O(n log n) needed', 'When O(1) extra space required', 'Priority queue operations'],
  pros: ['O(n log n) guaranteed', 'In-place O(1) space', 'No worst case like quicksort'],
  cons: ['Not stable', 'Slower in practice than quicksort due to cache misses', 'Not adaptive'],
  complexity: { time: { best: { notation: 'O(n log n)', explanation: 'Always' }, average: { notation: 'O(n log n)', explanation: 'Always' }, worst: { notation: 'O(n log n)', explanation: 'Guaranteed' } }, space: { notation: 'O(1)', explanation: 'In-place' } },
  characteristics: [{ label: 'Stable', value: 'No' }, { label: 'In-place', value: 'Yes' }, { label: 'Based on', value: 'Max Heap' }],
}

Object.assign(countingSortTheory, {
  workedExample: {
    array: [4, 2, 2, 8, 3, 3, 1],
    trace: [
      { step: 1, value: 4, countArray: [0, 0, 0, 0, 1, 0, 0, 0, 0], action: 'Count value 4' },
      { step: 2, value: 2, countArray: [0, 0, 2, 0, 1, 0, 0, 0, 0], action: 'Both 2s have count 2' },
      { step: 3, value: 3, countArray: [0, 1, 2, 2, 1, 0, 0, 0, 1], action: 'Finished counting all values' },
      { step: 4, output: [1, 2, 2, 3, 3, 4, 8], action: 'Rebuild output by expanding counts from low to high' },
    ],
    result: 'Sorted array: [1, 2, 2, 3, 3, 4, 8].',
  },
  realExample: {
    title: 'Exam score frequency',
    description: 'Scores from 0 to 100 have a small fixed range, so counts can sort them efficiently.',
    steps: ['Count how many students got each score', 'Walk scores from 0 to 100', 'Emit each score according to its count'],
  },
})

Object.assign(radixSortTheory, {
  workedExample: {
    array: [170, 45, 75, 90, 802, 24, 2, 66],
    trace: [
      { step: 1, digit: 'ones', output: [170, 90, 802, 2, 24, 45, 75, 66], action: 'Stable sort by ones digit' },
      { step: 2, digit: 'tens', output: [802, 2, 24, 45, 66, 170, 75, 90], action: 'Stable sort by tens digit' },
      { step: 3, digit: 'hundreds', output: [2, 24, 45, 66, 75, 90, 170, 802], action: 'Stable sort by hundreds digit' },
    ],
    result: 'After the most significant needed digit, the array is sorted.',
  },
  realExample: {
    title: 'Sorting fixed-width IDs',
    description: 'Numeric IDs can be ordered digit by digit without comparing full numbers.',
    steps: ['Sort by the least significant digit', 'Repeat for each higher digit', 'Keep each digit pass stable'],
  },
})

Object.assign(bucketSortTheory, {
  workedExample: {
    array: [0.78, 0.17, 0.39, 0.26, 0.72, 0.94],
    trace: [
      { step: 1, bucket: 0, values: [0.17], action: '0.17 goes into the first range bucket' },
      { step: 2, bucket: 1, values: [0.26, 0.39], action: 'Middle-low values share a bucket' },
      { step: 3, bucket: 3, values: [0.72, 0.78], action: 'Middle-high values share a bucket' },
      { step: 4, output: [0.17, 0.26, 0.39, 0.72, 0.78, 0.94], action: 'Sort each bucket and concatenate' },
    ],
    result: 'Sorted array: [0.17, 0.26, 0.39, 0.72, 0.78, 0.94].',
  },
  realExample: {
    title: 'Grouping sensor readings',
    description: 'Readings between 0 and 1 can be distributed into ranges, sorted locally, then joined.',
    steps: ['Create range buckets', 'Place every reading into its bucket', 'Sort inside buckets and concatenate in range order'],
  },
})

Object.assign(bubbleSortTheory, {
  workedExample: {
    array: [5, 1, 4, 2],
    trace: [
      { step: 1, pass: 1, comparison: '5 > 1', array: [1, 5, 4, 2], action: 'Swap adjacent pair' },
      { step: 2, pass: 1, comparison: '5 > 4', array: [1, 4, 5, 2], action: 'Swap adjacent pair' },
      { step: 3, pass: 1, comparison: '5 > 2', array: [1, 4, 2, 5], action: 'Largest value reaches the end' },
      { step: 4, pass: 2, comparison: '4 > 2', array: [1, 2, 4, 5], action: 'Swap; remaining values are sorted' },
    ],
    result: 'Sorted array: [1, 2, 4, 5].',
  },
  realExample: {
    title: 'Teaching adjacent swaps',
    description: 'Bubble sort is useful for showing how local swaps gradually produce global order.',
    steps: ['Compare neighbors', 'Swap if out of order', 'Repeat passes until no swap is needed'],
  },
})

Object.assign(selectionSortTheory, {
  workedExample: {
    array: [29, 10, 14, 37, 13],
    trace: [
      { step: 1, position: 0, minValue: 10, array: [10, 29, 14, 37, 13], action: 'Find minimum in full array and swap to index 0' },
      { step: 2, position: 1, minValue: 13, array: [10, 13, 14, 37, 29], action: 'Find minimum in remaining unsorted region' },
      { step: 3, position: 2, minValue: 14, array: [10, 13, 14, 37, 29], action: 'Already in correct position' },
      { step: 4, position: 3, minValue: 29, array: [10, 13, 14, 29, 37], action: 'Final swap completes ordering' },
    ],
    result: 'Sorted array: [10, 13, 14, 29, 37].',
  },
  realExample: {
    title: 'Choosing the cheapest item repeatedly',
    description: 'Selection sort mirrors repeatedly picking the cheapest remaining item and placing it next.',
    steps: ['Scan all remaining items', 'Select the smallest', 'Move it to the next sorted position'],
  },
})

Object.assign(insertionSortTheory, {
  workedExample: {
    array: [5, 2, 4, 6, 1],
    trace: [
      { step: 1, key: 2, array: [2, 5, 4, 6, 1], action: 'Shift 5 right and insert 2' },
      { step: 2, key: 4, array: [2, 4, 5, 6, 1], action: 'Shift 5 right and insert 4' },
      { step: 3, key: 6, array: [2, 4, 5, 6, 1], action: '6 already belongs after 5' },
      { step: 4, key: 1, array: [1, 2, 4, 5, 6], action: 'Shift sorted prefix right and insert 1' },
    ],
    result: 'Sorted array: [1, 2, 4, 5, 6].',
  },
  realExample: {
    title: 'Sorting cards in hand',
    description: 'Each new card is inserted into the correct position among already sorted cards.',
    steps: ['Hold left side sorted', 'Pick the next card', 'Shift larger cards and insert it into the gap'],
  },
})

Object.assign(mergeSortTheory, {
  workedExample: {
    array: [8, 3, 5, 4],
    trace: [
      { step: 1, split: '[8, 3] and [5, 4]', action: 'Divide the array into halves' },
      { step: 2, split: '[8], [3], [5], [4]', action: 'Keep dividing until single elements' },
      { step: 3, merge: '[3, 8] and [4, 5]', action: 'Merge single elements into sorted pairs' },
      { step: 4, merge: '[3, 4, 5, 8]', action: 'Merge the two sorted halves' },
    ],
    result: 'Sorted array: [3, 4, 5, 8].',
  },
  realExample: {
    title: 'External file sorting',
    description: 'Huge files can be split into sorted chunks and merged without loading everything at once.',
    steps: ['Split data into chunks', 'Sort each chunk', 'Merge sorted chunks with two pointers'],
  },
})

Object.assign(quickSortTheory, {
  workedExample: {
    array: [10, 7, 8, 9, 1, 5],
    trace: [
      { step: 1, pivot: 5, partition: '[1] 5 [10, 7, 8, 9]', action: 'Place values smaller than pivot on the left' },
      { step: 2, pivot: 9, partition: '[7, 8] 9 [10]', action: 'Partition the right side around 9' },
      { step: 3, pivot: 8, partition: '[7] 8 []', action: 'Partition remaining left side' },
      { step: 4, output: [1, 5, 7, 8, 9, 10], action: 'All partitions of size 0 or 1 are sorted' },
    ],
    result: 'Sorted array: [1, 5, 7, 8, 9, 10].',
  },
  realExample: {
    title: 'Fast in-memory sorting',
    description: 'Quicksort works well when data fits in memory and average-case speed matters.',
    steps: ['Pick a pivot', 'Partition around it', 'Recursively sort both sides'],
  },
})

Object.assign(heapSortTheory, {
  workedExample: {
    array: [4, 10, 3, 5, 1],
    trace: [
      { step: 1, heap: [10, 5, 3, 4, 1], action: 'Build a max heap' },
      { step: 2, swap: '10 with 1', array: [5, 4, 3, 1, 10], action: 'Move max to final position and heapify' },
      { step: 3, swap: '5 with 1', array: [4, 1, 3, 5, 10], action: 'Extract next maximum' },
      { step: 4, output: [1, 3, 4, 5, 10], action: 'Repeat until heap size is one' },
    ],
    result: 'Sorted array: [1, 3, 4, 5, 10].',
  },
  realExample: {
    title: 'Priority-backed sorting',
    description: 'Heap sort repeatedly takes the largest remaining item, like draining a priority queue.',
    steps: ['Build a max heap', 'Swap root with end', 'Shrink heap and restore heap property'],
  },
})

// ============ TIPS FOR ALL SORTING ALGORITHMS ============

bubbleSortTheory.tips = {
  memoryHook: '🫧 Heavy elements sink, light elements bubble up — one layer per pass.',
  pattern: {
    approach: 'Compare adjacent pairs and swap if in wrong order',
    passes: 'n-1 passes, each moves one element to final position',
    comparison: 'arr[i] > arr[i+1]',
    optimization: 'Add flag to detect if array is already sorted',
    complexity: 'Always O(n²) comparisons, but O(n) with early exit on sorted data',
  },
  recognition: [
    'Problem asks to compare adjacent elements',
    'You see "simplest sorting" or "educational" as a hint',
    'Data is nearly sorted (optimization applies)',
    'You need to count or visualize individual swaps',
  ],
  pitfalls: [
    'Forgetting the early exit optimization — mark a flag if no swaps happen in a pass',
    'Running all n passes even when array is sorted after k passes',
    'Confusing bubble sort\'s stability: it IS stable (equal elements maintain order)',
    'Using bubble sort on large data in real code — it\'s too slow (O(n²) dominates)',
  ],
  tricks: [
    'Add a swapped flag: if no swaps in a pass, array is sorted — break early',
    'Use bubble sort to teach the concept of sorting, then move to faster algorithms',
    'Optimized bubble sort can beat insertion sort on already-sorted data',
    'Stable sort — use it if relative order of equal elements must be preserved',
  ],
  edgeCases: [
    'Array of 1 element → already sorted',
    'Already sorted array → with optimization, detects in first pass',
    'Reverse sorted array → worst case, needs all n-1 passes',
    'Array with all duplicates → no swaps needed, early exit kicks in',
  ],
  optimizations: [
    'After each pass, the largest unsorted element is in place, so reduce loop boundary',
    'Add a swapped flag to break when array is fully sorted',
    'Combine with other sorts for hybrid approaches',
  ],
  whenNotToUse: [
    'Large datasets (n > 100) — use merge or quicksort',
    'Real-world production code — library sorts are optimized',
    'When stability is optional and speed critical — quicksort may be better',
  ],
}

selectionSortTheory.tips = {
  memoryHook: '🎯 Find the minimum, place it at the front, then ignore it forever.',
  pattern: {
    approach: 'Divide array into sorted (left) and unsorted (right) regions',
    eachPass: 'Find minimum in unsorted, swap to beginning of unsorted region',
    swaps: 'At most n-1 swaps (never more than one swap per pass)',
    comparison: 'arr[minIdx] compared with all remaining elements',
    space: 'In-place, O(1) extra space',
  },
  recognition: [
    'Problem says "minimize swaps" or "at most n-1 swaps"',
    'You need to select the smallest element repeatedly',
    'Write operations are expensive, read operations are cheap',
    '"Simple but not stable" is hinted',
  ],
  pitfalls: [
    'Confusing with bubble sort — selection finds the minimum first, then swaps',
    'Not detecting early termination (unlike bubble sort with flag, selection always needs n-1 passes)',
    'Assuming it\'s stable — it\'s NOT (swapping can break equal element order)',
    'Thinking it\'s better than insertion sort — insertion sort is faster on nearly-sorted data',
  ],
  tricks: [
    'Selection sort does exactly n-1 swaps, no more — useful when memory writes are slow',
    'Use it in embedded systems or hardware with expensive writes',
    'Understand it as the building block for heap sort (which improves selection sort)',
    'Selection sort is great for teaching the idea of "find and place" strategy',
  ],
  edgeCases: [
    'Array of 1 element → 0 swaps needed',
    'Already sorted array → still O(n²) comparisons, but 0 swaps',
    'Reverse sorted array → still O(n²), and all comparisons result in swaps',
    'Array with all duplicates → 0 swaps needed after first element',
  ],
  optimizations: [
    'Selection sort itself is already optimal for minimizing swaps',
    'Combine with insertion sort: use selection for large arrays, insertion for small subarrays',
  ],
  whenNotToUse: [
    'When you need stability (use insertion or merge sort)',
    'On large datasets (use merge, quick, or heap sort)',
    'When average case matters more than worst case',
  ],
}

insertionSortTheory.tips = {
  memoryHook: '🃏 Build a sorted hand of cards, one card at a time.',
  pattern: {
    approach: 'Left side is sorted, pick one element from right and insert it left',
    key: 'Current element being inserted',
    shift: 'Move larger elements one position right to make room',
    comparison: 'Compare key with sorted portion from right to left',
    adaptive: 'O(n) when already sorted, O(n²) when reverse sorted',
  },
  recognition: [
    'Array is small or nearly sorted',
    'Elements arrive one by one (online sorting)',
    'You see "insert into sorted position" in the problem',
    'Adaptive sorting is needed (performance varies with input order)',
  ],
  pitfalls: [
    'Shifting vs swapping — insertion uses shifts, not swaps',
    'Thinking insertion sort is slower than bubble sort — it\'s actually faster on average',
    'Starting loop from index 0 instead of 1 — first element is always sorted',
    'Not recognizing that it\'s stable — it maintains order of equal elements',
  ],
  tricks: [
    'Insertion sort is O(n) on nearly sorted data — use it as a final polish in hybrid sorts like TimSort',
    'Great for small subarrays: quicksort on large parts, then insertion sort on small chunks',
    'Easy to implement incrementally — add elements one at a time',
    'Insertion sort is used inside Java\'s Arrays.sort() and Python\'s Timsort for small arrays',
  ],
  edgeCases: [
    'Array of 1 element → no insertions needed',
    'Already sorted array → O(n) time, no actual insertions/shifts',
    'Reverse sorted array → O(n²), every element shifts to the far left',
    'All duplicates → O(n²) in worst case, but minimal effective work',
  ],
  optimizations: [
    'Use binary search to find insertion position (binary insertion sort) — O(n² ) time still, but fewer comparisons',
    'Use it only on small arrays (< 50 elements) in practice',
    'Combine with quicksort: partition, then insertion sort each small partition',
  ],
  whenNotToUse: [
    'Very large unsorted arrays — use merge or quicksort',
    'When you need guaranteed O(n log n) — use merge or heap sort',
    'When stability is not required and speed critical — quicksort or heap sort',
  ],
}

mergeSortTheory.tips = {
  memoryHook: '🌳 Divide and conquer: split until tiny, then merge while sorting.',
  pattern: {
    approach: 'Divide array into halves recursively, then merge sorted halves',
    merging: 'Use two pointers to merge two sorted subarrays into one',
    stability: 'Stable — equal elements keep their relative order',
    guarantee: 'Always O(n log n), no worst case',
    space: 'O(n) extra space for temp arrays',
  },
  recognition: [
    'Problem needs guaranteed O(n log n) performance',
    'Stability is required (maintain order of equal elements)',
    'Sorting linked lists efficiently (no random access)',
    'External sorting (data doesn\'t fit in memory)',
    '"Divide and conquer" is hinted',
  ],
  pitfalls: [
    'Forgetting O(n) space — merge sort uses temp arrays, not in-place',
    'Merging incorrectly — compare pointers carefully to maintain stability',
    'Not realizing merge sort is slower in practice than quicksort on small arrays due to memory overhead',
    'Thinking divide-and-conquer always equals quicksort — merge sort is D&C too',
  ],
  tricks: [
    'Merge sort is the baseline for O(n log n) sorting — understand it before optimization tricks',
    'Merge operation is the key skill: it\'s used in merge intervals, merging k sorted lists, etc.',
    'Hybrid approach: use quicksort, but fall back to merge sort if recursion gets too deep (introsort)',
    'For linked lists, merge sort beats quicksort because it doesn\'t need random access',
  ],
  edgeCases: [
    'Array of 1 element → returns immediately',
    'Already sorted array → still O(n log n) (no optimization possible)',
    'Reverse sorted array → still O(n log n) (stable, predictable)',
    'All duplicates → no swaps, just merging identical values',
  ],
  optimizations: [
    'Use insertion sort on small chunks (< 50 elements) instead of recursing further',
    'Avoid allocating temp arrays — reuse a buffer across all merges',
    'Check if right subarray\'s first element > left subarray\'s last — if so, already sorted, skip merge',
  ],
  whenNotToUse: [
    'When space is limited — need O(n) extra space',
    'Small arrays — quicksort is faster on average',
    'When in-place sorting is required (use quicksort or heap sort)',
  ],
}

quickSortTheory.tips = {
  memoryHook: '⚡ Pick a pivot, place it correctly, sort left and right around it.',
  pattern: {
    approach: 'Partition around pivot, then recursively sort left and right parts',
    partition: 'All elements < pivot go left, all > pivot go right',
    pivot: 'Choice affects performance (last, first, middle, random, or median-of-three)',
    average: 'O(n log n) on random data, O(n²) on worst case',
    space: 'O(log n) recursion stack (in-place)',
  },
  recognition: [
    'Problem needs average-case O(n log n) fast sorting',
    'Stability is not required',
    'Data fits in memory (in-place)',
    '"General purpose sorting" or "fastest in practice" is hinted',
  ],
  pitfalls: [
    'Bad pivot selection → O(n²) time (e.g., always picking smallest in sorted array)',
    'Not detecting the worst case — if sorted/reverse-sorted, basic quicksort fails',
    'Confusing partition schemes: Lomuto vs Hoare — understand the pointer movements',
    'Not handling duplicates well — three-way partition handles duplicates better',
  ],
  tricks: [
    'Random pivot selection avoids worst case on already-sorted data',
    'Median-of-three pivot: compare first, middle, last, pick median — balances better',
    'Three-way partition: separate < pivot, = pivot, > pivot — handles duplicates efficiently',
    'Quicksort is cache-friendly — it accesses nearby memory, faster than merge sort in practice',
    'Hybrid: use quicksort, but if recursion depth exceeds 2 * log(n), switch to heap sort (introsort)',
  ],
  edgeCases: [
    'Array of 1 element → already sorted',
    'Already sorted array → bad if using last element as pivot (O(n²))',
    'Reverse sorted array → bad if using last element as pivot (O(n²))',
    'All duplicates → basic partition creates unbalanced subarrays',
  ],
  optimizations: [
    'Use random or median-of-three pivot to avoid worst case',
    'Implement three-way partition to handle many duplicates',
    'Switch to insertion sort on small subarrays (< 10 elements)',
    'Tail recursion optimization: recurse on smaller partition first',
  ],
  whenNotToUse: [
    'Need guaranteed O(n log n) and can\'t risk worst case — use merge or heap sort',
    'Stability required — use merge sort',
    'Data doesn\'t fit in memory — use merge sort (external)',
  ],
}

heapSortTheory.tips = {
  memoryHook: '🏗️ Build a max-heap, extract max repeatedly, shrink heap each time.',
  pattern: {
    approach: 'Build max-heap from array, then extract maximum n times',
    heapify: 'Sift down to restore heap property after extracting root',
    inplace: 'Entire sort happens in-place, O(1) space',
    guarantee: 'Always O(n log n), no worst case like quicksort',
    stable: 'Not stable — parent-child swaps break order of equal elements',
  },
  recognition: [
    'Need guaranteed O(n log n) with O(1) space',
    'Stability not required',
    'Working with priority queues or partial sorting',
    '"Guaranteed performance and space" is hinted',
  ],
  pitfalls: [
    'Confusing heap indices: left child = 2i+1, right = 2i+2, parent = (i-1)/2',
    'Not rebuilding heap property correctly after swapping',
    'Thinking heap sort is as fast as quicksort in practice — it\'s slower due to cache misses',
    'Building min-heap instead of max-heap by mistake',
  ],
  tricks: [
    'Heapify bottom-up (start from non-leaf nodes) to build initial heap in O(n)',
    'Understand heap sort as repeatedly extracting from a priority queue',
    'Heap sort is less sensitive to input order than quicksort, but also slower in practice',
    'Use heap sort when you need guaranteed O(n log n) and don\'t want quicksort\'s worst case',
  ],
  edgeCases: [
    'Array of 1 element → already sorted',
    'Already sorted array → still O(n log n)',
    'Reverse sorted array → still O(n log n)',
    'All duplicates → no useful swaps, but still heapifies',
  ],
  optimizations: [
    'Build heap in-place using bottom-up heapify — O(n) instead of n log(n)',
    'Use it for k-largest or k-smallest problems (partial sort)',
    'Consider introsort: start with quicksort, switch to heapsort if recursion too deep',
  ],
  whenNotToUse: [
    'Average case matters more than worst case — quicksort is faster',
    'Stability required — use merge sort',
    'Cache efficiency matters — quicksort has better locality',
  ],
}

countingSortTheory.tips = {
  memoryHook: '📊 Count occurrences of each value, then rebuild array in order.',
  pattern: {
    approach: 'Non-comparison: count frequencies, then write sorted output',
    range: 'Requires integers in range [0, max]',
    stability: 'Can be made stable by processing backwards',
    linear: 'O(n + k) where k is range of values',
    space: 'O(k) for count array',
  },
  recognition: [
    'Values are integers in a known small range',
    'Problem asks for frequency count',
    'Linear time (not comparison-based) is possible',
    'Stability is required (e.g., sorting tuples by one key)',
  ],
  pitfalls: [
    'Forgetting that negative numbers need offset — use (value - min) as index',
    'Huge range k → counting sort uses too much memory (e.g., range 0 to 1 billion)',
    'Not handling duplicates correctly — count array stores frequency, not single index',
    'Thinking it works on floats — it requires discrete integers',
  ],
  tricks: [
    'Use counting sort as the stable sub-sort in radix sort',
    'For range [min, max], offset each value by min: index = value - min',
    'Build cumulative count array to place elements in final positions (making it stable)',
    'Counting sort is linear, so it beats O(n log n) sorts when k is small',
  ],
  edgeCases: [
    'All values are the same → count array has one entry, output trivial',
    'Range is very small (e.g., 0-5) → counting sort dominates',
    'Range is huge → counting sort wastes memory and time',
    'Negative numbers → offset by minimum value',
  ],
  optimizations: [
    'Use as the sub-sort in radix sort',
    'Cumulative sum approach for in-place reconstruction (with extra space for indices)',
    'For small ranges and large datasets, faster than any comparison sort',
  ],
  whenNotToUse: [
    'Values are floating-point numbers',
    'Range is much larger than n (e.g., n=100 values in range 0-10,000,000)',
    'Comparison-based library sort is simpler and not much slower',
  ],
}

radixSortTheory.tips = {
  memoryHook: '🔢 Sort by ones digit, then tens, then hundreds — stable each pass.',
  pattern: {
    approach: 'Process integers digit by digit (LSD or MSD)',
    each_pass: 'Use stable sort (counting sort) for current digit',
    stability: 'Each pass preserves order from previous passes',
    linear: 'O(d × (n + k)) where d = digits, k = base',
    digits: 'd = number of digits in largest value',
  },
  recognition: [
    'Sorting large integers or fixed-length strings',
    'Number of digits is small (e.g., phone numbers, zip codes)',
    'Linear time sorting is needed',
    'Problem mentions "digit" or "place value"',
  ],
  pitfalls: [
    'Forgetting stability — each digit pass must preserve previous order',
    'Using non-stable sort as sub-sort — defeats the purpose',
    'Not handling negative numbers — radix sort assumes non-negative',
    'Large number of digits → radix sort becomes slower than quicksort',
  ],
  tricks: [
    'Use least-significant-digit (LSD) radix sort for forward order',
    'Use most-significant-digit (MSD) radix sort for parallel processing',
    'Radix sort beats O(n log n) sorts when d × (n + k) < n log(n)',
    'For strings of fixed length, radix sort works like sorting by character position',
  ],
  edgeCases: [
    'All numbers have same digits → still O(d × (n + k))',
    'Single digit numbers → only one pass needed, behaves like counting sort',
    'Very large numbers (many digits) → radix sort might not beat quicksort',
    'All same value → stable, multiple passes do nothing',
  ],
  optimizations: [
    'Use counting sort as the digit-by-digit sub-sort',
    'Implement MSD variant for parallelization',
    'Skip leading zeros to reduce digit count',
  ],
  whenNotToUse: [
    'Floats or negative numbers (unless handled specially)',
    'Few digits relative to array size — quicksort is simpler',
    'When O(n log n) library sort is already fast enough',
  ],
}

bucketSortTheory.tips = {
  memoryHook: '🪣 Distribute values into range buckets, sort each, concatenate.',
  pattern: {
    approach: 'Divide value range into n equal buckets, place elements, sort each',
    bucket_index: 'index = floor((value / (max + 1)) * num_buckets)',
    sub_sort: 'Usually insertion sort within each bucket',
    average: 'O(n) average on uniform distribution',
    worst: 'O(n²) if all elements go into one bucket',
  },
  recognition: [
    'Values uniformly distributed in a known range',
    'Need O(n) average-case sorting',
    'Floating-point numbers in [0, 1)',
    'Data is roughly spread out (not clustered)',
  ],
  pitfalls: [
    'Assuming bucket sort is always O(n) — it\'s O(n) only for uniform distribution',
    'Non-uniform data → worst case O(n²) if all in one bucket',
    'Not choosing bucket count wisely — usually n buckets for n elements',
    'Thinking bucket sort works well on integers — better to use counting sort',
  ],
  tricks: [
    'Bucket sort is parallelizable — each bucket can be sorted independently',
    'Use for preprocessing before quicksort: bucket, then quicksort each bucket',
    'Works great for floating-point numbers in [0, 1) range',
    'Choose number of buckets ≈ sqrt(n) to balance distribution',
  ],
  edgeCases: [
    'All values same → all in one bucket, O(n) to sort that bucket',
    'Uniform distribution → perfect case, O(n) linear time',
    'Clustered distribution → some buckets have many elements, O(n²) worst case',
    'Very small range (e.g., 0.1 to 0.11) → counting sort might be better',
  ],
  optimizations: [
    'Adaptive bucket count based on data distribution',
    'Use insertion sort for small buckets (< 50 elements), merge sort for large',
    'Parallel bucket sorting across multiple cores',
  ],
  whenNotToUse: [
    'Non-uniform data distribution — use quicksort',
    'Data is integers with known small range — use counting sort',
    'Guarantees O(n log n) needed — use merge or quicksort',
  ],
}
