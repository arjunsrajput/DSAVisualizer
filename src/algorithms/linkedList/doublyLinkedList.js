export const doublyLinkedListCode = [
  'class Node { constructor(val) {',
  '  this.val = val; this.prev = null; this.next = null; } }',
  'class DoublyLinkedList {',
  '  insertAtHead(val) {',
  '    let node = new Node(val);',
  '    node.next = this.head;',
  '    if (this.head) this.head.prev = node;',
  '    else this.tail = node;',
  '    this.head = node;',
  '  }',
  '  insertAtTail(val) {',
  '    let node = new Node(val);',
  '    node.prev = this.tail;',
  '    if (this.tail) this.tail.next = node;',
  '    else this.head = node;',
  '    this.tail = node;',
  '  }',
  '  delete(val) {',
  '    let curr = this.head;',
  '    while (curr && curr.val !== val) curr = curr.next;',
  '    if (!curr) return;',
  '    if (curr.prev) curr.prev.next = curr.next;',
  '    else this.head = curr.next;',
  '    if (curr.next) curr.next.prev = curr.prev;',
  '    else this.tail = curr.prev;',
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
      prevAddress: curr.prev ? curr.prev.address : null,
      nextAddress: curr.next ? curr.next.address : null,
    })
    curr = curr.next
  }
  return nodes
}

export function generateDoublyLinkedListSteps(operations) {
  const steps = []
  let head = null
  let tail = null
  let nextAddress = 0x200

  const snapshot = (highlight, activeLine, description, extra = {}) => {
    steps.push({
      nodes: listToNodes(head),
      headAddress: head ? head.address : null,
      tailAddress: tail ? tail.address : null,
      highlight,
      activeLine,
      description,
      ...extra,
    })
  }

  const createNode = (val) => {
    const node = {
      val,
      prev: null,
      next: null,
      address: `0x${nextAddress.toString(16).toUpperCase()}`,
    }
    nextAddress += 0x20
    return node
  }

  snapshot(-1, 0, 'Doubly Linked List initialized. head = null, tail = null')

  for (const op of operations) {
    if (op.type === 'insertHead') {
      snapshot(-1, 3, `insertAtHead(${op.value}) called`)
      const node = createNode(op.value)
      node.next = head
      snapshot(-1, 5, `New node ${node.address}.next points to old head ${head ? head.address : 'null'}`)
      if (head) {
        head.prev = node
        snapshot(0, 6, `Old head.prev now points back to ${node.address}`)
      } else {
        tail = node
        snapshot(-1, 7, `List was empty, so tail also points to ${node.address}`)
      }
      head = node
      snapshot(0, 8, `Head now points to ${node.address}`)

    } else if (op.type === 'insertTail') {
      snapshot(-1, 10, `insertAtTail(${op.value}) called`)
      const node = createNode(op.value)
      node.prev = tail
      snapshot(-1, 12, `New node ${node.address}.prev points to old tail ${tail ? tail.address : 'null'}`)
      if (tail) {
        tail.next = node
        snapshot(listToArray(head).length - 1, 13, `Old tail.next now points to ${node.address}`)
      } else {
        head = node
        snapshot(0, 14, `List was empty, so head also points to ${node.address}`)
      }
      tail = node
      snapshot(listToArray(head).length - 1, 15, `Tail now points to ${node.address}`)

    } else if (op.type === 'delete') {
      const arr = listToArray(head)
      const idx = arr.indexOf(op.value)
      if (idx === -1) { snapshot(-1, 17, `${op.value} not found in list`); continue }

      let curr = head
      let cidx = 0
      while (curr && curr.val !== op.value) { curr = curr.next; cidx++ }
      snapshot(cidx, 19, `delete(${op.value}) found node ${curr.address}`)

      if (curr.prev) {
        curr.prev.next = curr.next
        snapshot(Math.max(0, cidx - 1), 21, `${curr.prev.address}.next bypasses ${curr.address}`)
      } else {
        head = curr.next
        snapshot(-1, 22, `${curr.address} was head. Head moves to ${head ? head.address : 'null'}`)
      }

      if (curr.next) {
        curr.next.prev = curr.prev
        snapshot(cidx < listToArray(head).length ? cidx : -1, 23, `${curr.next.address}.prev bypasses ${curr.address}`)
      } else {
        tail = curr.prev
        snapshot(-1, 24, `${curr.address} was tail. Tail moves to ${tail ? tail.address : 'null'}`)
      }

      snapshot(-1, 24, `${op.value} deleted. Neighbor pointers are reconnected.`)

    } else if (op.type === 'traverseForward') {
      snapshot(-1, 10, 'Traversing forward from head...')
      let curr = head, idx = 0
      while (curr) { snapshot(idx, 10, `Forward visit: ${curr.val} at ${curr.address}`); curr = curr.next; idx++ }
      snapshot(-1, 10, 'Reached null after tail')

    } else if (op.type === 'traverseBackward') {
      snapshot(-1, 12, 'Traversing backward from tail...')
      let curr = tail
      let idx = listToArray(head).length - 1
      while (curr) { snapshot(idx, 12, `Backward visit: ${curr.val} at ${curr.address}`); curr = curr.prev; idx-- }
      snapshot(-1, 12, 'Reached null before head')
    }
  }

  return steps
}

export const defaultDoublyLinkedListOps = [
  { type: 'insertHead', value: 10 },
  { type: 'insertHead', value: 20 },
  { type: 'insertTail', value: 30 },
  { type: 'insertTail', value: 40 },
  { type: 'traverseForward' },
  { type: 'traverseBackward' },
  { type: 'delete', value: 20 },
  { type: 'insertHead', value: 5 },
]
