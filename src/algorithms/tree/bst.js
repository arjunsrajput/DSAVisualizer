export const bstCode = [
  'class BST {',
  '  insert(val) {',
  '    this.root = insertRec(this.root, val);',
  '  }',
  '  insertRec(node, val) {',
  '    if (!node) return new Node(val);',
  '    if (val < node.val)',
  '      node.left = insertRec(node.left, val);',
  '    else if (val > node.val)',
  '      node.right = insertRec(node.right, val);',
  '    return node;',
  '  }',
  '  search(val) {',
  '    let curr = this.root;',
  '    while (curr) {',
  '      if (val === curr.val) return curr;',
  '      curr = val < curr.val ? curr.left : curr.right;',
  '    }',
  '    return null;',
  '  }',
  '}',
]

function insertNode(root, val) {
  if (!root) return { val, left: null, right: null, id: val }
  if (val < root.val) return { ...root, left: insertNode(root.left, val) }
  if (val > root.val) return { ...root, right: insertNode(root.right, val) }
  return root
}

function treeToNodes(root, x = 400, y = 60, spread = 180) {
  if (!root) return { nodes: [], edges: [] }
  const nodes = [{ id: root.val, x, y, val: root.val }]
  const edges = []
  if (root.left) {
    edges.push({ from: root.val, to: root.left.val })
    const sub = treeToNodes(root.left, x - spread, y + 80, spread / 2)
    nodes.push(...sub.nodes); edges.push(...sub.edges)
  }
  if (root.right) {
    edges.push({ from: root.val, to: root.right.val })
    const sub = treeToNodes(root.right, x + spread, y + 80, spread / 2)
    nodes.push(...sub.nodes); edges.push(...sub.edges)
  }
  return { nodes, edges }
}

export function generateBSTSteps(operations) {
  const steps = []
  let root = null

  const snap = (highlight, path, activeLine, description, status = null) => {
    const { nodes, edges } = treeToNodes(root)
    steps.push({ nodes, edges, highlight, path: path || [], status, activeLine, description })
  }

  snap(null, [], 0, 'BST initialized. Empty tree.')

  for (const op of operations) {
    if (op.type === 'insert') {
      snap(null, [], 1, `insert(${op.value}) called`)
      // trace path
      const path = []
      let curr = root
      while (curr) {
        path.push(curr.val)
        snap(curr.val, [...path], 6, `Comparing ${op.value} with node ${curr.val}`)
        if (op.value < curr.val) { snap(curr.val, [...path], 7, `${op.value} < ${curr.val} → go left`); curr = curr.left }
        else if (op.value > curr.val) { snap(curr.val, [...path], 9, `${op.value} > ${curr.val} → go right`); curr = curr.right }
        else break
      }
      root = insertNode(root, op.value)
      snap(op.value, [], 5, `Inserted ${op.value} as new node`, 'inserted')

    } else if (op.type === 'search') {
      snap(null, [], 12, `search(${op.value}) called`)
      let curr = root
      const path = []
      let found = false
      while (curr) {
        path.push(curr.val)
        snap(curr.val, [...path], 14, `Visiting node ${curr.val}`)
        if (op.value === curr.val) { snap(curr.val, [...path], 15, `✓ Found ${op.value}!`, 'found'); found = true; break }
        else if (op.value < curr.val) { snap(curr.val, [...path], 16, `${op.value} < ${curr.val} → go left`); curr = curr.left }
        else { snap(curr.val, [...path], 16, `${op.value} > ${curr.val} → go right`); curr = curr.right }
      }
      if (!found) snap(path[path.length - 1] ?? null, [...path], 18, `${op.value} not found in BST`, 'not-found')
    }
  }

  return steps
}

export const defaultBSTOps = [
  { type: 'insert', value: 50 },
  { type: 'insert', value: 30 },
  { type: 'insert', value: 70 },
  { type: 'insert', value: 20 },
  { type: 'insert', value: 40 },
  { type: 'insert', value: 60 },
  { type: 'insert', value: 80 },
  { type: 'search', value: 40 },
  { type: 'search', value: 55 },
]
