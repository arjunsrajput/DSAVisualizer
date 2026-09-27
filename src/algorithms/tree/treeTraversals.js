export const inorderCode = [
  'function inorder(root) {',
  '  if (!root) return;',
  '  inorder(root.left);',
  '  visit(root);',
  '  inorder(root.right);',
  '}',
]

export const preorderCode = [
  'function preorder(root) {',
  '  if (!root) return;',
  '  visit(root);',
  '  preorder(root.left);',
  '  preorder(root.right);',
  '}',
]

export const postorderCode = [
  'function postorder(root) {',
  '  if (!root) return;',
  '  postorder(root.left);',
  '  postorder(root.right);',
  '  visit(root);',
  '}',
]

export const levelOrderCode = [
  'function levelOrder(root) {',
  '  let queue = [root];',
  '  while (queue.length) {',
  '    let node = queue.shift();',
  '    visit(node);',
  '    if (node.left) queue.push(node.left);',
  '    if (node.right) queue.push(node.right);',
  '  }',
  '}',
]

function buildTree(values) {
  if (!values.length) return null
  const nodes = values.map((v, i) => ({ val: v, id: i, left: null, right: null }))
  for (let i = 0; i < nodes.length; i++) {
    const l = 2 * i + 1, r = 2 * i + 2
    if (l < nodes.length) nodes[i].left = nodes[l]
    if (r < nodes.length) nodes[i].right = nodes[r]
  }
  return nodes[0]
}

function treeToLayout(root, x = 400, y = 50, spread = 160) {
  if (!root) return { nodes: [], edges: [] }
  const nodes = [{ id: root.id, val: root.val, x, y }]
  const edges = []
  if (root.left) {
    edges.push({ from: root.id, to: root.left.id })
    const sub = treeToLayout(root.left, x - spread, y + 80, spread / 2)
    nodes.push(...sub.nodes); edges.push(...sub.edges)
  }
  if (root.right) {
    edges.push({ from: root.id, to: root.right.id })
    const sub = treeToLayout(root.right, x + spread, y + 80, spread / 2)
    nodes.push(...sub.nodes); edges.push(...sub.edges)
  }
  return { nodes, edges }
}

function generateTraversalSteps(root, type, layout) {
  const steps = []
  const visited = []
  const visitedIds = []
  const queue = []

  const snap = (current, queueSnapshot, activeLine, description) =>
    steps.push({
      ...layout,
      current,
      visited: [...visited],
      visitedIds: [...visitedIds],
      queue: [...(queueSnapshot || [])],
      activeLine,
      description,
    })

  if (type === 'level') {
    snap(null, [root.val], 1, `levelOrder: enqueue root(${root.val})`)
    const q = [root]
    while (q.length) {
      const node = q.shift()
      visited.push(node.val)
      visitedIds.push(node.id)
      snap(node.id, q.map(n => n.val), 3, `Dequeue ${node.val} → visit. Visited: [${visited}]`)
      if (node.left) { q.push(node.left); snap(node.id, q.map(n => n.val), 5, `Enqueue left child ${node.left.val}`) }
      if (node.right) { q.push(node.right); snap(node.id, q.map(n => n.val), 6, `Enqueue right child ${node.right.val}`) }
    }
    snap(null, [], 7, `✓ Level order: [${visited.join(' → ')}]`)
    return steps
  }

  function traverse(node, depth = 0) {
    if (!node) return
    snap(node.id, null, 1, `recurse(${node.val}): check null → not null`)
    if (type === 'pre') {
      visited.push(node.val)
      visitedIds.push(node.id)
      snap(node.id, null, 2, `VISIT ${node.val}. Visited: [${visited}]`)
      snap(node.id, null, 3, `Go left from ${node.val}`)
      traverse(node.left, depth + 1)
      snap(node.id, null, 4, `Go right from ${node.val}`)
      traverse(node.right, depth + 1)
    } else if (type === 'in') {
      snap(node.id, null, 2, `Go left from ${node.val}`)
      traverse(node.left, depth + 1)
      visited.push(node.val)
      visitedIds.push(node.id)
      snap(node.id, null, 3, `VISIT ${node.val}. Visited: [${visited}]`)
      snap(node.id, null, 4, `Go right from ${node.val}`)
      traverse(node.right, depth + 1)
    } else if (type === 'post') {
      snap(node.id, null, 2, `Go left from ${node.val}`)
      traverse(node.left, depth + 1)
      snap(node.id, null, 3, `Go right from ${node.val}`)
      traverse(node.right, depth + 1)
      visited.push(node.val)
      visitedIds.push(node.id)
      snap(node.id, null, 4, `VISIT ${node.val}. Visited: [${visited}]`)
    }
  }

  const typeNames = { in: 'Inorder (Left→Root→Right)', pre: 'Preorder (Root→Left→Right)', post: 'Postorder (Left→Right→Root)' }
  snap(null, null, 0, `${typeNames[type]} traversal starts.`)
  traverse(root)
  snap(null, null, 5, `✓ ${typeNames[type]}: [${visited.join(' → ')}]`)
  return steps
}

export function generateInorderSteps(values) {
  const root = buildTree(values)
  const layout = treeToLayout(root)
  return generateTraversalSteps(root, 'in', layout)
}

export function generatePreorderSteps(values) {
  const root = buildTree(values)
  const layout = treeToLayout(root)
  return generateTraversalSteps(root, 'pre', layout)
}

export function generatePostorderSteps(values) {
  const root = buildTree(values)
  const layout = treeToLayout(root)
  return generateTraversalSteps(root, 'post', layout)
}

export function generateLevelOrderSteps(values) {
  const root = buildTree(values)
  const layout = treeToLayout(root)
  return generateTraversalSteps(root, 'level', layout)
}

export const defaultTreeValues = [1, 2, 3, 4, 5, 6, 7]
