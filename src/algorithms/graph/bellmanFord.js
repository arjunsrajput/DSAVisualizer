export const bellmanFordCode = [
  'function bellmanFord(graph, src) {',
  '  let dist = {};',
  '  for (let v of graph.nodes) dist[v] = Infinity;',
  '  dist[src] = 0;',
  '  // Relax all edges V-1 times',
  '  for (let i = 0; i < V - 1; i++) {',
  '    for (let [u, v, w] of graph.edges) {',
  '      if (dist[u] + w < dist[v])',
  '        dist[v] = dist[u] + w;',
  '    }',
  '  }',
  '  // Check negative cycle',
  '  for (let [u, v, w] of graph.edges)',
  '    if (dist[u] + w < dist[v])',
  '      return "Negative cycle!";',
  '  return dist;',
  '}',
]

export function generateBellmanFordSteps(graph, src = 0) {
  const steps = []
  const nodeIds = graph.nodes.map(n => n.id)
  const dist = {}
  nodeIds.forEach(id => { dist[id] = Infinity })
  dist[src] = 0

  const snap = (activeEdge, relaxed, pass, activeLine, description) =>
    steps.push({ dist: { ...dist }, activeEdge, relaxed, pass, activeLine, description,
      nodeStatus: nodeIds.reduce((o, id) => ({ ...o, [id]: id === (activeEdge?.[0]) ? 'active' : 'unvisited' }), {}) })

  snap(null, null, 0, 0, `Bellman-Ford from node ${src}. Relax all ${graph.edges.length} edges ${nodeIds.length - 1} times.`)

  for (let i = 0; i < nodeIds.length - 1; i++) {
    snap(null, null, i + 1, 5, `Pass ${i + 1} of ${nodeIds.length - 1}: relax all edges`)
    for (const [u, v, w] of graph.edges) {
      snap([u, v], null, i + 1, 7, `Check edge ${u}→${v} (w=${w}). dist[${u}]=${dist[u] === Infinity ? '∞' : dist[u]}+${w} vs dist[${v}]=${dist[v] === Infinity ? '∞' : dist[v]}`)
      if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w
        snap([u, v], v, i + 1, 8, `Relax! dist[${v}] = ${dist[v]} (via ${u})`)
      }
    }
  }

  snap(null, null, -1, 12, `Checking for negative cycles...`)
  let hasNegCycle = false
  for (const [u, v, w] of graph.edges) {
    if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
      hasNegCycle = true
      snap([u, v], null, -1, 13, `Negative cycle detected on edge ${u}→${v}!`)
      break
    }
  }

  if (!hasNegCycle) {
    const distStr = nodeIds.map(id => `${id}:${dist[id] === Infinity ? '∞' : dist[id]}`).join(', ')
    snap(null, null, -1, 15, `✓ No negative cycle. Distances: {${distStr}}`)
  }
  return steps
}
