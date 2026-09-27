export const DEFAULT_GRAPH_NODES_INPUT = '0, 1, 2, 3, 4, 5, 6'
export const DEFAULT_GRAPH_EDGES_INPUT = '0-1, 0-2, 1-3, 1-4, 2-5, 2-6'

const GRAPH_WIDTH = 640
const GRAPH_HEIGHT = 360

function parseNodeIds(input) {
  return input
    .split(/[\s,;]+/)
    .map(token => token.trim())
    .filter(Boolean)
    .map(Number)
    .filter(value => Number.isInteger(value))
}

function uniqueNumbers(values) {
  return [...new Set(values)].sort((a, b) => a - b)
}

function layoutNodes(nodeIds) {
  if (nodeIds.length === 1) {
    return [{ id: nodeIds[0], x: GRAPH_WIDTH / 2, y: GRAPH_HEIGHT / 2 }]
  }

  const centerX = GRAPH_WIDTH / 2
  const centerY = GRAPH_HEIGHT / 2
  const baseRadius = Math.min(GRAPH_WIDTH, GRAPH_HEIGHT) * 0.34
  const radius = baseRadius + Math.max(0, nodeIds.length - 8) * 12
  const startAngle = -Math.PI / 2

  return nodeIds.map((id, idx) => {
    const angle = startAngle + (idx * 2 * Math.PI) / nodeIds.length
    return {
      id,
      x: Math.round(centerX + Math.cos(angle) * radius),
      y: Math.round(centerY + Math.sin(angle) * radius),
    }
  })
}

function parseEdges(input, nodeSet) {
  const warnings = []
  const seen = new Set()
  const edges = []

  input
    .split(/[\n,;]+/)
    .map(token => token.trim())
    .filter(Boolean)
    .forEach(token => {
      const match = token.match(/^(-?\d+)\s*(?:-|->|\s+)\s*(-?\d+)$/)
      if (!match) {
        warnings.push(`Ignored invalid edge "${token}"`)
        return
      }

      const a = Number(match[1])
      const b = Number(match[2])
      if (!nodeSet.has(a) || !nodeSet.has(b)) {
        warnings.push(`Ignored ${a}-${b}: node missing`)
        return
      }

      if (a === b) {
        warnings.push(`Ignored ${a}-${b}: self edge`)
        return
      }

      const key = a < b ? `${a}-${b}` : `${b}-${a}`
      if (seen.has(key)) return
      seen.add(key)
      edges.push([a, b])
    })

  return { edges, warnings }
}

export function buildGraphFromInput(nodesInput, edgesInput) {
  const warnings = []
  const nodeIds = uniqueNumbers(parseNodeIds(nodesInput))

  if (nodeIds.length === 0) {
    return {
      graph: { nodes: [], edges: [], adj: {} },
      warnings: ['Add at least one numeric node id'],
    }
  }

  const nodeSet = new Set(nodeIds)
  const { edges, warnings: edgeWarnings } = parseEdges(edgesInput, nodeSet)
  warnings.push(...edgeWarnings)

  const adj = Object.fromEntries(nodeIds.map(id => [id, []]))
  edges.forEach(([a, b]) => {
    adj[a].push(b)
    adj[b].push(a)
  })
  Object.values(adj).forEach(neighbors => neighbors.sort((a, b) => a - b))

  return {
    graph: {
      nodes: layoutNodes(nodeIds),
      edges,
      adj,
    },
    warnings,
  }
}
