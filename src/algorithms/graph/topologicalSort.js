export const topologicalSortCode = [
  'function topoSort(graph) {',
  '  let visited = new Set(), result = [];',
  '  function dfs(v) {',
  '    visited.add(v);',
  '    for (let neighbor of graph.adj[v]) {',
  '      if (!visited.has(neighbor))',
  '        dfs(neighbor);',
  '    }',
  '    result.unshift(v); // add to front',
  '  }',
  '  for (let v of graph.nodes)',
  '    if (!visited.has(v)) dfs(v);',
  '  return result;',
  '}',
]

export function generateTopologicalSortSteps(graph) {
  const steps = []
  const visited = new Set()
  const result = []
  const status = {}
  graph.nodes.forEach(n => { status[n.id] = 'unvisited' })

  const snap = (activeLine, description) =>
    steps.push({ nodeStatus: { ...status }, result: [...result], activeLine, description })

  snap(0, 'Topological Sort (DFS-based). Only valid for DAGs (Directed Acyclic Graphs).')

  function dfs(v) {
    visited.add(v)
    status[v] = 'active'
    snap(3, `DFS on node ${v}. Mark gray (processing).`)

    for (const nb of (graph.adj[v] || [])) {
      if (!visited.has(nb)) {
        snap(4, `Node ${v}: unvisited neighbor ${nb} → recurse`)
        dfs(nb)
      } else {
        snap(5, `Node ${v}: neighbor ${nb} already visited, skip.`)
      }
    }

    result.unshift(v)
    status[v] = 'visited'
    snap(8, `Node ${v} finished. Add to front of result: [${result.join(' → ')}]`)
  }

  for (const node of graph.nodes) {
    if (!visited.has(node.id)) {
      snap(10, `Start DFS from unvisited node ${node.id}`)
      dfs(node.id)
    }
  }

  snap(12, `✓ Topological order: [${result.join(' → ')}]`)
  return steps
}

export const defaultDAG = {
  nodes: [{ id: 0, x: 160, y: 60 }, { id: 1, x: 380, y: 60 }, { id: 2, x: 100, y: 200 },
          { id: 3, x: 260, y: 200 }, { id: 4, x: 440, y: 200 }, { id: 5, x: 300, y: 330 }],
  edges: [[0,2],[0,3],[1,3],[1,4],[2,5],[3,5],[4,5]],
  adj: { 0:[2,3], 1:[3,4], 2:[5], 3:[5], 4:[5], 5:[] },
  directed: true,
}
