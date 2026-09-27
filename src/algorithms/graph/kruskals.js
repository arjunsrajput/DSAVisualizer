export const kruskalsCode = [
  'function kruskal(graph) {',
  '  let edges = graph.edges.sort((a,b)=>a[2]-b[2]);',
  '  let parent = {}, rank = {};',
  '  // Initialize Union-Find',
  '  for (let v of graph.nodes) { parent[v]=v; rank[v]=0; }',
  '  let mst = [], totalW = 0;',
  '  for (let [u,v,w] of edges) {',
  '    let pu = find(parent, u), pv = find(parent, v);',
  '    if (pu !== pv) { // no cycle',
  '      mst.push([u,v,w]);',
  '      totalW += w;',
  '      union(parent, rank, pu, pv);',
  '    }',
  '  }',
  '  return mst;',
  '}',
]

function find(parent, x) {
  if (parent[x] !== x) parent[x] = find(parent, parent[x])
  return parent[x]
}

function union(parent, rank, x, y) {
  if (rank[x] < rank[y]) parent[x] = y
  else if (rank[x] > rank[y]) parent[y] = x
  else { parent[y] = x; rank[x]++ }
}

export function generateKruskalsSteps(graph) {
  const steps = []
  const sorted = [...graph.edges].sort((a, b) => a[2] - b[2])
  const parent = {}, rank = {}
  graph.nodes.forEach(n => { parent[n.id] = n.id; rank[n.id] = 0 })
  const mstEdges = []
  let totalWeight = 0

  const snap = (activeEdge, accepted, activeLine, description) =>
    steps.push({
      nodeStatus: graph.nodes.reduce((o, n) => ({ ...o, [n.id]: mstEdges.some(([u,v])=>u===n.id||v===n.id) ? 'visited' : 'unvisited' }), {}),
      mstEdges: [...mstEdges], activeEdge, accepted, totalWeight, sortedEdges: sorted, activeLine, description
    })

  snap(null, null, 0, `Kruskal's MST. Sort all edges by weight.`)
  snap(null, null, 1, `Sorted edges: ${sorted.map(([u,v,w])=>`${u}-${v}(${w})`).join(', ')}`)

  for (const [u, v, w] of sorted) {
    const pu = find(parent, u), pv = find(parent, v)
    snap([u,v,w], null, 7, `Consider edge ${u}-${v} (w=${w}). Find: ${u}→${pu}, ${v}→${pv}`)

    if (pu !== pv) {
      mstEdges.push([u, v, w])
      totalWeight += w
      union(parent, rank, pu, pv)
      snap([u,v,w], true, 9, `✓ No cycle! Add ${u}-${v} to MST. Total weight=${totalWeight}`)
    } else {
      snap([u,v,w], false, 8, `✗ Same component (${pu}). Skip — would create cycle.`)
    }
  }

  snap(null, null, 14, `✓ Kruskal's complete! MST has ${mstEdges.length} edges, total weight=${totalWeight}`)
  return steps
}
