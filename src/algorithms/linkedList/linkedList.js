export const linkedListCode = [
  'class Node { constructor(val) {',
  '  this.val = val; this.next = null; } }',
  'class LinkedList {',
  '  insertAtHead(val) {',
  '    let node = new Node(val);',
  '    node.next = this.head;',
  '    this.head = node;',
  '  }',
  '  insertAtTail(val) {',
  '    let node = new Node(val);',
  '    let curr = this.head;',
  '    while (curr.next) curr = curr.next;',
  '    curr.next = node;',
  '  }',
  '  delete(val) {',
  '    if (head.val === val) { head = head.next; return; }',
  '    let curr = this.head;',
  '    while (curr.next && curr.next.val !== val)',
  '      curr = curr.next;',
  '    if (curr.next) curr.next = curr.next.next;',
  '  }',
  '}',
]

function listToArray(head) {
  const arr = []
  let curr = head
  while (curr) { arr.push(curr.val); curr = curr.next }
  return arr
}

function listToNodes(head) {
  const nodes = []
  let curr = head
  while (curr) {
    nodes.push({
      val: curr.val,
      address: curr.address,
      nextAddress: curr.next ? curr.next.address : null,
    })
    curr = curr.next
  }
  return nodes
}

export function generateLinkedListSteps(operations) {
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

  snapshot(-1, 0, 'Linked List initialized. head = null')

  for (const op of operations) {
    if (op.type === 'insertHead') {
      snapshot(-1, 3, `insertAtHead(${op.value}) called`)
      const node = createNode(op.value, head)
      head = node
      snapshot(0, 6, `${op.value} inserted at head. head points to ${node.address}`)

    } else if (op.type === 'insertTail') {
      snapshot(-1, 8, `insertAtTail(${op.value}) called`)
      const node = createNode(op.value)
      if (!head) { head = node; snapshot(0, 12, `${op.value} inserted as head at ${node.address} (list was empty)`) }
      else {
        let curr = head, idx = 0
        while (curr.next) { curr = curr.next; idx++ }
        snapshot(idx, 11, `Traversed to tail: ${curr.val}`)
        curr.next = node
        snapshot(listToArray(head).length - 1, 12, `${op.value} appended at ${node.address}. Previous tail now points to ${node.address}`)
      }

    } else if (op.type === 'delete') {
      const arr = listToArray(head)
      const idx = arr.indexOf(op.value)
      if (idx === -1) { snapshot(-1, 14, `${op.value} not found in list`); continue }
      snapshot(idx, 14, `delete(${op.value}) — found at index ${idx}`)
      if (head.val === op.value) {
        head = head.next
        snapshot(-1, 15, `${op.value} was head. New head = ${head ? head.address : 'null'}`)
      } else {
        let curr = head, cidx = 0
        while (curr.next && curr.next.val !== op.value) { curr = curr.next; cidx++ }
        snapshot(cidx, 18, `Found predecessor: ${curr.val}. Bypassing ${op.value}`)
        curr.next = curr.next.next
        snapshot(cidx, 19, `${op.value} deleted. ${curr.address}.next now points to ${curr.next ? curr.next.address : 'null'}`)
      }

    } else if (op.type === 'traverse') {
      snapshot(-1, 10, 'Traversing list from head...')
      let curr = head, idx = 0
      while (curr) { snapshot(idx, 11, `Visiting node ${curr.val} at ${curr.address}`); curr = curr.next; idx++ }
      snapshot(-1, 11, 'Reached null — traversal complete')
    }
  }

  return steps
}

export const defaultLinkedListOps = [
  { type: 'insertHead', value: 10 },
  { type: 'insertHead', value: 20 },
  { type: 'insertTail', value: 30 },
  { type: 'insertTail', value: 40 },
  { type: 'traverse' },
  { type: 'delete', value: 20 },
  { type: 'insertHead', value: 5 },
]
