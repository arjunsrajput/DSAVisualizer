export const circularQueueTheory = {
  name: 'Circular Queue',
  overview: 'A Circular Queue (Ring Buffer) wraps around when the rear reaches the end of the array, using the freed space from dequeued elements at the front. This solves the wasted-space problem of a simple linear queue.',
  concept: 'Use modulo arithmetic: rear = (rear + 1) % capacity. The queue is full when (rear + 1) % capacity == front. It is empty when front == rear and size == 0.',
  useCase: ['CPU scheduling (Round Robin)', 'Keyboard input buffers', 'Streaming data buffers', 'Traffic light controllers'],
  pros: ['O(1) enqueue and dequeue', 'Efficient space reuse', 'Fixed memory footprint'],
  cons: ['Fixed capacity', 'Full/empty distinction needs extra tracking', 'More complex than linear queue'],
  complexity: { time: { best: { notation: 'O(1)', explanation: 'Direct index calculation' }, average: { notation: 'O(1)', explanation: 'Direct index calculation' }, worst: { notation: 'O(1)', explanation: 'Direct index calculation' } }, space: { notation: 'O(n)', explanation: 'Fixed capacity array' } },
  characteristics: [{ label: 'Wrap-around', value: '(idx + 1) % capacity' }, { label: 'Full condition', value: 'size == capacity' }, { label: 'Real use', value: 'OS kernel buffers' }],
}

export const priorityQueueTheory = {
  name: 'Priority Queue (Min Heap)',
  overview: 'A Priority Queue always serves the element with highest priority first. A Binary Min Heap implements it efficiently — the minimum element is always at the root. Insert does bubble-up; extract-min does sift-down.',
  concept: 'Store elements in an array where parent at index i has children at 2i+1 and 2i+2. After insert (append + bubble-up) or extract-min (swap root with last + sift-down), restore the heap property.',
  useCase: ["Dijkstra's shortest path", "Prim's MST", 'Task scheduling by priority', 'Median maintenance', 'A* pathfinding'],
  pros: ['O(log n) insert and extract', 'O(1) peek at min/max', 'In-place with array'],
  cons: ['O(n) arbitrary search', 'Not sorted — only min/max accessible in O(1)'],
  complexity: { time: { best: { notation: 'O(1)', explanation: 'Peek at min' }, average: { notation: 'O(log n)', explanation: 'Insert or extract' }, worst: { notation: 'O(log n)', explanation: 'Bubble up/down full height' } }, space: { notation: 'O(n)', explanation: 'Array of n elements' } },
  characteristics: [{ label: 'Root', value: 'Always minimum' }, { label: 'Height', value: 'O(log n)' }, { label: 'Parent of i', value: 'floor((i-1)/2)' }, { label: 'Children of i', value: '2i+1, 2i+2' }],
}

export const queueTheory = {
  name: 'Queue',
  overview: 'A Queue is a linear data structure following First In, First Out (FIFO) order. The first element added is the first to be removed. Think of a line at a ticket counter.',
  concept: 'Maintain front and rear pointers. Enqueue: add at rear. Dequeue: remove from front. Front: view front element without removing.',
  useCase: ['CPU process scheduling', 'BFS traversal', 'Print spooler', 'Message queues', 'Breadth-first search'],
  pros: ['O(1) enqueue and dequeue', 'Models real-world FIFO processes naturally', 'Foundation for BFS'],
  cons: ['No random access', 'Linear queue wastes space after dequeues (use circular queue)'],
  complexity: { time: { best: { notation: 'O(1)', explanation: 'Enqueue/dequeue always O(1)' }, average: { notation: 'O(1)', explanation: 'Enqueue/dequeue always O(1)' }, worst: { notation: 'O(1)', explanation: 'Enqueue/dequeue always O(1)' } }, space: { notation: 'O(n)', explanation: 'n elements stored' } },
  characteristics: [{ label: 'Order', value: 'FIFO' }, { label: 'Front access', value: 'O(1)' }, { label: 'Arbitrary access', value: 'O(n)' }],
}

Object.assign(circularQueueTheory, {
  workedExample: {
    trace: [
      { step: 1, operation: 'enqueue(10)', front: 0, rear: 1, buffer: [10, null, null, null], action: 'Insert at rear, advance rear modulo capacity' },
      { step: 2, operation: 'enqueue(20)', front: 0, rear: 2, buffer: [10, 20, null, null], action: 'Rear moves forward' },
      { step: 3, operation: 'dequeue()', front: 1, rear: 2, buffer: [null, 20, null, null], action: 'Remove front and advance front' },
      { step: 4, operation: 'enqueue(30)', front: 1, rear: 3, buffer: [null, 20, 30, null], action: 'Use next available slot' },
      { step: 5, operation: 'enqueue(40)', front: 1, rear: 0, buffer: [null, 20, 30, 40], action: 'Rear wraps around to index 0' },
    ],
    result: 'Modulo arithmetic reuses array space after dequeues.',
  },
  realExample: {
    title: 'Keyboard input buffer',
    description: 'Keystrokes enter a fixed-size ring buffer while the app consumes them in order.',
    steps: ['Write at rear', 'Read from front', 'Wrap indices when they reach capacity'],
  },
})

Object.assign(priorityQueueTheory, {
  workedExample: {
    trace: [
      { step: 1, operation: 'insert(5)', heap: [5], action: 'First element becomes root' },
      { step: 2, operation: 'insert(2)', heap: [2, 5], action: 'Bubble 2 above 5 because it has higher priority in min-heap' },
      { step: 3, operation: 'insert(8)', heap: [2, 5, 8], action: '8 stays below root' },
      { step: 4, operation: 'extractMin()', heap: [5, 8], action: 'Remove 2, move last to root, sift down' },
    ],
    result: 'The minimum priority item is served first.',
  },
  realExample: {
    title: 'Task scheduler',
    description: 'A scheduler can run the smallest deadline or highest-priority task first.',
    steps: ['Insert task with priority', 'Peek root for next task', 'Extract root and restore heap order'],
  },
})

Object.assign(queueTheory, {
  workedExample: {
    trace: [
      { step: 1, operation: 'enqueue(10)', queue: [10], action: '10 enters at rear' },
      { step: 2, operation: 'enqueue(20)', queue: [10, 20], action: '20 waits behind 10' },
      { step: 3, operation: 'front()', queue: [10, 20], action: 'Read 10 without removing it' },
      { step: 4, operation: 'dequeue()', queue: [20], action: 'Remove 10 from front' },
    ],
    result: 'The first enqueued value is the first dequeued value.',
  },
  realExample: {
    title: 'Print spooler',
    description: 'Print jobs are handled in arrival order so earlier jobs finish first.',
    steps: ['Add each print job at rear', 'Printer reads from front', 'Remove completed job and continue'],
  },
})
