import { useMemo, useState } from 'react'
import AlgoLayout from '../../components/common/AlgoLayout'
import AlgorithmTabs from '../../components/common/AlgorithmTabs'
import StepLog from '../../components/common/StepLog'
import GraphVisualizer from '../../components/visualizers/GraphVisualizer'
import { useAlgorithmPlayer } from '../../hooks/useAlgorithmPlayer'
import { dfsCode, generateDFSSteps } from '../../algorithms/graph/dfs'
import { dfsTheory } from '../../data/graphTheory'
import { DEFAULT_GRAPH_EDGES_INPUT, DEFAULT_GRAPH_NODES_INPUT, buildGraphFromInput } from '../../utils/graphInput'

export default function DFSPage() {
  const [startNode, setStartNode] = useState(0)
  const [nodeIds, setNodeIds] = useState(DEFAULT_GRAPH_NODES_INPUT.split(',').map(s => Number(s.trim())))
  const [edges, setEdges] = useState(DEFAULT_GRAPH_EDGES_INPUT.split(',').map(edge => edge.trim().split('-').map(Number)))
  const [nodeValue, setNodeValue] = useState('')
  const [edgeFrom, setEdgeFrom] = useState('')
  const [edgeTo, setEdgeTo] = useState('')

  const { graph, warnings, steps } = useMemo(() => {
    const nodesInput = nodeIds.join(', ')
    const edgesInput = edges.map(([a, b]) => `${a}-${b}`).join(', ')
    const parsed = buildGraphFromInput(nodesInput, edgesInput)
    const parsedNodeIds = parsed.graph.nodes.map(node => node.id)
    const start = parsedNodeIds.includes(startNode) ? startNode : parsedNodeIds[0]
    return {
      ...parsed,
      steps: start === undefined ? [] : generateDFSSteps(parsed.graph, start),
    }
  }, [nodeIds, edges, startNode])

  const player = useAlgorithmPlayer(steps)
  const cur = player.currentStep
  const activeStart = graph.nodes.some(node => node.id === startNode) ? startNode : graph.nodes[0]?.id

  const resetDemo = () => {
    setNodeIds(DEFAULT_GRAPH_NODES_INPUT.split(',').map(s => Number(s.trim())))
    setEdges(DEFAULT_GRAPH_EDGES_INPUT.split(',').map(edge => edge.trim().split('-').map(Number)))
    setStartNode(0)
  }

  const addNode = () => {
    const value = Number(nodeValue.trim())
    if (!Number.isInteger(value) || nodeIds.includes(value)) return
    setNodeIds(prev => [...prev, value].sort((a, b) => a - b))
    setNodeValue('')
  }

  const addEdge = () => {
    const a = Number(edgeFrom.trim())
    const b = Number(edgeTo.trim())
    if (!Number.isInteger(a) || !Number.isInteger(b) || a === b || !nodeIds.includes(a) || !nodeIds.includes(b)) return
    const key = a < b ? `${a}-${b}` : `${b}-${a}`
    if (edges.some(([x, y]) => (x < y ? `${x}-${y}` : `${y}-${x}`) === key)) return
    setEdges(prev => [...prev, [a, b]])
    setEdgeFrom('')
    setEdgeTo('')
  }

  const inputControls = (
    <div className="w-full space-y-3">
      <div className="flex flex-wrap gap-3 items-end">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500 font-mono">Node</label>
          <input value={nodeValue} onChange={e => setNodeValue(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') addNode() }}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm font-mono text-gray-200 w-24 focus:border-cyan-600 outline-none" />
        </div>
        <button onClick={addNode} className="btn-primary text-xs">Add Node</button>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500 font-mono">Edge from</label>
          <input value={edgeFrom} onChange={e => setEdgeFrom(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm font-mono text-gray-200 w-24 focus:border-cyan-600 outline-none" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500 font-mono">to</label>
          <input value={edgeTo} onChange={e => setEdgeTo(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') addEdge() }}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm font-mono text-gray-200 w-24 focus:border-cyan-600 outline-none" />
        </div>
        <button onClick={addEdge} className="btn-primary text-xs">Add Edge</button>
        <button onClick={() => setEdges(prev => prev.slice(0, -1))} disabled={edges.length === 0} className={`btn-ghost text-xs ${edges.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}>Undo Edge</button>
        <button onClick={() => { setNodeIds([]); setEdges([]) }} className="btn-ghost text-xs">Clear</button>
        <button onClick={resetDemo} className="btn-ghost text-xs">Reset Demo</button>
        {activeStart !== startNode && activeStart !== undefined && (
          <span className="text-xs text-amber-300 font-mono">using start node {activeStart}</span>
        )}
      </div>
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-gray-500 font-mono py-1">Start:</span>
          {nodeIds.map(id => (
            <button key={id} onClick={() => setStartNode(id)} className={`text-xs font-mono px-2 py-1 rounded border ${activeStart === id ? 'bg-cyan-900/40 border-cyan-700 text-cyan-300' : 'bg-gray-800/40 border-gray-800 text-gray-400'}`}>{id}</button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {edges.map(([a, b], i) => <span key={`${a}-${b}-${i}`} className="text-xs font-mono px-2 py-1 rounded border bg-emerald-900/30 border-emerald-800 text-emerald-300">{a}-{b}</span>)}
        </div>
      </div>
      <div className="flex flex-wrap gap-2 text-[11px] font-mono">
        <span className="rounded border border-gray-800 bg-gray-800/40 px-2 py-1 text-gray-400">
          Add nodes first, then connect existing nodes with edges.
        </span>
        {warnings.slice(0, 3).map((warning, idx) => (
          <span key={idx} className="rounded border border-amber-800 bg-amber-900/20 px-2 py-1 text-amber-300">
            {warning}
          </span>
        ))}
      </div>
    </div>
  )

  return (
    <AlgoLayout title="Depth First Search" category="Graph" categoryPath="/graph/dfs">
      <AlgorithmTabs
        theory={dfsTheory}
        visualizer={GraphVisualizer}
        array={[]}
        step={cur}
        code={dfsCode}
        currentStep={cur}
        player={player}
        steps={steps}
        inputControls={inputControls}
        timeComplexity="O(V + E)"
        spaceComplexity="O(V)"
        note="Goes deep before backtracking"
        visualizerProps={{
          nodes: graph.nodes,
          edges: graph.edges,
          nodeStatus: cur?.nodeStatus,
          queueOrStack: cur?.stack,
          label: 'Stack',
        }}
        extraVisualPanel={<StepLog steps={steps} currentStepIdx={player.stepIdx} onSelectStep={player.goTo} />}
        defaultTab="learn"
      />
    </AlgoLayout>
  )
}
