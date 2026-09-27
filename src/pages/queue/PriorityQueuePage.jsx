import { useEffect, useMemo, useState } from 'react'
import AlgoLayout from '../../components/common/AlgoLayout'
import AlgorithmTabs from '../../components/common/AlgorithmTabs'
import StepLog from '../../components/common/StepLog'
import PriorityQueueVisualizer from '../../components/visualizers/PriorityQueueVisualizer'
import { useAlgorithmPlayer } from '../../hooks/useAlgorithmPlayer'
import { priorityQueueCode, generatePriorityQueueSteps, defaultPQOps } from '../../algorithms/queue/priorityQueue'
import { priorityQueueTheory } from '../../data/queueTheory'

export default function PriorityQueuePage() {
  const [operations, setOperations] = useState([])
  const [insertValue, setInsertValue] = useState('')

  const steps = useMemo(() => generatePriorityQueueSteps(operations), [operations])

  const player = useAlgorithmPlayer(steps)
  const cur = player.currentStep
  const trimmedValue = insertValue.trim()
  const hasValue = trimmedValue.length > 0

  useEffect(() => {
    player.goTo(Math.max(0, steps.length - 1))
  }, [steps, player.goTo])

  const addInsert = () => {
    if (!hasValue) return
    setOperations(prev => [...prev, { type: 'insert', value: Number(trimmedValue) }])
    setInsertValue('')
  }

  return (
    <AlgoLayout title="Priority Queue (Min Heap)" category="Queue" categoryPath="/queue/priority">
      <AlgorithmTabs
        theory={priorityQueueTheory}
        visualizer={PriorityQueueVisualizer}
        array={[]} step={cur} code={priorityQueueCode} currentStep={cur}
        player={player} steps={steps}
        inputControls={
          <div className="flex flex-wrap gap-3 items-end w-full">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500 font-mono">Insert value</label>
              <input value={insertValue} onChange={e => setInsertValue(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') addInsert() }}
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm font-mono text-gray-200 w-36 focus:border-cyan-600 outline-none" />
            </div>
            <button onClick={addInsert} disabled={!hasValue} className={`btn-primary text-xs ${!hasValue ? 'opacity-50 cursor-not-allowed' : ''}`}>Insert</button>
            <button onClick={() => setOperations(prev => [...prev, { type: 'extractMin' }])} className="px-4 py-2 bg-rose-700 hover:bg-rose-600 border border-rose-600 text-white rounded-lg font-medium transition-all duration-150 text-xs">Extract Min</button>
            <button onClick={() => setOperations(prev => prev.slice(0, -1))} disabled={operations.length === 0} className={`btn-ghost text-xs ${operations.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}>Undo Last</button>
            <button onClick={() => setOperations([])} disabled={operations.length === 0} className={`btn-ghost text-xs ${operations.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}>Clear</button>
            <button onClick={() => setOperations(defaultPQOps)} className="btn-ghost text-xs">Reset Demo</button>
          </div>
        }
        visualizerProps={{ step: cur }}
        timeComplexity="O(log n)" spaceComplexity="O(n)"
        note="Min-Heap: smallest element always at root"
        extraVisualPanel={<StepLog steps={steps} currentStepIdx={player.stepIdx} onSelectStep={player.goTo} />}
      />
    </AlgoLayout>
  )
}
