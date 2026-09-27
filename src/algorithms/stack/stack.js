export const DEFAULT_STACK_CAPACITY = 5
export const MIN_STACK_CAPACITY = 1
export const MAX_STACK_CAPACITY = 10

export function normalizeStackCapacity(value) {
  const numeric = Number(value)
  if (!Number.isFinite(numeric)) return DEFAULT_STACK_CAPACITY
  return Math.min(MAX_STACK_CAPACITY, Math.max(MIN_STACK_CAPACITY, Math.floor(numeric)))
}

export const stackCode = [
  'class Stack {',
  '  constructor(capacity) {',
  '    this.items = [];',
  '    this.capacity = capacity;',
  '  }',
  '  push(element) {',
  '    if (this.isFull()) return "Overflow";',
  '    this.items.push(element);',
  '  }',
  '  pop() {',
  '    if (this.isEmpty()) return null;',
  '    return this.items.pop();',
  '  }',
  '  peek() {',
  '    if (this.isEmpty()) return null;',
  '    return this.items[this.items.length - 1];',
  '  }',
  '  isFull() {',
  '    return this.items.length === this.capacity;',
  '  }',
  '  isEmpty() {',
  '    return this.items.length === 0;',
  '  }',
  '}',
]

const STACK_CODE_LINE = {
  init: 0,
  pushStart: 5,
  pushOverflowCheck: 6,
  pushInsert: 7,
  popStart: 9,
  popEmptyCheck: 10,
  popRemove: 11,
  peekStart: 13,
  peekEmptyCheck: 14,
  peekReturn: 15,
}

export function generateStackSteps(operations, rawCapacity = DEFAULT_STACK_CAPACITY) {
  const capacity = normalizeStackCapacity(rawCapacity)
  const steps = []
  const stack = []

  steps.push({ stack: [], highlight: -1, operation: 'init', activeLine: STACK_CODE_LINE.init, description: `Stack initialized with capacity ${capacity}.` })

  for (const op of operations) {
    if (op.type === 'push') {
      steps.push({ stack: [...stack], highlight: -1, operation: 'push', value: op.value, activeLine: STACK_CODE_LINE.pushStart, description: `push(${op.value}) called` })
      if (stack.length >= capacity) {
        steps.push({ stack: [...stack], highlight: stack.length - 1, operation: 'overflow', value: op.value, activeLine: STACK_CODE_LINE.pushOverflowCheck, description: `push(${op.value}) blocked. Stack overflow: capacity ${capacity} is full.` })
        continue
      }
      stack.push(op.value)
      steps.push({ stack: [...stack], highlight: stack.length - 1, operation: 'push', value: op.value, activeLine: STACK_CODE_LINE.pushInsert, description: `${op.value} pushed to top of stack` })
    } else if (op.type === 'pop') {
      if (stack.length === 0) {
        steps.push({ stack: [], highlight: -1, operation: 'underflow', activeLine: STACK_CODE_LINE.popEmptyCheck, description: 'pop() called. Stack underflow: stack is empty, returning null.' })
      } else {
        steps.push({ stack: [...stack], highlight: stack.length - 1, operation: 'pop', activeLine: STACK_CODE_LINE.popStart, description: `pop() called. Removing top element ${stack[stack.length - 1]}.` })
        const val = stack.pop()
        steps.push({ stack: [...stack], highlight: -1, operation: 'pop', value: val, activeLine: STACK_CODE_LINE.popRemove, description: `${val} popped from stack` })
      }
    } else if (op.type === 'peek') {
      if (stack.length === 0) {
        steps.push({ stack: [], highlight: -1, operation: 'peek', activeLine: STACK_CODE_LINE.peekEmptyCheck, description: 'peek() called. Stack is empty, returning null.' })
      } else {
        steps.push({ stack: [...stack], highlight: stack.length - 1, operation: 'peek', activeLine: STACK_CODE_LINE.peekReturn, description: `peek() returns top element ${stack[stack.length - 1]}.` })
      }
    }
  }

  return steps
}

export const defaultStackOps = [
  { type: 'push', value: 10 },
  { type: 'push', value: 20 },
  { type: 'push', value: 30 },
  { type: 'push', value: 40 },
  { type: 'push', value: 50 },
  { type: 'push', value: 60 },
  { type: 'peek' },
  { type: 'pop' },
  { type: 'push', value: 70 },
  { type: 'pop' },
  { type: 'pop' },
  { type: 'pop' },
]
