export const dfsCode = [
  'function dfs(graph, start) {',
  '  let visited = new Set();',
  '  let stack = [start];',
  '  while (stack.length > 0) {',
  '    let node = stack.pop();',
  '    if (visited.has(node)) continue;',
  '    visited.add(node);',
  '    process(node);',
  '    for (let neighbor of graph[node]) {',
  '      if (!visited.has(neighbor))',
  '        stack.push(neighbor);',
  '    }',
  '  }',
  '}',
]

export { defaultGraph } from './bfs.js'

export function generateDFSSteps(graph, start = 0) {
  const steps = []
  const status = {}
  graph.nodes.forEach(n => { status[n.id] = 'unvisited' })

  const snap = (stack, activeLine, description) => {
    steps.push({ nodeStatus: { ...status }, stack: [...stack], activeLine, description })
  }

  snap([], 0, `DFS starting from node ${start}`)
  const stack = [start]
  snap(stack, 2, `Initialize stack with start node ${start}`)

  while (stack.length > 0) {
    snap(stack, 3, `Stack not empty: [${stack.join(', ')}]`)
    const node = stack.pop()
    snap(stack, 4, `Pop node ${node} from stack`)

    if (status[node] === 'visited') {
      snap(stack, 5, `Node ${node} already visited — skip`)
      continue
    }

    status[node] = 'visited'
    snap(stack, 6, `Mark node ${node} as visited`)
    snap(stack, 7, `Process node ${node}`)

    const neighbors = [...graph.adj[node]].reverse()
    for (const neighbor of neighbors) {
      snap(stack, 8, `Checking neighbor ${neighbor} of node ${node}`)
      if (status[neighbor] !== 'visited') {
        stack.push(neighbor)
        status[neighbor] = 'queued'
        snap(stack, 10, `Push ${neighbor} to stack. Stack: [${stack.join(', ')}]`)
      } else {
        snap(stack, 9, `${neighbor} already visited — skip`)
      }
    }
  }

  snap([], 12, '✓ DFS complete! All reachable nodes visited.')
  return steps
}
