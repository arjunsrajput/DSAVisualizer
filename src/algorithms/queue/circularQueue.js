export const circularQueueCode = [
  'class CircularQueue {',
  '  constructor(capacity) {',
  '    this.items = new Array(capacity);',
  '    this.front = -1; this.rear = -1;',
  '    this.size = 0; this.capacity = capacity;',
  '  }',
  '  enqueue(val) {',
  '    if (this.isFull()) return "Overflow";',
  '    this.rear = (this.rear + 1) % this.capacity;',
  '    this.items[this.rear] = val;',
  '    if (this.front === -1) this.front = 0;',
  '    this.size++;',
  '  }',
  '  dequeue() {',
  '    if (this.isEmpty()) return null;',
  '    let val = this.items[this.front];',
  '    this.front = (this.front + 1) % this.capacity;',
  '    this.size--;',
  '    if (this.size === 0) { this.front = this.rear = -1; }',
  '    return val;',
  '  }',
  '}',
]

export function generateCircularQueueSteps(operations, capacity = 5) {
  const steps = []
  const items = new Array(capacity).fill(null)
  let front = -1, rear = -1, size = 0

  const snap = (op, activeLine, description) =>
    steps.push({ items: [...items], front, rear, size, capacity, operation: op, activeLine, description })

  snap('init', 0, `CircularQueue(capacity=${capacity}). Circular buffer — rear wraps around.`)

  for (const op of operations) {
    if (op.type === 'enqueue') {
      snap('enqueue', 6, `enqueue(${op.value}) called. size=${size}/${capacity}`)
      if (size === capacity) {
        snap('overflow', 7, `Overflow! Queue is full (size=${size}/${capacity}). Cannot enqueue ${op.value}.`)
        continue
      }
      rear = (rear + 1) % capacity
      items[rear] = op.value
      if (front === -1) front = 0
      size++
      snap('enqueue', 9, `rear = (${(rear - 1 + capacity) % capacity} + 1) % ${capacity} = ${rear}. items[${rear}]=${op.value}. front=${front}`)
    } else if (op.type === 'dequeue') {
      snap('dequeue', 13, `dequeue() called. front=${front}, size=${size}`)
      if (size === 0) {
        snap('underflow', 14, `Underflow! Queue is empty. Cannot dequeue.`)
        continue
      }
      const val = items[front]
      items[front] = null
      front = (front + 1) % capacity
      size--
      if (size === 0) { front = -1; rear = -1 }
      snap('dequeue', 16, `Dequeued ${val}. new front = ${front}. size=${size}`)
    }
  }

  return steps
}

export const defaultCircularQueueOps = [
  { type: 'enqueue', value: 10 }, { type: 'enqueue', value: 20 },
  { type: 'enqueue', value: 30 }, { type: 'enqueue', value: 40 },
  { type: 'enqueue', value: 50 }, { type: 'enqueue', value: 60 },
  { type: 'dequeue' }, { type: 'dequeue' },
  { type: 'enqueue', value: 70 }, { type: 'enqueue', value: 80 },
  { type: 'dequeue' }, { type: 'enqueue', value: 90 },
]
