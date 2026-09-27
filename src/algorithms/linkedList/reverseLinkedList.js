export const reverseLinkedListCode = [
  'function reverse(head) {',
  '  let prev = null;',
  '  let curr = head;',
  '  while (curr !== null) {',
  '    let next = curr.next;',
  '    curr.next = prev;',
  '    prev = curr;',
  '    curr = next;',
  '  }',
  '  return prev; // new head',
  '}',
]

export const reverseDoublyLinkedListCode = [
  'function reverseDoubly(head) {',
  '  let curr = head;',
  '  let newHead = null;',
  '  while (curr !== null) {',
  '    let next = curr.next;',
  '    curr.next = curr.prev;',
  '    curr.prev = next;',
  '    newHead = curr;',
  '    curr = next;',
  '  }',
  '  return newHead;',
  '}',
]

function buildNodes(values) {
  return values.map((v, i) => ({
    id: i,
    val: v,
    address: `0x${(0x300 + i * 0x20).toString(16).toUpperCase()}`,
    next: i + 1 < values.length ? i + 1 : null,
  }))
}

function buildDoublyNodes(values) {
  return values.map((v, i) => ({
    id: i,
    val: v,
    address: `0x${(0x400 + i * 0x20).toString(16).toUpperCase()}`,
    prev: i > 0 ? i - 1 : null,
    next: i + 1 < values.length ? i + 1 : null,
  }))
}

const addressOf = (nodes, idx) => (idx !== null && idx !== undefined ? nodes[idx]?.address : null)

function singlyNodeSnapshot(nodes) {
  return nodes.map(node => ({
    val: node.val,
    address: node.address,
    nextAddress: addressOf(nodes, node.next),
  }))
}

function doublyNodeSnapshot(nodes) {
  return nodes.map(node => ({
    val: node.val,
    address: node.address,
    prevAddress: addressOf(nodes, node.prev),
    nextAddress: addressOf(nodes, node.next),
  }))
}

export function generateReverseLinkedListSteps(values) {
  const steps = []
  const nodes = buildNodes(values)
  let prevPtr = null
  let currPtr = nodes.length > 0 ? 0 : null
  let headPtr = currPtr

  const snap = (prevIdx, currIdx, nextIdx, activeLine, description) =>
    steps.push({
      type: 'singly',
      nodes: singlyNodeSnapshot(nodes),
      prevIdx,
      currIdx,
      nextIdx,
      prevAddress: addressOf(nodes, prevIdx),
      currAddress: addressOf(nodes, currIdx),
      nextAddress: addressOf(nodes, nextIdx),
      headAddress: addressOf(nodes, headPtr),
      highlight: currIdx ?? prevIdx ?? -1,
      activeLine,
      description,
    })

  snap(null, currPtr, null, 0, 'reverse(head). Three pointers: prev=null, curr=head, next=?')
  snap(null, currPtr, null, 1, 'prev = null')
  snap(null, currPtr, null, 2, `curr = head (${addressOf(nodes, currPtr) || 'null'})`)

  while (currPtr !== null && currPtr < nodes.length) {
    const nextPtr = nodes[currPtr].next
    snap(prevPtr, currPtr, nextPtr, 4, `Save next = curr.next (${addressOf(nodes, nextPtr) || 'null'}) before changing the link`)

    nodes[currPtr].next = prevPtr !== null ? prevPtr : null
    snap(prevPtr, currPtr, nextPtr, 5, `${nodes[currPtr].address}.next now points to prev (${addressOf(nodes, prevPtr) || 'null'})`)

    prevPtr = currPtr
    snap(prevPtr, currPtr, nextPtr, 6, `prev moves to ${nodes[prevPtr].address}`)

    currPtr = nextPtr
    snap(prevPtr, currPtr !== null ? currPtr : null, null, 7, `curr moves to saved next (${addressOf(nodes, currPtr) || 'null'})`)
  }

  headPtr = prevPtr
  snap(prevPtr, null, null, 9, `curr is null. New head = prev (${addressOf(nodes, prevPtr) || 'null'})`)
  return steps
}

export function generateReverseDoublyLinkedListSteps(values) {
  const steps = []
  const nodes = buildDoublyNodes(values)
  let oldHeadPtr = nodes.length > 0 ? 0 : null
  let headPtr = oldHeadPtr
  let tailPtr = nodes.length > 0 ? nodes.length - 1 : null
  let currPtr = headPtr
  let newHeadPtr = null

  const snap = (currIdx, nextIdx, activeLine, description) =>
    steps.push({
      type: 'doubly',
      nodes: doublyNodeSnapshot(nodes),
      currIdx,
      nextIdx,
      currAddress: addressOf(nodes, currIdx),
      nextAddress: addressOf(nodes, nextIdx),
      headAddress: addressOf(nodes, headPtr),
      tailAddress: addressOf(nodes, tailPtr),
      newHeadAddress: addressOf(nodes, newHeadPtr),
      oldHeadAddress: addressOf(nodes, oldHeadPtr),
      highlight: currIdx ?? newHeadPtr ?? -1,
      activeLine,
      description,
    })

  snap(currPtr, null, 0, 'reverseDoubly(head). For each node, swap its next and prev pointers.')
  snap(currPtr, null, 1, `curr = head (${addressOf(nodes, currPtr) || 'null'})`)

  while (currPtr !== null && currPtr < nodes.length) {
    const nextPtr = nodes[currPtr].next
    snap(currPtr, nextPtr, 4, `Save next = curr.next (${addressOf(nodes, nextPtr) || 'null'})`)

    const oldPrev = nodes[currPtr].prev
    nodes[currPtr].next = oldPrev
    snap(currPtr, nextPtr, 5, `${nodes[currPtr].address}.next now points to old prev (${addressOf(nodes, oldPrev) || 'null'})`)

    nodes[currPtr].prev = nextPtr
    snap(currPtr, nextPtr, 6, `${nodes[currPtr].address}.prev now points to saved next (${addressOf(nodes, nextPtr) || 'null'})`)

    newHeadPtr = currPtr
    snap(currPtr, nextPtr, 7, `newHead moves to ${nodes[currPtr].address}`)

    currPtr = nextPtr
    snap(currPtr, null, 8, `curr moves to saved next (${addressOf(nodes, currPtr) || 'null'})`)
  }

  headPtr = newHeadPtr
  tailPtr = oldHeadPtr
  snap(null, null, 10, `Done. Head is ${addressOf(nodes, headPtr) || 'null'} and tail is ${addressOf(nodes, tailPtr) || 'null'}`)
  return steps
}

export const defaultReverseValues = [1, 2, 3, 4, 5]
