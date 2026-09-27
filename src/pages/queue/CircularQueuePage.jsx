import { useEffect, useMemo, useState } from 'react'
import AlgoLayout from '../../components/common/AlgoLayout'
import AlgorithmTabs from '../../components/common/AlgorithmTabs'
import StepLog from '../../components/common/StepLog'
import CircularQueueVisualizer from '../../components/visualizers/CircularQueueVisualizer'
import { useAlgorithmPlayer } from '../../hooks/useAlgorithmPlayer'
import { circularQueueCode, generateCircularQueueSteps, defaultCircularQueueOps } from '../../algorithms/queue/circularQueue'
import { circularQueueTheory } from '../../data/queueTheory'

export default function CircularQueuePage() {
  const [operations, setOperations] = useState([])
  const [enqueueValue, setEnqueueValue] = useState('')
  const [capacity, setCapacity] = useState(5)

  const steps = useMemo(() => generateCircularQueueSteps(operations, capacity), [operations, capacity])

  const player = useAlgorithmPlayer(steps)
  const cur = player.currentStep
  const trimmedValue = enqueueValue.trim()
  const hasValue = trimmedValue.length > 0

  useEffect(() => {
    player.goTo(Math.max(0, steps.length - 1))
  }, [steps, player.goTo])

  const addEnqueue = () => {
    if (!hasValue) return
    setOperations(prev => [...prev, { type: 'enqueue', value: Number(trimmedValue) }])
    setEnqueueValue('')
  }

  return (
    <AlgoLayout title="Circular Queue" category="Queue" categoryPath="/queue/circular">
      <AlgorithmTabs
        theory={circularQueueTheory}
        visualizer={CircularQueueVisualizer}
        array={[]} step={cur} code={circularQueueCode} currentStep={cur}
        player={player} steps={steps}
        inputControls={
          <div className="flex flex-wrap gap-3 items-end w-full">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500 font-mono">Enqueue value</label>
              <input value={enqueueValue} onChange={e => setEnqueueValue(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') addEnqueue() }}
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm font-mono text-gray-200 w-36 focus:border-cyan-600 outline-none" />
            </div>
            <button onClick={addEnqueue} disabled={!hasValue} className={`btn-primary text-xs ${!hasValue ? 'opacity-50 cursor-not-allowed' : ''}`}>Enqueue</button>
            <button onClick={() => setOperations(prev => [...prev, { type: 'dequeue' }])} className="px-4 py-2 bg-rose-700 hover:bg-rose-600 border border-rose-600 text-white rounded-lg font-medium transition-all duration-150 text-xs">Dequeue</button>
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-500 font-mono">Capacity</label>
              <input type="number" min={2} max={8} value={capacity} onChange={e => setCapacity(Number(e.target.value))}
                className="bg-gray-800 border border-gray-700 rounded-lg px-2 py-1.5 text-sm font-mono text-gray-200 w-16 focus:border-cyan-600 outline-none" />
            </div>
            <button onClick={() => setOperations(prev => prev.slice(0, -1))} disabled={operations.length === 0} className={`btn-ghost text-xs ${operations.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}>Undo Last</button>
            <button onClick={() => setOperations([])} disabled={operations.length === 0} className={`btn-ghost text-xs ${operations.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}>Clear</button>
            <button onClick={() => setOperations(defaultCircularQueueOps)} className="btn-ghost text-xs">Reset Demo</button>
          </div>
        }
        visualizerProps={{ step: cur }}
        timeComplexity="O(1)" spaceComplexity="O(n)"
        note="Wrap-around using modulo: (rear + 1) % capacity"
        extraVisualPanel={<StepLog steps={steps} currentStepIdx={player.stepIdx} onSelectStep={player.goTo} />}
      />
    </AlgoLayout>
  )
}
