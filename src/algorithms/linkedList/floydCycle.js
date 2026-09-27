export const floydCycleCode = [
  'function detectCycle(head) {',
  '  let slow = head, fast = head;',
  '  // Phase 1: detect meeting point',
  '  while (fast && fast.next) {',
  '    slow = slow.next;',
  '    fast = fast.next.next;',
  '    if (slow === fast) {',
  '      // Phase 2: find cycle start',
  '      slow = head;',
  '      while (slow !== fast) {',
  '        slow = slow.next;',
  '        fast = fast.next;',
  '      }',
  '      return slow; // cycle start',
  '    }',
  '  }',
  '  return null; // no cycle',
  '}',
]

export function generateFloydCycleSteps(values, cycleStart = 2) {
  const steps = []
  const n = values.length
  // Build nodes with cycle
  const nodes = values.map((v, i) => ({
    id: i, val: v,
    next: i === n - 1 ? cycleStart : i + 1,
    hasCycle: true,
  }))
  const nodesCopy = () => nodes.map(n => ({ ...n }))

  let slow = 0, fast = 0
  let phase = 1, met = false

  const snap = (s, f, ph, activeLine, description) =>
    steps.push({ nodes: nodesCopy(), slow: s, fast: f, phase: ph, cycleStart, activeLine, description })

  snap(0, 0, 1, 0, `detectCycle. Tortoise (slow) and Hare (fast) both start at head.`)
  snap(0, 0, 1, 1, `slow = head (${values[0]}), fast = head (${values[0]})`)

  // Phase 1
  for (let iter = 0; iter < n * 2; iter++) {
    const nextSlow = nodes[slow].next
    const nextFast = nodes[nodes[fast].next].next

    slow = nextSlow
    fast = nextFast

    snap(slow, fast, 1, 4, `slow → ${values[slow]}, fast → ${values[fast]}`)
    snap(slow, fast, 1, 5, `slow.next=${values[slow]}, fast.next.next=${values[fast]}`)

    if (slow === fast) {
      snap(slow, fast, 1, 6, `⚡ slow == fast == ${values[slow]}! Meeting point found. Phase 2 starts.`)
      met = true
      break
    }
    snap(slow, fast, 1, 6, `slow(${values[slow]}) ≠ fast(${values[fast]}) → continue`)
  }

  if (!met) {
    snap(slow, fast, 1, 15, '✓ No cycle detected.')
    return steps
  }

  // Phase 2
  slow = 0
  snap(slow, fast, 2, 8, `Phase 2: reset slow to head (${values[0]}). fast stays at meeting point (${values[fast]}).`)

  while (slow !== fast) {
    slow = nodes[slow].next
    fast = nodes[fast].next
    snap(slow, fast, 2, 9, `slow → ${values[slow]}, fast → ${values[fast]}`)
    if (slow === fast) break
    snap(slow, fast, 2, 10, `slow(${values[slow]}) ≠ fast(${values[fast]}) → move both one step`)
  }

  snap(slow, fast, 2, 12, `✓ Cycle start found at node ${values[slow]} (index ${slow})!`)
  return steps
}

export const defaultFloydValues = [3, 1, 4, 1, 5, 9, 2, 6]
export const defaultFloydCycleStart = 2
