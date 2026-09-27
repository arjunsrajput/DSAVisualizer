export const cycleDetectionCode = [
  'function hasCycle(graph) {',
  '  let color = {}; // white=0,gray=1,black=2',
  '  for (let v of graph.nodes) color[v] = 0;',
  '  function dfs(v) {',
  '    color[v] = 1; // gray: processing',
  '    for (let nb of graph.adj[v]) {',
  '      if (color[nb] === 1) return true; // back edge!',
  '      if (color[nb] === 0 && dfs(nb)) return true;',
  '    }',
  '    color[v] = 2; // black: done',
  '    return false;',
  '  }',
  '  for (let v of graph.nodes)',
  '    if (color[v]===0 && dfs(v)) return true;',
  '  return false;',
  '}',
]

export function generateCycleDetectionSteps(graph) {
  const steps = []
  const color = {}
  graph.nodes.forEach(n => { color[n.id] = 0 })
  let cycleEdge = null

  const colorName = { 0: 'white', 1: 'gray', 2: 'black' }
  const statusMap = { 0: 'unvisited', 1: 'queued', 2: 'visited' }

  const snap = (activeEdge, activeLine, description) =>
    steps.push({
      nodeStatus: Object.fromEntries(graph.nodes.map(n => [n.id, statusMap[color[n.id]]])),
      color: { ...color }, activeEdge, cycleEdge, activeLine, description
    })

  snap(null, 0, 'Cycle detection via DFS 3-coloring: white=unvisited, gray=processing, black=done.')

  let foundCycle = false

  function dfs(v) {
    color[v] = 1
    snap(null, 4, `Node ${v} → gray (processing)`)

    for (const nb of (graph.adj[v] || [])) {
      snap([v, nb], 5, `Node ${v}: check neighbor ${nb} (${colorName[color[nb]]})`)
      if (color[nb] === 1) {
        cycleEdge = [v, nb]
        snap([v, nb], 6, `⚡ Back edge ${v}→${nb}! Node ${nb} is gray (ancestor). CYCLE DETECTED!`)
        foundCycle = true
        return true
      }
      if (color[nb] === 0) {
        snap([v, nb], 7, `Neighbor ${nb} is white → recurse`)
        if (dfs(nb)) return true
      }
    }

    color[v] = 2
    snap(null, 9, `Node ${v} → black (fully processed, no cycle from here)`)
    return false
  }

  for (const node of graph.nodes) {
    if (color[node.id] === 0) {
      snap(null, 13, `Start DFS from white node ${node.id}`)
      if (dfs(node.id)) break
    }
  }

  snap(null, foundCycle ? 13 : 14, foundCycle ? `✓ Graph HAS a cycle (back edge ${cycleEdge?.[0]}→${cycleEdge?.[1]})` : `✓ Graph has NO cycle (it is a DAG)`)
  return steps
}

export const defaultCyclicGraph = {
  nodes: [{ id: 0, x: 200, y: 60 }, { id: 1, x: 400, y: 60 }, { id: 2, x: 100, y: 220 },
          { id: 3, x: 300, y: 220 }, { id: 4, x: 480, y: 220 }],
  edges: [[0,1],[0,2],[1,3],[2,3],[3,4],[4,1]],
  adj: { 0:[1,2], 1:[3], 2:[3], 3:[4], 4:[1] },
  directed: true,
}
