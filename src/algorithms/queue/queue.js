export const DEFAULT_QUEUE_CAPACITY = 5
export const MIN_QUEUE_CAPACITY = 1
export const MAX_QUEUE_CAPACITY = 10

export function normalizeQueueCapacity(value) {
  const numeric = Number(value)
  if (!Number.isFinite(numeric)) return DEFAULT_QUEUE_CAPACITY
  return Math.min(MAX_QUEUE_CAPACITY, Math.max(MIN_QUEUE_CAPACITY, Math.floor(numeric)))
}

export const queueCode = [
  'class Queue {',
  '  constructor(capacity) {',
  '    this.items = [];',
  '    this.capacity = capacity;',
  '  }',
  '  enqueue(element) {',
  '    if (this.isFull()) return "Overflow";',
  '    this.items.push(element);',
  '  }',
  '  dequeue() {',
  '    if (this.isEmpty()) return null;',
  '    return this.items.shift();',
  '  }',
  '  front() {',
  '    if (this.isEmpty()) return null;',
  '    return this.items[0];',
  '  }',
  '  isFull() {',
  '    return this.items.length === this.capacity;',
  '  }',
  '  isEmpty() {',
  '    return this.items.length === 0;',
  '  }',
  '}',
]

const QUEUE_CODE_LINE = {
  init: 0,
  enqueueStart: 5,
  enqueueOverflowCheck: 6,
  enqueueInsert: 7,
  dequeueStart: 9,
  dequeueEmptyCheck: 10,
  dequeueRemove: 11,
  frontStart: 13,
  frontEmptyCheck: 14,
  frontReturn: 15,
}

export function generateQueueSteps(operations, rawCapacity = DEFAULT_QUEUE_CAPACITY) {
  const capacity = normalizeQueueCapacity(rawCapacity)
  const steps = []
  const queue = []

  steps.push({ queue: [], front: -1, rear: -1, highlight: -1, operation: 'init', activeLine: QUEUE_CODE_LINE.init, description: `Queue initialized with capacity ${capacity}.` })

  for (const op of operations) {
    if (op.type === 'enqueue') {
      steps.push({ queue: [...queue], highlight: -1, operation: 'enqueue', value: op.value, activeLine: QUEUE_CODE_LINE.enqueueStart, description: `enqueue(${op.value}) called. Add to rear.` })
      if (queue.length >= capacity) {
        steps.push({ queue: [...queue], highlight: queue.length - 1, operation: 'overflow', value: op.value, activeLine: QUEUE_CODE_LINE.enqueueOverflowCheck, description: `enqueue(${op.value}) blocked. Queue overflow: capacity ${capacity} is full.` })
        continue
      }
      queue.push(op.value)
      steps.push({ queue: [...queue], highlight: queue.length - 1, operation: 'enqueue', value: op.value, activeLine: QUEUE_CODE_LINE.enqueueInsert, description: `${op.value} added to rear. Queue: [${queue.join(' -> ')}]` })
    } else if (op.type === 'dequeue') {
      if (queue.length === 0) {
        steps.push({ queue: [], highlight: -1, operation: 'underflow', activeLine: QUEUE_CODE_LINE.dequeueEmptyCheck, description: 'dequeue() called. Queue underflow: queue is empty, returning null.' })
      } else {
        steps.push({ queue: [...queue], highlight: 0, operation: 'dequeue', activeLine: QUEUE_CODE_LINE.dequeueStart, description: `dequeue() called. Removing front element ${queue[0]}.` })
        const val = queue.shift()
        steps.push({ queue: [...queue], highlight: -1, operation: 'dequeue', value: val, activeLine: QUEUE_CODE_LINE.dequeueRemove, description: `${val} removed from front. Queue: [${queue.join(' -> ')}]` })
      }
    } else if (op.type === 'front') {
      if (queue.length === 0) {
        steps.push({ queue: [], highlight: -1, operation: 'front', activeLine: QUEUE_CODE_LINE.frontEmptyCheck, description: 'front() called. Queue is empty, returning null.' })
      } else {
        steps.push({ queue: [...queue], highlight: 0, operation: 'front', activeLine: QUEUE_CODE_LINE.frontReturn, description: `front() returns ${queue[0]}.` })
      }
    }
  }

  return steps
}

export const defaultQueueOps = [
  { type: 'enqueue', value: 'A' },
  { type: 'enqueue', value: 'B' },
  { type: 'enqueue', value: 'C' },
  { type: 'enqueue', value: 'D' },
  { type: 'enqueue', value: 'E' },
  { type: 'enqueue', value: 'F' },
  { type: 'front' },
  { type: 'dequeue' },
  { type: 'enqueue', value: 'G' },
  { type: 'dequeue' },
  { type: 'dequeue' },
  { type: 'dequeue' },
]
