import { useEffect, useMemo, useState } from 'react'
import AlgoLayout from '../../components/common/AlgoLayout'
import AlgorithmTabs from '../../components/common/AlgorithmTabs'
import StepLog from '../../components/common/StepLog'
import TreeVisualizer from '../../components/visualizers/TreeVisualizer'
import { useAlgorithmPlayer } from '../../hooks/useAlgorithmPlayer'
import { bstCode, generateBSTSteps, defaultBSTOps } from '../../algorithms/tree/bst'
import { bstTheory } from '../../data/treeTheory'

export default function BSTPage() {
  const [operations, setOperations] = useState([])
  const [inputValue, setInputValue] = useState('')

  const steps = useMemo(() => generateBSTSteps(operations), [operations])

  const player = useAlgorithmPlayer(steps)
  const cur = player.currentStep
  const trimmedValue = inputValue.trim()
  const hasValue = trimmedValue.length > 0

  useEffect(() => {
    player.goTo(Math.max(0, steps.length - 1))
  }, [steps, player.goTo])

  const addOperation = (type) => {
    if (!hasValue) return
    setOperations(prev => [...prev, { type, value: Number(trimmedValue) }])
    setInputValue('')
  }

  const inputControls = (
    <div className="w-full">
        <div className="flex flex-wrap gap-3 items-end mb-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 font-mono">Node value</label>
            <input
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') addOperation('insert') }}
              placeholder="50"
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm font-mono text-gray-200 w-36 focus:border-cyan-600 outline-none"
            />
          </div>
          <button onClick={() => addOperation('insert')} disabled={!hasValue} className={`btn-primary text-xs ${!hasValue ? 'opacity-50 cursor-not-allowed' : ''}`}>Insert</button>
          <button onClick={() => addOperation('search')} disabled={!hasValue} className={`px-4 py-2 bg-amber-700 hover:bg-amber-600 border border-amber-600 text-white rounded-lg font-medium transition-all duration-150 text-xs ${!hasValue ? 'opacity-50 cursor-not-allowed' : ''}`}>Search</button>
          <button onClick={() => setOperations(prev => prev.slice(0, -1))} disabled={operations.length === 0} className={`btn-ghost text-xs ${operations.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}>Undo Last</button>
          <button onClick={() => setOperations([])} disabled={operations.length === 0} className={`btn-ghost text-xs ${operations.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}>Clear</button>
          <button onClick={() => setOperations(defaultBSTOps)} className="btn-ghost text-xs">Reset Demo</button>
        </div>
        <div className="text-xs text-gray-500 font-mono mb-2">Operation sequence:</div>
        <div className="flex min-h-8 flex-wrap gap-2">
          {operations.length === 0 ? <span className="text-xs text-gray-600 font-mono px-2 py-1">No operations added yet</span> : operations.map((op, i) => (
            <span key={i} className={`text-xs font-mono px-2 py-1 rounded border ${
              op.type === 'insert' ? 'bg-emerald-900/30 border-emerald-800 text-emerald-300' :
              'bg-cyan-900/30 border-cyan-800 text-cyan-300'
            }`}>
              {op.type}({op.value})
            </span>
          ))}
        </div>
      </div>
  )

  return (
    <AlgoLayout title="Binary Search Tree" category="Tree" categoryPath="/tree/bst">
      <AlgorithmTabs
        theory={bstTheory}
        visualizer={TreeVisualizer}
        array={[]}
        step={cur}
        code={bstCode}
        currentStep={cur}
        player={player}
        steps={steps}
        inputControls={inputControls}
        timeComplexity="O(log n)"
        spaceComplexity="O(n)"
        note="Balanced: O(log n) | Skewed: O(n)"
        visualizerProps={{
          nodes: cur?.nodes || [],
          edges: cur?.edges || [],
          highlight: cur?.highlight,
          path: cur?.path || [],
          status: cur?.status,
        }}
        extraVisualPanel={<StepLog steps={steps} currentStepIdx={player.stepIdx} onSelectStep={player.goTo} />}
        defaultTab="learn"
      />
    </AlgoLayout>
  )
}
