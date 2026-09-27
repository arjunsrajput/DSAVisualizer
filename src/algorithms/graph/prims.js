export const primsCode = [
  "function prim(graph) {",
  "  let inMST = new Set(), mstEdges = [];",
  "  inMST.add(0); // start from node 0",
  "  while (inMST.size < graph.nodes.length) {",
  "    // Find min-weight edge crossing the cut",
  "    let minEdge = null, minWeight = Infinity;",
  "    for (let [u,v,w] of graph.edges) {",
  "      if (inMST.has(u) && !inMST.has(v) ||",
  "          inMST.has(v) && !inMST.has(u)) {",
  "        if (w < minWeight) { minWeight=w; minEdge=[u,v,w]; }",
  "      }",
  "    }",
  "    mstEdges.push(minEdge);",
  "    inMST.add(minEdge[1] ?? minEdge[0]);",
  "  }",
  "  return mstEdges;",
  "}",
]

export function generatePrimsSteps(graph) {
  const steps = []
  const inMST = new Set([0])
  const mstEdges = []
  let totalWeight = 0

  const snap = (activeEdge, candidateEdges, activeLine, description) =>
    steps.push({
      nodeStatus: graph.nodes.reduce((o, n) => ({ ...o, [n.id]: inMST.has(n.id) ? 'visited' : 'unvisited' }), {}),
      mstEdges: [...mstEdges], activeEdge, candidateEdges, totalWeight, activeLine, description
    })

  snap(null, [], 0, `Prim's MST. Start node 0 added to MST set.`)

  while (inMST.size < graph.nodes.length) {
    let minEdge = null, minWeight = Infinity
    const candidates = []

    for (const [u, v, w] of graph.edges) {
      const crosses = (inMST.has(u) && !inMST.has(v)) || (inMST.has(v) && !inMST.has(u))
      if (crosses) {
        candidates.push([u, v, w])
        if (w < minWeight) { minWeight = w; minEdge = [u, v, w] }
      }
    }

    snap(null, candidates, 6, `Find min-weight crossing edge. Candidates: ${candidates.map(([u,v,w])=>`${u}-${v}(${w})`).join(', ')}`)

    if (!minEdge) break
    mstEdges.push(minEdge)
    const newNode = inMST.has(minEdge[0]) ? minEdge[1] : minEdge[0]
    inMST.add(newNode)
    totalWeight += minEdge[2]
    snap(minEdge, [], 12, `Add edge ${minEdge[0]}-${minEdge[1]} (w=${minEdge[2]}). Node ${newNode} joins MST. Total weight=${totalWeight}`)
  }

  snap(null, [], 15, `✓ Prim's MST complete! Total weight = ${totalWeight}`)
  return steps
}
