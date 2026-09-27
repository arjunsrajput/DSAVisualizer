export const dijkstraTheory = {
  name: "Dijkstra's Shortest Path",
  overview: "Dijkstra's algorithm finds the shortest path from a source node to all other nodes in a weighted graph with non-negative edge weights. It uses a greedy strategy with a priority queue.",
  concept: 'Initialize dist[src]=0, all others=∞. Repeatedly pick the unvisited node with minimum distance, mark it visited, and relax all its neighbors: if dist[u]+w < dist[v], update dist[v].',
  useCase: ['GPS navigation', 'Network routing protocols (OSPF)', 'Social network shortest connection', 'Game pathfinding'],
  pros: ['Optimal for non-negative weights', 'O((V+E) log V) with priority queue', 'Finds shortest path to ALL nodes'],
  cons: ['Fails with negative edge weights', 'Not suitable for negative cycles'],
  complexity: { time: { best: { notation: 'O(V²)', explanation: 'Simple array, dense graph' }, average: { notation: 'O((V+E) log V)', explanation: 'Binary heap priority queue' }, worst: { notation: 'O((V+E) log V)', explanation: 'Binary heap priority queue' } }, space: { notation: 'O(V)', explanation: 'Distance array + priority queue' } },
  characteristics: [{ label: 'Strategy', value: 'Greedy + PQ' }, { label: 'Negative weights', value: '❌ Not supported' }, { label: 'Single source', value: 'Yes' }],
}

export const bellmanFordTheory = {
  name: 'Bellman-Ford Algorithm',
  overview: 'Bellman-Ford finds shortest paths from a source to all nodes, and unlike Dijkstra, it handles negative edge weights. It also detects negative cycles. It relaxes all edges V-1 times.',
  concept: 'Relax all E edges exactly V-1 times. If any edge can still be relaxed after V-1 passes, a negative cycle exists. dist[u] + w < dist[v] → update dist[v].',
  useCase: ['Networks with negative weight links', 'Currency arbitrage detection (negative cycles)', 'Routing protocols (distance vector)', 'Constraint graphs'],
  pros: ['Handles negative weights', 'Detects negative cycles', 'Simpler implementation than Dijkstra'],
  cons: ['O(V·E) — much slower than Dijkstra', 'Overkill when no negative weights'],
  complexity: { time: { best: { notation: 'O(V·E)', explanation: 'Always does V-1 passes' }, average: { notation: 'O(V·E)', explanation: 'V-1 passes × E edges' }, worst: { notation: 'O(V·E)', explanation: 'V-1 passes × E edges' } }, space: { notation: 'O(V)', explanation: 'Distance array' } },
  characteristics: [{ label: 'Passes', value: 'V-1 relaxations' }, { label: 'Negative weights', value: '✅ Supported' }, { label: 'Negative cycle', value: 'Detected in pass V' }],
}

export const primsTheory = {
  name: "Prim's MST Algorithm",
  overview: "Prim's algorithm builds a Minimum Spanning Tree (MST) by greedily adding the minimum-weight edge that connects the growing MST to a new vertex. It is similar to Dijkstra's but optimizes edge weight not path distance.",
  concept: 'Start with any node. Repeatedly find the minimum-weight edge that crosses the cut (one end in MST, other end not). Add that edge and the new node to the MST.',
  useCase: ['Minimum cost network design', 'Cluster analysis', 'Image segmentation', 'Approximate TSP'],
  pros: ['O(E log V) with priority queue', 'Works well on dense graphs', 'Builds MST incrementally'],
  cons: ['Only works for connected graphs', 'Needs adjacency matrix for dense graph variant'],
  complexity: { time: { best: { notation: 'O(E log V)', explanation: 'Binary heap PQ' }, average: { notation: 'O(E log V)', explanation: 'Binary heap PQ' }, worst: { notation: 'O(V²)', explanation: 'Simple array implementation' } }, space: { notation: 'O(V)', explanation: 'Key and parent arrays' } },
  characteristics: [{ label: 'Strategy', value: 'Greedy cut property' }, { label: 'Output', value: 'MST edges' }, { label: 'vs Kruskal', value: "Better for dense graphs" }],
}

export const kruskalsTheory = {
  name: "Kruskal's MST Algorithm",
  overview: "Kruskal's algorithm builds the MST by sorting all edges by weight and adding them one by one, skipping any edge that would form a cycle. Cycle detection uses a Union-Find (Disjoint Set Union) data structure.",
  concept: "Sort all edges by weight. For each edge (u,v,w): find the roots of u and v in the Union-Find. If they are different (no cycle), add the edge to MST and union the two sets.",
  useCase: ['Minimum cost spanning network', 'Sparse graph MST', 'Cable laying with minimum cost', 'Clustering'],
  pros: ['O(E log E) — just sort edges', 'Works well on sparse graphs', 'Easy to implement with Union-Find'],
  cons: ['Sorting all edges upfront', 'Slower than Prim on dense graphs'],
  complexity: { time: { best: { notation: 'O(E log E)', explanation: 'Dominated by sorting' }, average: { notation: 'O(E log E)', explanation: 'Dominated by sorting' }, worst: { notation: 'O(E log E)', explanation: 'Dominated by sorting' } }, space: { notation: 'O(V)', explanation: 'Union-Find arrays' } },
  characteristics: [{ label: 'Strategy', value: 'Sort + Union-Find' }, { label: 'Cycle detection', value: 'Union-Find (DSU)' }, { label: 'vs Prim', value: 'Better for sparse graphs' }],
}

export const topologicalSortTheory = {
  name: 'Topological Sort',
  overview: 'Topological Sort produces a linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every edge u→v, u comes before v. It is used to schedule dependent tasks.',
  concept: 'Run DFS. When a node fully completes (all descendants processed), prepend it to the result. This ensures all successors appear after the node in the result.',
  useCase: ['Build systems (Makefile)', 'Task scheduling with dependencies', 'Course prerequisite ordering', 'Package manager dependency resolution'],
  pros: ['O(V+E) time', 'Simple DFS-based', 'Detects cycles as a side effect'],
  cons: ['Only for DAGs', 'Multiple valid orderings possible'],
  complexity: { time: { best: { notation: 'O(V+E)', explanation: 'DFS visits all vertices and edges' }, average: { notation: 'O(V+E)', explanation: 'DFS visits all vertices and edges' }, worst: { notation: 'O(V+E)', explanation: 'DFS visits all vertices and edges' } }, space: { notation: 'O(V)', explanation: 'Stack + visited set' } },
  characteristics: [{ label: 'Only for', value: 'DAGs (no cycles)' }, { label: 'Algorithm', value: 'DFS with finish order' }, { label: 'Alternative', value: "Kahn's BFS-based" }],
}

export const cycleDetectionTheory = {
  name: 'Cycle Detection in Directed Graph',
  overview: 'A directed graph has a cycle if DFS encounters a node that is currently being processed (a "gray" node). Using 3-color DFS, we can detect and identify the back edge that creates the cycle.',
  concept: 'Color each node white (unvisited), gray (in current DFS path), or black (fully processed). If we encounter a gray neighbor, we found a back edge — which means a cycle exists.',
  useCase: ['Deadlock detection in OS', 'Detecting circular dependencies', 'Validating DAG for topological sort', 'Dependency graph analysis'],
  pros: ['O(V+E) time', 'Pinpoints the exact cycle edge', 'Natural extension of DFS'],
  cons: ['Directed only — undirected graphs use different approach', 'Full DFS needed'],
  complexity: { time: { best: { notation: 'O(V+E)', explanation: 'DFS traversal' }, average: { notation: 'O(V+E)', explanation: 'DFS traversal' }, worst: { notation: 'O(V+E)', explanation: 'DFS traversal' } }, space: { notation: 'O(V)', explanation: 'Color array + recursion stack' } },
  characteristics: [{ label: 'White', value: 'Unvisited' }, { label: 'Gray', value: 'In current DFS path' }, { label: 'Black', value: 'Fully done' }, { label: 'Cycle sign', value: 'Edge to gray node = back edge' }],
}

export const bfsTheory = {
  name: 'Breadth First Search',
  overview: 'BFS explores a graph level by level, visiting all neighbors of a node before moving to nodes at the next depth. It uses a Queue and guarantees the shortest path (in terms of edge count) in unweighted graphs.',
  concept: 'Start at source. Enqueue it. While queue not empty: dequeue node, mark visited, enqueue all unvisited neighbors. Process level by level.',
  useCase: ['Shortest path in unweighted graph', 'Level-order tree traversal', 'Social network connections', 'Web crawlers', 'Maze solving'],
  pros: ['Finds shortest path by edge count', 'Complete — always finds a solution if one exists', 'Simple queue-based implementation'],
  cons: ['O(V) space for queue (can be large)', 'Slower than DFS for deep graphs'],
  complexity: { time: { best: { notation: 'O(V+E)', explanation: 'Visit all vertices and edges' }, average: { notation: 'O(V+E)', explanation: 'Visit all vertices and edges' }, worst: { notation: 'O(V+E)', explanation: 'Visit all vertices and edges' } }, space: { notation: 'O(V)', explanation: 'Queue can hold all vertices' } },
  characteristics: [{ label: 'Data structure', value: 'Queue' }, { label: 'Order', value: 'Level by level' }, { label: 'Shortest path', value: 'Yes (unweighted)' }],
}

export const dfsTheory = {
  name: 'Depth First Search',
  overview: 'DFS explores a graph by going as deep as possible along each branch before backtracking. It uses a Stack (or recursion) and is the basis for many graph algorithms like topological sort and cycle detection.',
  concept: 'Start at source. Mark visited, recursively visit each unvisited neighbor. Backtrack when no unvisited neighbors remain.',
  useCase: ['Topological sort', 'Cycle detection', 'Connected components', 'Maze generation', 'Finding strongly connected components'],
  pros: ['O(h) space (h = depth) vs BFS O(w)', 'Simpler recursive implementation', 'Foundation for many advanced algorithms'],
  cons: ['Does not guarantee shortest path', 'Can get stuck in deep branches', 'Stack overflow risk for very deep graphs'],
  complexity: { time: { best: { notation: 'O(V+E)', explanation: 'Visit all vertices and edges' }, average: { notation: 'O(V+E)', explanation: 'Visit all vertices and edges' }, worst: { notation: 'O(V+E)', explanation: 'Visit all vertices and edges' } }, space: { notation: 'O(h)', explanation: 'Recursion stack depth h' } },
  characteristics: [{ label: 'Data structure', value: 'Stack/Recursion' }, { label: 'Order', value: 'Deep first' }, { label: 'Shortest path', value: 'No' }],
}

Object.assign(dijkstraTheory, {
  workedExample: {
    trace: [
      { step: 1, node: 'A', distances: { A: 0, B: 4, C: 1 }, action: 'Start at A and relax outgoing edges' },
      { step: 2, node: 'C', distances: { A: 0, B: 3, C: 1, D: 6 }, action: 'Pick closest unvisited node C; update B through C' },
      { step: 3, node: 'B', distances: { A: 0, B: 3, C: 1, D: 5 }, action: 'Pick B; improve distance to D' },
      { step: 4, node: 'D', distances: { A: 0, B: 3, C: 1, D: 5 }, action: 'D is finalized' },
    ],
    result: 'Shortest distances from A are A=0, C=1, B=3, D=5.',
  },
  realExample: {
    title: 'GPS routing without negative roads',
    description: 'Road times are non-negative, so repeatedly choosing the currently closest intersection is valid.',
    steps: ['Set source distance to 0', 'Pick closest unvisited location', 'Relax roads leaving it'],
  },
})

Object.assign(bellmanFordTheory, {
  workedExample: {
    trace: [
      { step: 1, pass: 1, edge: 'A -> B (4)', distances: { A: 0, B: 4, C: 'inf' }, action: 'Relax edge from source' },
      { step: 2, pass: 1, edge: 'A -> C (5)', distances: { A: 0, B: 4, C: 5 }, action: 'Relax another source edge' },
      { step: 3, pass: 1, edge: 'B -> C (-2)', distances: { A: 0, B: 4, C: 2 }, action: 'Negative edge improves C' },
      { step: 4, pass: 2, edge: 'all edges', distances: { A: 0, B: 4, C: 2 }, action: 'No improvement; distances are stable' },
    ],
    result: 'Bellman-Ford handles the negative edge and finds C at distance 2.',
  },
  realExample: {
    title: 'Currency arbitrage check',
    description: 'Exchange rates can be transformed into edge weights; a negative cycle means profitable arbitrage.',
    steps: ['Relax all exchange edges repeatedly', 'Check one extra pass', 'Any further improvement indicates a negative cycle'],
  },
})

Object.assign(primsTheory, {
  workedExample: {
    trace: [
      { step: 1, mst: ['A'], candidate: 'A-B (2)', action: 'Start at A and choose cheapest crossing edge' },
      { step: 2, mst: ['A', 'B'], candidate: 'B-C (1)', action: 'Add B, then choose cheapest edge leaving current MST' },
      { step: 3, mst: ['A', 'B', 'C'], candidate: 'C-D (3)', action: 'Add C and continue expanding' },
      { step: 4, mst: ['A', 'B', 'C', 'D'], action: 'All vertices are included' },
    ],
    result: 'MST edges are A-B, B-C, and C-D with total cost 6.',
  },
  realExample: {
    title: 'Network cabling from one building',
    description: 'Prim grows the connected network by always adding the cheapest link to a new building.',
    steps: ['Start from any connected building', 'Find cheapest edge to an unconnected building', 'Add that building and repeat'],
  },
})

Object.assign(kruskalsTheory, {
  workedExample: {
    trace: [
      { step: 1, edge: 'B-C (1)', sets: ['{B,C}', '{A}', '{D}'], action: 'Smallest edge connects two components' },
      { step: 2, edge: 'A-B (2)', sets: ['{A,B,C}', '{D}'], action: 'Add edge; no cycle formed' },
      { step: 3, edge: 'A-C (4)', sets: ['{A,B,C}', '{D}'], action: 'Skip because A and C are already connected' },
      { step: 4, edge: 'C-D (5)', sets: ['{A,B,C,D}'], action: 'Add final edge to connect all vertices' },
    ],
    result: 'MST includes B-C, A-B, and C-D.',
  },
  realExample: {
    title: 'Least-cost cable layout',
    description: 'Sort all possible cable links by cost and keep only those that connect new components.',
    steps: ['Sort links by cost', 'Use Union-Find to test if endpoints are already connected', 'Add link only when it does not form a cycle'],
  },
})

Object.assign(topologicalSortTheory, {
  workedExample: {
    trace: [
      { step: 1, node: 'Intro', action: 'DFS starts at a prerequisite course' },
      { step: 2, node: 'Data Structures', action: 'Visit dependent course after prerequisite path begins' },
      { step: 3, node: 'Algorithms', action: 'Finish descendants before placing course in output' },
      { step: 4, order: ['Intro', 'Data Structures', 'Algorithms'], action: 'Reverse finish order gives a valid topological order' },
    ],
    result: 'Every prerequisite appears before the course that depends on it.',
  },
  realExample: {
    title: 'Build dependency order',
    description: 'A build system must compile dependencies before the files that import them.',
    steps: ['Model imports as directed edges', 'Run topological sort', 'Build files in that order'],
  },
})

Object.assign(cycleDetectionTheory, {
  workedExample: {
    trace: [
      { step: 1, node: 'A', color: 'gray', action: 'A enters recursion stack' },
      { step: 2, node: 'B', color: 'gray', action: 'DFS follows A -> B' },
      { step: 3, node: 'C', color: 'gray', action: 'DFS follows B -> C' },
      { step: 4, edge: 'C -> A', action: 'A is gray, so this edge points back into the active path' },
    ],
    result: 'A directed cycle exists: A -> B -> C -> A.',
  },
  realExample: {
    title: 'Circular dependency detection',
    description: 'Package managers reject dependencies where package A eventually depends on itself.',
    steps: ['Mark current dependency path as gray', 'Follow dependency edges', 'Report a cycle when an edge reaches a gray package'],
  },
})

Object.assign(bfsTheory, {
  workedExample: {
    trace: [
      { step: 1, queue: ['A'], visited: ['A'], action: 'Start at source A' },
      { step: 2, queue: ['B', 'C'], visited: ['A', 'B', 'C'], action: 'Visit A and enqueue its neighbors' },
      { step: 3, queue: ['C', 'D'], visited: ['A', 'B', 'C', 'D'], action: 'Visit B and enqueue unvisited D' },
      { step: 4, queue: ['D'], visited: ['A', 'B', 'C', 'D'], action: 'Visit C; D already discovered' },
    ],
    result: 'BFS visits by distance from A: A, then B/C, then D.',
  },
  realExample: {
    title: 'Shortest unweighted path',
    description: 'In an unweighted maze, BFS finds the fewest-step path because it expands by levels.',
    steps: ['Enqueue starting cell', 'Expand all cells one step away', 'Stop when the target is first discovered'],
  },
})

Object.assign(dfsTheory, {
  workedExample: {
    trace: [
      { step: 1, node: 'A', stack: ['A'], action: 'Visit A' },
      { step: 2, node: 'B', stack: ['A', 'B'], action: 'Go deep to first unvisited neighbor' },
      { step: 3, node: 'D', stack: ['A', 'B', 'D'], action: 'Continue deeper before trying siblings' },
      { step: 4, node: 'B', stack: ['A', 'B'], action: 'Backtrack when D has no unvisited neighbors' },
      { step: 5, node: 'C', stack: ['A', 'C'], action: 'Try next branch from A' },
    ],
    result: 'DFS explores one branch fully before backtracking to another branch.',
  },
  realExample: {
    title: 'Maze exploration',
    description: 'DFS follows a path until it hits a dead end, then backs up to try another path.',
    steps: ['Mark current cell visited', 'Move to an unvisited neighbor', 'Backtrack when no unvisited neighbors remain'],
  },
})
