export const categories = [
  {
    id: 'searching', name: 'Searching', color: 'blue',
    description: 'Find elements within data structures',
    algorithms: [
      { id: 'linear-search', name: 'Linear Search', difficulty: 'Easy', time: 'O(n)', space: 'O(1)', route: '/searching/linear', description: 'Scan each element sequentially' },
      { id: 'binary-search', name: 'Binary Search', difficulty: 'Easy', time: 'O(log n)', space: 'O(1)', route: '/searching/binary', description: 'Divide sorted array in half repeatedly' },
      { id: 'median-of-medians', name: 'Median of Medians', difficulty: 'Hard', time: 'O(n)', space: 'O(n)', route: '/searching/median-of-medians', description: 'Find kth smallest with deterministic linear selection' },
    ]
  },
  {
    id: 'sorting', name: 'Sorting', color: 'cyan',
    description: 'Arrange elements in a specific order',
    algorithms: [
      { id: 'bubble-sort', name: 'Bubble Sort', difficulty: 'Easy', time: 'O(n²)', space: 'O(1)', route: '/sorting/bubble', description: 'Repeatedly swap adjacent out-of-order elements' },
      { id: 'selection-sort', name: 'Selection Sort', difficulty: 'Easy', time: 'O(n²)', space: 'O(1)', route: '/sorting/selection', description: 'Select minimum and place in correct position' },
      { id: 'insertion-sort', name: 'Insertion Sort', difficulty: 'Easy', time: 'O(n²)', space: 'O(1)', route: '/sorting/insertion', description: 'Build sorted array one element at a time' },
      { id: 'merge-sort', name: 'Merge Sort', difficulty: 'Medium', time: 'O(n log n)', space: 'O(n)', route: '/sorting/merge', description: 'Divide, sort, merge back together' },
      { id: 'quick-sort', name: 'Quick Sort', difficulty: 'Medium', time: 'O(n log n)', space: 'O(log n)', route: '/sorting/quick', description: 'Partition around pivot, sort recursively' },
      { id: 'heap-sort', name: 'Heap Sort', difficulty: 'Medium', time: 'O(n log n)', space: 'O(1)', route: '/sorting/heap', description: 'Build heap, extract maximum repeatedly' },
      { id: 'counting-sort', name: 'Counting Sort', difficulty: 'Medium', time: 'O(n+k)', space: 'O(k)', route: '/sorting/counting', description: 'Count occurrences, reconstruct sorted array' },
      { id: 'radix-sort', name: 'Radix Sort', difficulty: 'Medium', time: 'O(d·n)', space: 'O(n+k)', route: '/sorting/radix', description: 'Sort digit by digit using counting sort' },
      { id: 'bucket-sort', name: 'Bucket Sort', difficulty: 'Medium', time: 'O(n+k)', space: 'O(n+k)', route: '/sorting/bucket', description: 'Distribute into buckets, sort each bucket' },
    ]
  },
  {
    id: 'stack', name: 'Stack', color: 'amber',
    description: 'LIFO structure and its applications',
    algorithms: [
      { id: 'stack-ops', name: 'Stack Operations', difficulty: 'Easy', time: 'O(1)', space: 'O(n)', route: '/stack', description: 'Push, pop, peek with fixed capacity' },
      { id: 'balanced-paren', name: 'Balanced Parentheses', difficulty: 'Easy', time: 'O(n)', space: 'O(n)', route: '/stack/balanced-paren', description: 'Validate bracket matching using stack' },
      { id: 'infix-postfix', name: 'Infix to Postfix', difficulty: 'Hard', time: 'O(n)', space: 'O(n)', route: '/stack/infix-postfix', description: 'Shunting-Yard algorithm for expression conversion' },
      { id: 'nge', name: 'Next Greater Element', difficulty: 'Hard', time: 'O(n)', space: 'O(n)', route: '/stack/nge', description: 'Monotonic stack — find NGE in one pass' },
    ]
  },
  {
    id: 'queue', name: 'Queue', color: 'green',
    description: 'FIFO structure and priority variants',
    algorithms: [
      { id: 'queue-ops', name: 'Queue Operations', difficulty: 'Easy', time: 'O(1)', space: 'O(n)', route: '/queue', description: 'Enqueue, dequeue, front operations' },
      { id: 'circular-queue', name: 'Circular Queue', difficulty: 'Medium', time: 'O(1)', space: 'O(n)', route: '/queue/circular', description: 'Wrap-around ring buffer with modulo' },
      { id: 'priority-queue', name: 'Priority Queue (Min Heap)', difficulty: 'Hard', time: 'O(log n)', space: 'O(n)', route: '/queue/priority', description: 'Min-heap: smallest element always at root' },
    ]
  },
  {
    id: 'linkedlist', name: 'Linked List', color: 'cyan',
    description: 'Dynamic linked node structures',
    algorithms: [
      { id: 'linked-list', name: 'Singly Linked List', difficulty: 'Medium', time: 'O(n)', space: 'O(n)', route: '/linked-list', description: 'Insert, delete, traverse with next pointers' },
      { id: 'doubly-linked-list', name: 'Doubly Linked List', difficulty: 'Medium', time: 'O(n)', space: 'O(n)', route: '/linked-list/doubly', description: 'Bidirectional traversal with prev & next' },
      { id: 'circular-linked-list', name: 'Circular Linked List', difficulty: 'Medium', time: 'O(n)', space: 'O(n)', route: '/linked-list/circular', description: 'Last node links back to head' },
      { id: 'reverse-ll', name: 'Reverse Singly Linked List', difficulty: 'Medium', time: 'O(n)', space: 'O(1)', route: '/linked-list/reverse', description: '3-pointer iterative reversal with addresses' },
      { id: 'reverse-dll', name: 'Reverse Doubly Linked List', difficulty: 'Medium', time: 'O(n)', space: 'O(1)', route: '/linked-list/reverse-doubly', description: 'Swap prev and next pointers with addresses' },
      { id: 'floyd-cycle', name: "Floyd's Cycle Detection", difficulty: 'Hard', time: 'O(n)', space: 'O(1)', route: '/linked-list/floyd', description: 'Tortoise & Hare — detect and locate cycle' },
      { id: 'merge-sorted', name: 'Merge Two Sorted Lists', difficulty: 'Hard', time: 'O(m+n)', space: 'O(1)', route: '/linked-list/merge-sorted', description: 'Merge sorted lists without extra space' },
    ]
  },
  {
    id: 'tree', name: 'Trees', color: 'emerald',
    description: 'Hierarchical data structures',
    algorithms: [
      { id: 'bst', name: 'Binary Search Tree', difficulty: 'Medium', time: 'O(log n)', space: 'O(n)', route: '/tree/bst', description: 'Insert, search, delete in BST' },
      { id: 'inorder', name: 'Inorder Traversal', difficulty: 'Easy', time: 'O(n)', space: 'O(h)', route: '/tree/inorder', description: 'Left → Root → Right (sorted for BST)' },
      { id: 'preorder', name: 'Preorder Traversal', difficulty: 'Easy', time: 'O(n)', space: 'O(h)', route: '/tree/preorder', description: 'Root → Left → Right (clone/serialize)' },
      { id: 'postorder', name: 'Postorder Traversal', difficulty: 'Easy', time: 'O(n)', space: 'O(h)', route: '/tree/postorder', description: 'Left → Right → Root (safe deletion)' },
      { id: 'level-order', name: 'Level Order (BFS)', difficulty: 'Medium', time: 'O(n)', space: 'O(w)', route: '/tree/level-order', description: 'Level-by-level BFS traversal with queue' },
      { id: 'avl', name: 'AVL Tree', difficulty: 'Hard', time: 'O(log n)', space: 'O(n)', route: '/tree/avl', description: 'Self-balancing BST with LL/RR/LR/RL rotations' },
    ]
  },
  {
    id: 'dp', name: 'Dynamic Programming', color: 'blue',
    description: 'Store subproblem answers and build optimal solutions',
    algorithms: [
      { id: 'fibonacci-dp', name: 'Fibonacci DP', difficulty: 'Easy', time: 'O(n)', space: 'O(n)', route: '/dp/fibonacci', description: 'Build Fibonacci values with a 1D DP table' },
      { id: 'knapsack', name: '0/1 Knapsack', difficulty: 'Medium', time: 'O(nW)', space: 'O(nW)', route: '/dp/knapsack', description: 'Choose items by comparing take vs skip' },
      { id: 'lcs', name: 'Longest Common Subsequence', difficulty: 'Medium', time: 'O(mn)', space: 'O(mn)', route: '/dp/lcs', description: 'Compare two strings with a prefix grid' },
      { id: 'coin-change', name: 'Coin Change', difficulty: 'Medium', time: 'O(A·C)', space: 'O(A)', route: '/dp/coin-change', description: 'Find minimum coins using a 1D amount table' },
      { id: 'lis', name: 'Longest Increasing Subsequence', difficulty: 'Medium', time: 'O(n²)', space: 'O(n)', route: '/dp/lis', description: 'Build increasing subsequences ending at each index' },
      { id: 'edit-distance', name: 'Edit Distance', difficulty: 'Hard', time: 'O(mn)', space: 'O(mn)', route: '/dp/edit-distance', description: 'Convert strings with insert, delete, and replace' },
      { id: 'min-path-sum', name: 'Minimum Path Sum', difficulty: 'Medium', time: 'O(mn)', space: 'O(mn)', route: '/dp/min-path-sum', description: 'Find the cheapest right/down path through a grid' },
    ]
  },
  {
    id: 'graph', name: 'Graphs', color: 'rose',
    description: 'Nodes connected by edges — weighted & directed',
    algorithms: [
      { id: 'bfs', name: 'Breadth First Search', difficulty: 'Medium', time: 'O(V+E)', space: 'O(V)', route: '/graph/bfs', description: 'Explore level by level with a queue' },
      { id: 'dfs', name: 'Depth First Search', difficulty: 'Medium', time: 'O(V+E)', space: 'O(V)', route: '/graph/dfs', description: 'Explore deep before backtracking' },
      { id: 'dijkstra', name: "Dijkstra's Shortest Path", difficulty: 'Hard', time: 'O((V+E)logV)', space: 'O(V)', route: '/graph/dijkstra', description: 'Greedy shortest path — no negative weights' },
      { id: 'bellman-ford', name: 'Bellman-Ford', difficulty: 'Hard', time: 'O(V·E)', space: 'O(V)', route: '/graph/bellman-ford', description: 'Shortest path with negative weights' },
      { id: 'prims', name: "Prim's MST", difficulty: 'Hard', time: 'O(E log V)', space: 'O(V)', route: '/graph/prims', description: 'Greedy MST by minimum crossing edge' },
      { id: 'kruskals', name: "Kruskal's MST", difficulty: 'Hard', time: 'O(E log E)', space: 'O(V)', route: '/graph/kruskals', description: 'Sort edges, Union-Find cycle detection' },
      { id: 'topological', name: 'Topological Sort', difficulty: 'Medium', time: 'O(V+E)', space: 'O(V)', route: '/graph/topological', description: 'Linear ordering for DAGs' },
      { id: 'cycle', name: 'Cycle Detection', difficulty: 'Medium', time: 'O(V+E)', space: 'O(V)', route: '/graph/cycle', description: '3-color DFS — back edge = cycle' },
    ]
  },
]

export const allAlgorithms = categories.flatMap(c => c.algorithms.map(a => ({ ...a, category: c.name })))
