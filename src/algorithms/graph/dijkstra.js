export const dijkstraCode = [
  'function dijkstra(graph, src) {',
  '  let dist = {}, visited = new Set();',
  '  // Initialize all distances to Infinity',
  '  for (let v of graph.nodes) dist[v] = Infinity;',
  '  dist[src] = 0;',
  '  // Min-priority queue (simplified)',
  '  while (unvisited nodes remain) {',
  '    let u = node with min dist[u];',
  '    visited.add(u);',
  '    for (let [v, w] of graph.adj[u]) {',
  '      if (dist[u] + w < dist[v]) {',
  '        dist[v] = dist[u] + w;',
  '        prev[v] = u;',
  '      }',
  '    }',
  '  }',
  '  return dist;',
  '}',
]

export function generateDijkstraSteps(graph, src = 0) {
  const steps = []
  const nodeIds = graph.nodes.map(n => n.id)
  const dist = {}
  const prev = {}
  const visited = new Set()

  nodeIds.forEach(id => { dist[id] = Infinity; prev[id] = null })
  dist[src] = 0

  const snap = (activeNode, activeEdge, relaxed, activeLine, description) =>
    steps.push({
      nodeStatus: nodeIds.reduce((o, id) => ({ ...o, [id]: visited.has(id) ? 'visited' : id === activeNode ? 'active' : 'unvisited' }), {}),
      dist: { ...dist }, prev: { ...prev }, activeNode, activeEdge, relaxed,
      activeLine, description
    })

  snap(null, null, null, 0, `Dijkstra from node ${src}. Initialize dist[${src}]=0, all others=∞`)

  for (let iter = 0; iter < nodeIds.length; iter++) {
    // Pick min unvisited
    const candidates = nodeIds.filter(id => !visited.has(id) && dist[id] < Infinity)
    if (!candidates.length) break

    const u = candidates.reduce((a, b) => dist[a] < dist[b] ? a : b)
    visited.add(u)
    snap(u, null, null, 7, `Pick min dist unvisited: node ${u} (dist=${dist[u]}). Mark visited.`)

    for (const { to: v, weight: w } of (graph.weighted_adj?.[u] || [])) {
      snap(u, [u, v], null, 9, `Check edge ${u}→${v} (weight=${w}). dist[${u}]+${w}=${dist[u]+w} vs dist[${v}]=${dist[v]}`)
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w
        prev[v] = u
        snap(u, [u, v], v, 10, `Relax! dist[${v}] updated: ${dist[v]} via node ${u}`)
      } else {
        snap(u, [u, v], null, 10, `No improvement. dist[${v}]=${dist[v]} stays.`)
      }
    }
  }

  const distStr = nodeIds.map(id => `${id}:${dist[id] === Infinity ? '∞' : dist[id]}`).join(', ')
  snap(null, null, null, 16, `✓ Dijkstra complete! Distances: {${distStr}}`)
  return steps
}

export const defaultWeightedGraph = {
  nodes: [
    { id: 0, x: 300, y: 60 }, { id: 1, x: 140, y: 180 }, { id: 2, x: 460, y: 180 },
    { id: 3, x: 80, y: 310 }, { id: 4, x: 220, y: 310 }, { id: 5, x: 380, y: 310 }, { id: 6, x: 520, y: 310 },
  ],
  edges: [[0,1,4],[0,2,2],[1,3,5],[1,4,1],[2,5,8],[2,6,10],[4,5,2],[5,6,3]],
  weighted_adj: {
    0: [{to:1,weight:4},{to:2,weight:2}],
    1: [{to:0,weight:4},{to:3,weight:5},{to:4,weight:1}],
    2: [{to:0,weight:2},{to:5,weight:8},{to:6,weight:10}],
    3: [{to:1,weight:5}],
    4: [{to:1,weight:1},{to:5,weight:2}],
    5: [{to:2,weight:8},{to:4,weight:2},{to:6,weight:3}],
    6: [{to:2,weight:10},{to:5,weight:3}],
  }
}
