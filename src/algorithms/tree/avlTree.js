export const avlTreeCode = [
  'insert(val) {',
  '  this.root = insertRec(this.root, val);',
  '}',
  'insertRec(node, val) {',
  '  // Standard BST insert',
  '  if (!node) return new Node(val);',
  '  if (val < node.val) node.left = insertRec(node.left, val);',
  '  else node.right = insertRec(node.right, val);',
  '  // Update height',
  '  node.height = 1 + max(height(left), height(right));',
  '  // Get balance factor',
  '  let bf = height(left) - height(right);',
  '  // LL: Right Rotate',
  '  if (bf > 1 && val < node.left.val) return rightRotate(node);',
  '  // RR: Left Rotate',
  '  if (bf < -1 && val > node.right.val) return leftRotate(node);',
  '  // LR: Left then Right Rotate',
  '  if (bf > 1 && val > node.left.val) {',
  '    node.left = leftRotate(node.left);',
  '    return rightRotate(node);',
  '  }',
  '  // RL: Right then Left Rotate',
  '  if (bf < -1 && val < node.right.val) {',
  '    node.right = rightRotate(node.right);',
  '    return leftRotate(node);',
  '  }',
  '  return node;',
  '}',
]

class AVLNode {
  constructor(val) { this.val = val; this.left = null; this.right = null; this.height = 1 }
}

function height(n) { return n ? n.height : 0 }
function updateHeight(n) { n.height = 1 + Math.max(height(n.left), height(n.right)) }
function bf(n) { return height(n.left) - height(n.right) }

function rightRotate(y) {
  const x = y.left, T2 = x.right
  x.right = y; y.left = T2
  updateHeight(y); updateHeight(x)
  return x
}

function leftRotate(x) {
  const y = x.right, T2 = y.left
  y.left = x; x.right = T2
  updateHeight(x); updateHeight(y)
  return y
}

function toLayout(node, x = 400, y = 50, spread = 150) {
  if (!node) return { nodes: [], edges: [] }
  const nodes = [{ id: node.val, val: node.val, x, y, height: node.height, bf: bf(node) }]
  const edges = []
  if (node.left) {
    edges.push({ from: node.val, to: node.left.val })
    const sub = toLayout(node.left, x - spread, y + 80, spread / 2)
    nodes.push(...sub.nodes); edges.push(...sub.edges)
  }
  if (node.right) {
    edges.push({ from: node.val, to: node.right.val })
    const sub = toLayout(node.right, x + spread, y + 80, spread / 2)
    nodes.push(...sub.nodes); edges.push(...sub.edges)
  }
  return { nodes, edges }
}

export function generateAVLSteps(values) {
  const steps = []
  let root = null

  const snap = (highlight, rotation, activeLine, description, rotationNodes = []) => {
    const { nodes, edges } = toLayout(root)
    steps.push({ nodes, edges, highlight, rotation, rotationNodes, activeLine, description })
  }

  snap(null, null, 0, 'AVL Tree initialized.')

  for (const val of values) {
    // Standard BST insert first
    function avlInsert(node, v) {
      if (!node) return { node: new AVLNode(v), rotation: null }
      if (v < node.val) {
        const res = avlInsert(node.left, v)
        node.left = res.node
      } else if (v > node.val) {
        const res = avlInsert(node.right, v)
        node.right = res.node
      } else return { node, rotation: null }

      updateHeight(node)
      const balance = bf(node)
      let rotation = null
      let rotationNodes = []

      if (balance > 1 && v < node.left.val) {
        rotation = `LL Case at node ${node.val}: Right Rotate`
        rotationNodes = [node.val, node.left.val, v]
        snap(node.val, rotation, 13, `Unbalanced at ${node.val} (bf=${balance}). Prepare right rotation around ${node.val}.`, rotationNodes)
        node = rightRotate(node)
      } else if (balance < -1 && v > node.right.val) {
        rotation = `RR Case at node ${node.val}: Left Rotate`
        rotationNodes = [node.val, node.right.val, v]
        snap(node.val, rotation, 15, `Unbalanced at ${node.val} (bf=${balance}). Prepare left rotation around ${node.val}.`, rotationNodes)
        node = leftRotate(node)
      } else if (balance > 1 && v > node.left.val) {
        rotation = `LR Case at node ${node.val}: Left then Right Rotate`
        rotationNodes = [node.val, node.left.val, v]
        snap(node.val, rotation, 17, `Unbalanced at ${node.val} (bf=${balance}). First rotate left at ${node.left.val}, then right at ${node.val}.`, rotationNodes)
        node.left = leftRotate(node.left)
        snap(node.left.val, rotation, 18, `First part done: left rotation inside left subtree. Now rotate right at ${node.val}.`, [node.val, node.left.val])
        node = rightRotate(node)
      } else if (balance < -1 && v < node.right.val) {
        rotation = `RL Case at node ${node.val}: Right then Left Rotate`
        rotationNodes = [node.val, node.right.val, v]
        snap(node.val, rotation, 21, `Unbalanced at ${node.val} (bf=${balance}). First rotate right at ${node.right.val}, then left at ${node.val}.`, rotationNodes)
        node.right = rightRotate(node.right)
        snap(node.right.val, rotation, 22, `First part done: right rotation inside right subtree. Now rotate left at ${node.val}.`, [node.val, node.right.val])
        node = leftRotate(node)
      }
      return { node, rotation, rotationNodes }
    }

    snap(null, null, 1, `insert(${val}) called`)
    const res = avlInsert(root, val)
    root = res.node

    if (res.rotation) {
      snap(val, res.rotation, 13, `Rotation complete: ${res.rotation}. Tree is balanced again.`, res.rotationNodes)
    } else {
      snap(val, null, 9, `✓ insert(${val}) done. Tree balanced. BF at root = ${bf(root)}`)
    }
  }

  return steps
}

export const defaultAVLValues = [30, 20, 10, 25, 40, 35, 50, 5, 15]
