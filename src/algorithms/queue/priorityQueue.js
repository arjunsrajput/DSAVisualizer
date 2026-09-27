export const priorityQueueCode = [
  'class MinHeap {',
  '  insert(val) {',
  '    this.heap.push(val);',
  '    this.bubbleUp(this.heap.length - 1);',
  '  }',
  '  bubbleUp(i) {',
  '    while (i > 0) {',
  '      let parent = Math.floor((i - 1) / 2);',
  '      if (this.heap[parent] > this.heap[i]) {',
  '        swap(this.heap, parent, i);',
  '        i = parent;',
  '      } else break;',
  '    }',
  '  }',
  '  extractMin() {',
  '    let min = this.heap[0];',
  '    this.heap[0] = this.heap.pop();',
  '    this.siftDown(0);',
  '    return min;',
  '  }',
  '  siftDown(i) {',
  '    let n = this.heap.length;',
  '    while (true) {',
  '      let l=2*i+1, r=2*i+2, smallest=i;',
  '      if (l<n && heap[l]<heap[smallest]) smallest=l;',
  '      if (r<n && heap[r]<heap[smallest]) smallest=r;',
  '      if (smallest === i) break;',
  '      swap(heap, i, smallest); i = smallest;',
  '    }',
  '  }',
  '}',
]

function heapToTree(heap) {
  return heap.map((val, i) => ({
    id: i, val,
    parent: i === 0 ? null : Math.floor((i - 1) / 2),
    left: 2 * i + 1 < heap.length ? 2 * i + 1 : null,
    right: 2 * i + 2 < heap.length ? 2 * i + 2 : null,
  }))
}

export function generatePriorityQueueSteps(operations) {
  const steps = []
  const heap = []

  const snap = (highlight, swapping, activeLine, description) =>
    steps.push({ heap: [...heap], tree: heapToTree(heap), highlight, swapping: swapping || [], activeLine, description })

  snap([], [], 0, 'MinHeap initialized. Parent is always ≤ children.')

  for (const op of operations) {
    if (op.type === 'insert') {
      heap.push(op.value)
      snap([heap.length - 1], [], 2, `insert(${op.value}): push to end at index ${heap.length - 1}`)

      let i = heap.length - 1
      while (i > 0) {
        const parent = Math.floor((i - 1) / 2)
        snap([i, parent], [], 7, `bubbleUp: heap[${i}]=${heap[i]} vs parent heap[${parent}]=${heap[parent]}`)
        if (heap[parent] > heap[i]) {
          ;[heap[parent], heap[i]] = [heap[i], heap[parent]]
          snap([parent], [i, parent], 9, `${heap[i]} > ${heap[parent]} → swap! Bubble up continues.`)
          i = parent
        } else {
          snap([i], [], 11, `${heap[parent]} ≤ ${heap[i]} → heap property satisfied. Stop.`)
          break
        }
      }
      snap([0], [], 3, `insert(${op.value}) complete. Min at root: ${heap[0]}`)
    } else if (op.type === 'extractMin') {
      if (heap.length === 0) { snap([], [], 14, 'extractMin(): heap is empty!'); continue }
      const min = heap[0]
      snap([0], [], 14, `extractMin(): min = ${min} at root`)
      heap[0] = heap.pop()
      if (heap.length > 0) {
        snap([0], [], 16, `Move last element ${heap[0]} to root. Now sift down.`)
        let i = 0
        while (true) {
          const l = 2 * i + 1, r = 2 * i + 2
          let smallest = i
          if (l < heap.length && heap[l] < heap[smallest]) smallest = l
          if (r < heap.length && heap[r] < heap[smallest]) smallest = r
          if (smallest === i) { snap([i], [], 26, `heap[${i}]=${heap[i]} is smallest child → stop.`); break }
          snap([i, smallest], [i, smallest], 27, `heap[${smallest}]=${heap[smallest]} < heap[${i}]=${heap[i]} → swap & sift down`)
          ;[heap[i], heap[smallest]] = [heap[smallest], heap[i]]
          i = smallest
        }
      }
      snap([0], [], 18, `✓ Extracted min: ${min}. New min at root: ${heap[0] ?? 'none'}`)
    }
  }
  return steps
}

export const defaultPQOps = [
  { type: 'insert', value: 15 }, { type: 'insert', value: 10 },
  { type: 'insert', value: 30 }, { type: 'insert', value: 5 },
  { type: 'insert', value: 20 }, { type: 'insert', value: 8 },
  { type: 'extractMin' }, { type: 'extractMin' }, { type: 'insert', value: 3 },
]
