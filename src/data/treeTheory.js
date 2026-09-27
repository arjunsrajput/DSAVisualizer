export const bstTheory = {
  name: 'Binary Search Tree',
  overview: 'A Binary Search Tree is a binary tree where every node keeps smaller values in its left subtree and larger values in its right subtree.',
  concept: 'At each node, compare the value. Go left if the value is smaller, right if larger, and repeat until the value is found or a null child is reached.',
  useCase: [
    'Maintaining sorted data with insert and search',
    'Implementing sets and maps',
    'Range queries and ordered traversal',
  ],
  pros: [
    'Search and insert are efficient when the tree is balanced',
    'Inorder traversal returns sorted values',
    'Dynamic structure; no fixed array size needed',
  ],
  cons: [
    'Can degrade to O(n) if badly skewed',
    'Deletion has multiple cases',
    'Needs balancing logic for guaranteed performance',
  ],
  complexity: {
    time: {
      best: { notation: 'O(1)', explanation: 'Target is at the root' },
      average: { notation: 'O(log n)', explanation: 'A reasonably balanced tree halves the remaining search space each level' },
      worst: { notation: 'O(n)', explanation: 'A skewed tree behaves like a linked list' },
    },
    space: { notation: 'O(n)', explanation: 'Stores n tree nodes; recursive traversal may use call stack space' },
  },
  characteristics: [
    { label: 'Left Child', value: 'Smaller' },
    { label: 'Right Child', value: 'Larger' },
    { label: 'Traversal', value: 'Inorder sorted' },
    { label: 'Risk', value: 'Skewed tree' },
  ],
  workedExample: {
    trace: [
      { step: 1, operation: 'insert(50)', action: '50 becomes root' },
      { step: 2, operation: 'insert(30)', action: '30 < 50, insert left' },
      { step: 3, operation: 'insert(70)', action: '70 > 50, insert right' },
      { step: 4, operation: 'search(30)', action: 'Compare with 50, go left, found 30' },
    ],
    result: 'BST search follows one path from root toward a leaf.',
  },
  realExample: {
    title: 'Example: Sorted contact lookup',
    description: 'Names can be arranged so each comparison removes one side of the tree:',
    steps: [
      'Compare target name with current contact',
      'Search left for alphabetically smaller names',
      'Search right for larger names',
      'Stop when the contact is found or the pointer is null',
    ],
  },
  comparisonTable: {
    title: 'BST Operations',
    data: [
      { operation: 'search', balanced: 'O(log n)', skewed: 'O(n)' },
      { operation: 'insert', balanced: 'O(log n)', skewed: 'O(n)' },
      { operation: 'delete', balanced: 'O(log n)', skewed: 'O(n)' },
      { operation: 'inorder traversal', balanced: 'O(n)', skewed: 'O(n)' },
    ],
  },
}

export const inorderTheory = {
  name: 'Inorder Traversal',
  overview: 'Inorder traversal visits nodes in Left → Root → Right order. For a BST, this always produces values in sorted (ascending) order.',
  concept: 'Recursively visit left subtree, then the current node (visit/print), then right subtree. Can also be done iteratively with an explicit stack.',
  useCase: ['Print BST in sorted order', 'Validate BST property', 'Expression tree evaluation (infix)'],
  pros: ['Produces sorted order for BSTs', 'Simple recursive implementation'],
  cons: ['O(h) stack space for recursion (h = height)'],
  complexity: { time: { best: { notation: 'O(n)', explanation: 'All nodes visited' }, average: { notation: 'O(n)', explanation: 'All nodes visited' }, worst: { notation: 'O(n)', explanation: 'All nodes visited' } }, space: { notation: 'O(h)', explanation: 'Recursion stack depth = height' } },
  characteristics: [{ label: 'Order', value: 'Left → Root → Right' }, { label: 'BST result', value: 'Sorted ascending' }],
}

export const preorderTheory = {
  name: 'Preorder Traversal',
  overview: 'Preorder traversal visits the root first, then the left subtree, then the right subtree (Root → Left → Right). Used to serialize/clone trees.',
  concept: 'Visit the current node first, then recursively visit left subtree, then right subtree.',
  useCase: ['Serialize a tree to array/file', 'Clone a tree', 'Prefix expression evaluation', 'Print directory structure'],
  pros: ['Root processed before children — useful for cloning', 'Simple'],
  cons: ['Does not give sorted order'],
  complexity: { time: { best: { notation: 'O(n)', explanation: 'All nodes visited' }, average: { notation: 'O(n)', explanation: 'All nodes visited' }, worst: { notation: 'O(n)', explanation: 'All nodes visited' } }, space: { notation: 'O(h)', explanation: 'Recursion stack' } },
  characteristics: [{ label: 'Order', value: 'Root → Left → Right' }, { label: 'Use case', value: 'Serialize tree' }],
}

export const postorderTheory = {
  name: 'Postorder Traversal',
  overview: 'Postorder traversal visits left subtree, then right subtree, then the root (Left → Right → Root). Children are always processed before their parent.',
  concept: 'Recursively visit left subtree, then right subtree, then process the current node.',
  useCase: ['Delete a tree (delete children before parent)', 'Evaluate postfix expression trees', 'Compute directory sizes (process files before folder)'],
  pros: ['Children processed before parent — safe for deletion'],
  cons: ['Root processed last — not useful for top-down operations'],
  complexity: { time: { best: { notation: 'O(n)', explanation: 'All nodes visited' }, average: { notation: 'O(n)', explanation: 'All nodes visited' }, worst: { notation: 'O(n)', explanation: 'All nodes visited' } }, space: { notation: 'O(h)', explanation: 'Recursion stack' } },
  characteristics: [{ label: 'Order', value: 'Left → Right → Root' }, { label: 'Use case', value: 'Safe deletion' }],
}

export const levelOrderTheory = {
  name: 'Level Order Traversal',
  overview: 'Level Order Traversal visits all nodes level by level, from root to leaves, left to right. It uses a Queue (BFS) rather than recursion (DFS).',
  concept: 'Enqueue root. While queue is not empty: dequeue a node, visit it, enqueue its children. This naturally processes all nodes at depth d before any node at depth d+1.',
  useCase: ['Print tree level by level', 'Find minimum depth of tree', 'Connect nodes at same level', 'Zigzag traversal (deque variant)', 'Check if tree is complete'],
  pros: ['Visits nodes in breadth-first order', 'Easy to group by level', 'No recursion needed'],
  cons: ['O(w) queue space (w = max width — can be large)'],
  complexity: { time: { best: { notation: 'O(n)', explanation: 'All nodes visited' }, average: { notation: 'O(n)', explanation: 'All nodes visited' }, worst: { notation: 'O(n)', explanation: 'All nodes visited' } }, space: { notation: 'O(w)', explanation: 'Queue holds up to one full level' } },
  characteristics: [{ label: 'Data structure', value: 'Queue (BFS)' }, { label: 'Order', value: 'Level by level, L to R' }],
}

export const avlTreeTheory = {
  name: 'AVL Tree',
  overview: 'An AVL Tree is a self-balancing BST where the balance factor (height(left) - height(right)) of every node must be -1, 0, or +1. It was the first self-balancing BST (Adelson-Velsky & Landis, 1962). Insertions and deletions trigger rotations to restore balance.',
  concept: 'After every insert, update heights bottom-up. If any node has |bf| > 1, perform one of four rotations: LL (right rotate), RR (left rotate), LR (left-right rotate), RL (right-left rotate).',
  useCase: ['Databases requiring guaranteed O(log n) search', 'When reads are far more frequent than writes', 'Ordered map/set implementations'],
  pros: ['Guaranteed O(log n) for search, insert, delete', 'Stricter balance than Red-Black tree (faster lookups)', 'Inorder gives sorted output'],
  cons: ['More rotations than Red-Black tree (slower writes)', 'Complex implementation', 'Not suitable for high write workloads'],
  complexity: { time: { best: { notation: 'O(log n)', explanation: 'Always balanced' }, average: { notation: 'O(log n)', explanation: 'Always balanced' }, worst: { notation: 'O(log n)', explanation: 'Guaranteed by rotations' } }, space: { notation: 'O(n)', explanation: 'One node per element' } },
  characteristics: [{ label: 'Balance Factor', value: 'height(L) - height(R)' }, { label: 'Allowed BF', value: '-1, 0, +1' }, { label: 'Rotation types', value: 'LL, RR, LR, RL' }, { label: 'vs Red-Black', value: 'More balanced, slower writes' }],
}

Object.assign(inorderTheory, {
  workedExample: {
    trace: [
      { step: 1, node: 4, action: 'Go left from root before visiting root' },
      { step: 2, node: 2, action: 'Visit left subtree root after its left child' },
      { step: 3, node: 5, action: 'Visit root after finishing left subtree' },
      { step: 4, node: 7, action: 'Visit right subtree in the same left-root-right order' },
    ],
    result: 'For a BST, inorder traversal outputs values in ascending order.',
  },
  realExample: {
    title: 'Printing sorted records',
    description: 'A BST can output records sorted by key using inorder traversal.',
    steps: ['Traverse left subtree', 'Print current record', 'Traverse right subtree'],
  },
})

Object.assign(preorderTheory, {
  workedExample: {
    trace: [
      { step: 1, node: 5, action: 'Visit root first' },
      { step: 2, node: 2, action: 'Traverse left subtree root first' },
      { step: 3, node: 1, action: 'Continue root-left-right inside subtree' },
      { step: 4, node: 7, action: 'Traverse right subtree after left subtree finishes' },
    ],
    result: 'Preorder captures parent nodes before their children.',
  },
  realExample: {
    title: 'Tree serialization',
    description: 'Saving parent before children helps reconstruct the same tree shape later.',
    steps: ['Write current node', 'Serialize left subtree', 'Serialize right subtree'],
  },
})

Object.assign(postorderTheory, {
  workedExample: {
    trace: [
      { step: 1, node: 1, action: 'Visit deepest left child first' },
      { step: 2, node: 3, action: 'Visit right child before parent' },
      { step: 3, node: 2, action: 'Visit parent after both children' },
      { step: 4, node: 5, action: 'Root is processed last' },
    ],
    result: 'Postorder processes children before their parent.',
  },
  realExample: {
    title: 'Deleting a directory tree',
    description: 'Files and subfolders must be deleted before deleting their containing folder.',
    steps: ['Delete left/first child subtree', 'Delete right/next child subtree', 'Delete parent last'],
  },
})

Object.assign(levelOrderTheory, {
  workedExample: {
    trace: [
      { step: 1, queue: [5], visited: [], action: 'Start by enqueueing root' },
      { step: 2, queue: [2, 7], visited: [5], action: 'Visit root, enqueue its children' },
      { step: 3, queue: [7, 1, 3], visited: [5, 2], action: 'Visit next node at current level' },
      { step: 4, queue: [1, 3, 6, 8], visited: [5, 2, 7], action: 'Finish level before moving deeper' },
    ],
    result: 'Level order visits nodes breadth-first from top to bottom.',
  },
  realExample: {
    title: 'Finding minimum depth',
    description: 'The first leaf reached by level-order traversal is at the minimum depth.',
    steps: ['Visit root', 'Visit all nodes one level down', 'Stop when the first leaf is dequeued'],
  },
})

Object.assign(avlTreeTheory, {
  workedExample: {
    trace: [
      { step: 1, operation: 'insert(30)', balanceFactor: 0, action: '30 becomes root' },
      { step: 2, operation: 'insert(20)', balanceFactor: 1, action: 'Tree is still balanced' },
      { step: 3, operation: 'insert(10)', balanceFactor: 2, action: 'Node 30 becomes left-left heavy' },
      { step: 4, rotation: 'rightRotate(30)', root: 20, action: 'Rotate right to restore AVL balance' },
    ],
    result: 'After rotation, 20 is root with children 10 and 30, and every balance factor is valid.',
  },
  realExample: {
    title: 'Read-heavy ordered index',
    description: 'AVL trees keep height tightly bounded so searches remain fast.',
    steps: ['Insert like a BST', 'Update heights while returning upward', 'Rotate when balance factor leaves -1..1'],
  },
})
