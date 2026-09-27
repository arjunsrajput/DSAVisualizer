import { useEffect, useMemo, useState } from 'react'
import AlgoLayout from '../../components/common/AlgoLayout'
import AlgorithmTabs from '../../components/common/AlgorithmTabs'
import StepLog from '../../components/common/StepLog'
import LinkedListVisualizer from '../../components/visualizers/LinkedListVisualizer'
import { useAlgorithmPlayer } from '../../hooks/useAlgorithmPlayer'
import { linkedListCode, generateLinkedListSteps, defaultLinkedListOps } from '../../algorithms/linkedList/linkedList'
import { linkedListTheory } from '../../data/linkedListTheory'

export default function LinkedListPage() {
  const [operations, setOperations] = useState([])
  const [inputValue, setInputValue] = useState('')

  const steps = useMemo(() => generateLinkedListSteps(operations), [operations])

  const player = useAlgorithmPlayer(steps)
  const cur = player.currentStep
  const trimmedValue = inputValue.trim()
  const hasValue = trimmedValue.length > 0

  useEffect(() => {
    player.goTo(Math.max(0, steps.length - 1))
  }, [steps, player.goTo])

  const addValueOperation = (type) => {
    if (!hasValue) return
    const numericValue = Number(trimmedValue)
    const value = Number.isNaN(numericValue) ? trimmedValue : numericValue
    setOperations(prev => [...prev, { type, value }])
    setInputValue('')
  }

  const addTraverse = () => {
    setOperations(prev => [...prev, { type: 'traverse' }])
  }

  const undoLast = () => {
    setOperations(prev => prev.slice(0, -1))
  }

  const inputControls = (
    <div className="w-full">
        <div className="flex flex-wrap gap-3 items-end mb-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 font-mono">Node value</label>
            <input
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') addValueOperation('insertTail')
              }}
              placeholder="10"
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm font-mono text-gray-200 w-36 focus:border-cyan-600 outline-none"
            />
          </div>
          <button
            onClick={() => addValueOperation('insertHead')}
            disabled={!hasValue}
            className={`btn-primary text-xs ${!hasValue ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Insert Head
          </button>
          <button
            onClick={() => addValueOperation('insertTail')}
            disabled={!hasValue}
            className={`btn-primary text-xs ${!hasValue ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Insert Tail
          </button>
          <button
            onClick={() => addValueOperation('delete')}
            disabled={!hasValue}
            className={`px-4 py-2 bg-rose-700 hover:bg-rose-600 border border-rose-600 text-white rounded-lg font-medium transition-all duration-150 text-xs ${!hasValue ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Delete
          </button>
          <button onClick={addTraverse} className="btn-ghost text-xs">
            Traverse
          </button>
          <button onClick={undoLast} disabled={operations.length === 0} className={`btn-ghost text-xs ${operations.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}>
            Undo Last
          </button>
          <button onClick={() => setOperations([])} disabled={operations.length === 0} className={`btn-ghost text-xs ${operations.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}>
            Clear
          </button>
          <button onClick={() => setOperations(defaultLinkedListOps)} className="btn-ghost text-xs">
            Reset Demo
          </button>
        </div>
        <div className="text-xs text-gray-500 font-mono mb-2">Operation sequence:</div>
        <div className="flex min-h-8 flex-wrap gap-2">
          {operations.length === 0 ? (
            <span className="text-xs text-gray-600 font-mono px-2 py-1">No operations added yet</span>
          ) : (
            operations.map((op, i) => (
              <span key={i} className={`text-xs font-mono px-2 py-1 rounded border ${
                op.type === 'insertHead' ? 'bg-cyan-900/30 border-cyan-800 text-cyan-300' :
                op.type === 'insertTail' ? 'bg-cyan-900/30 border-cyan-800 text-cyan-300' :
                op.type === 'delete'     ? 'bg-rose-900/30 border-rose-800 text-rose-300' :
                'bg-amber-900/30 border-amber-800 text-amber-300'
              }`}>
                {op.type}({op.value !== undefined ? op.value : ''})
              </span>
            ))
          )}
        </div>
      </div>
  )

  return (
    <AlgoLayout title="Linked List Operations" category="Linked List" categoryPath="/linked-list">
      <AlgorithmTabs
        theory={linkedListTheory}
        visualizer={LinkedListVisualizer}
        array={[]}
        step={cur}
        code={linkedListCode}
        currentStep={cur}
        player={player}
        steps={steps}
        inputControls={inputControls}
        timeComplexity="O(n)"
        spaceComplexity="O(n)"
        note="Node = data + next pointer"
        visualizerProps={{ nodes: cur?.nodes || [], highlight: cur?.highlight ?? -1 }}
        extraVisualPanel={<StepLog steps={steps} currentStepIdx={player.stepIdx} onSelectStep={player.goTo} />}
        defaultTab="learn"
      />
    </AlgoLayout>
  )
}
