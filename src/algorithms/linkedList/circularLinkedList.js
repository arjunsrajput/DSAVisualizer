export const circularLinkedListCode = [
  'class Node { constructor(val) {',
  '  this.val = val; this.next = null; } }',
  'class CircularLinkedList {',
  '  insertAtHead(val) {',
  '    let node = new Node(val);',
  '    if (!head) { node.next = node; head = node; return; }',
  '    node.next = head;',
  '    let tail = head;',
  '    while (tail.next !== head) tail = tail.next;',
  '    tail.next = node;',
  '    head = node;',
  '  }',
  '  insertAtTail(val) {',
  '    let node = new Node(val);',
  '    if (!head) { node.next = node; head = node; return; }',
  '    let tail = head;',
  '    while (tail.next !== head) tail = tail.next;',
  '    node.next = head;',
  '    tail.next = node;',
  '  }',
  '  delete(val) {',
  '    if (!head) return;',
  '    if (head.val === val) {',
  '      if (head.next === head) { head = null; return; }',
  '      let tail = head;',
  '      while (tail.next !== head) tail = tail.next;',
  '      head = head.next;',
  '      tail.next = head;',
  '      return;',
  '    }',
  '    let curr = head;',
  '    while (curr.next !== head && curr.next.val !== val)',
  '      curr = curr.next;',
  '    if (curr.next.val === val)',
  '      curr.next = curr.next.next;',
  '  }',
  '}',
]

function listToArray(head) {
  if (!head) return []
  const arr = []
  let curr = head
  do {
    arr.push(curr.val)
    curr = curr.next
  } while (curr !== head)
  return arr
}

function listToNodes(head) {
  if (!head) return []
  const nodes = []
  let curr = head
  do {
    nodes.push({
      val: curr.val,
      address: curr.address,
      nextAddress: curr.next ? curr.next.address : null,
      isCircular: curr.next === head,
    })
    curr = curr.next
  } while (curr !== head)
  return nodes
}

export const defaultCircularListOps = [
  { type: 'insertHead', value: 10 },
  { type: 'insertTail', value: 20 },
  { type: 'insertTail', value: 30 },
  { type: 'insertHead', value: 5 },
]

export function generateCircularListSteps(operations) {
  const steps = []
  let head = null
  let nextAddress = 0x100

  const snapshot = (highlight, activeLine, description, extra = {}) => {
    steps.push({ nodes: listToNodes(head), highlight, activeLine, description, ...extra })
  }

  const createNode = (val, next = null) => {
    const node = {
      val,
      next,
      address: `0x${nextAddress.toString(16).toUpperCase()}`,
    }
    nextAddress += 0x20
    return node
  }

  snapshot(-1, 0, 'Circular Linked List initialized. head = null')

  for (const op of operations) {
    if (op.type === 'insertHead') {
      snapshot(-1, 3, `insertAtHead(${op.value}) called`)
      const node = createNode(op.value)
      if (!head) {
        node.next = node
        head = node
        snapshot(0, 5, `${op.value} inserted as first node. Node points to itself (circular)`)
      } else {
        let tail = head
        while (tail.next !== head) tail = tail.next
        node.next = head
        tail.next = node
        head = node
        snapshot(0, 10, `${op.value} inserted at head. Tail now points to new head. New head = ${node.address}`)
      }

    } else if (op.type === 'insertTail') {
      snapshot(-1, 12, `insertAtTail(${op.value}) called`)
      const node = createNode(op.value)
      if (!head) {
        node.next = node
        head = node
        snapshot(0, 14, `${op.value} inserted as first node. Node points to itself (circular)`)
      } else {
        let tail = head, idx = 0
        while (tail.next !== head) {
          tail = tail.next
          idx++
        }
        snapshot(idx, 15, `Traversed to tail: ${tail.val}`)
        node.next = head
        tail.next = node
        snapshot(idx + 1, 18, `${op.value} appended at tail. Tail now points back to head (circular)`)
      }

    } else if (op.type === 'delete') {
      const arr = listToArray(head)
      const idx = arr.indexOf(op.value)
      if (idx === -1) {
        snapshot(-1, 20, `${op.value} not found in list`)
        continue
      }
      snapshot(idx, 20, `delete(${op.value}) — found at index ${idx}`)

      if (!head) {
        snapshot(-1, 20, 'List is empty')
      } else if (head.val === op.value) {
        if (head.next === head) {
          head = null
          snapshot(-1, 22, `${op.value} was the only node. List is now empty`)
        } else {
          let tail = head
          while (tail.next !== head) tail = tail.next
          head = head.next
          tail.next = head
          snapshot(-1, 26, `${op.value} was head. New head = ${head.address}. Tail points to new head`)
        }
      } else {
        let curr = head
        while (curr.next !== head && curr.next.val !== op.value) curr = curr.next
        if (curr.next.val === op.value) {
          const cidx = arr.indexOf(curr.val)
          snapshot(cidx, 30, `Found predecessor: ${curr.val}. Bypassing ${op.value}`)
          curr.next = curr.next.next
          snapshot(cidx, 32, `${op.value} deleted. ${curr.address}.next now points to ${curr.next.address}`)
        }
      }
    } else if (op.type === 'traverse') {
      if (!head) {
        snapshot(-1, 0, 'Traversal: List is empty')
      } else {
        snapshot(0, 0, `Traversal starting from head: ${head.val}`)
        let curr = head, idx = 0
        do {
          snapshot(idx, 0, `Visiting node: ${curr.val} at ${curr.address}`)
          curr = curr.next
          idx++
        } while (curr !== head && idx < 20)
        snapshot(0, 0, `✓ Traversal complete. Back to head (circular)`)
      }
    }
  }

  return steps
}
