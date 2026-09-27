export const bfsCode = [
  'function bfs(graph, start) {',
  '  let visited = new Set();',
  '  let queue = [start];',
  '  visited.add(start);',
  '  while (queue.length > 0) {',
  '    let node = queue.shift();',
  '    process(node);',
  '    for (let neighbor of graph[node]) {',
  '      if (!visited.has(neighbor)) {',
  '        visited.add(neighbor);',
  '        queue.push(neighbor);',
  '      }',
  '    }',
  '  }',
  '}',
]

export const defaultGraph = {
  nodes: [
    { id: 0, x: 300, y: 60 },
    { id: 1, x: 150, y: 180 },
    { id: 2, x: 450, y: 180 },
    { id: 3, x: 80, y: 300 },
    { id: 4, x: 220, y: 300 },
    { id: 5, x: 380, y: 300 },
    { id: 6, x: 520, y: 300 },
  ],
  edges: [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]],
  adj: { 0:[1,2], 1:[0,3,4], 2:[0,5,6], 3:[1], 4:[1], 5:[2], 6:[2] }
}

export function generateBFSSteps(graph, start = 0) {
  const steps = []
  const nodeCount = graph.nodes.length
  const status = {}
  graph.nodes.forEach(n => { status[n.id] = 'unvisited' })

  const snap = (queue, activeLine, description) => {
    steps.push({ nodeStatus: { ...status }, queue: [...queue], activeLine, description })
  }

  snap([], 0, `BFS starting from node ${start}`)
  status[start] = 'queued'
  const queue = [start]
  snap(queue, 2, `Initialize queue with start node ${start}`)
  snap(queue, 3, `Mark ${start} as visited`)

  while (queue.length > 0) {
    snap(queue, 4, `Queue not empty: [${queue.join(', ')}]`)
    const node = queue.shift()
    status[node] = 'visited'
    snap(queue, 5, `Dequeue node ${node}`)
    snap(queue, 6, `Process node ${node}`)

    for (const neighbor of graph.adj[node]) {
      snap(queue, 7, `Checking neighbor ${neighbor} of node ${node}`)
      if (status[neighbor] === 'unvisited') {
        status[neighbor] = 'queued'
        queue.push(neighbor)
        snap(queue, 9, `${neighbor} not visited → mark & enqueue. Queue: [${queue.join(', ')}]`)
      } else {
        snap(queue, 8, `${neighbor} already visited — skip`)
      }
    }
  }

  snap([], 13, '✓ BFS complete! All reachable nodes visited.')
  return steps
}
