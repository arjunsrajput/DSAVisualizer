import { useEffect, useMemo, useState } from 'react'
import AlgoLayout from '../../components/common/AlgoLayout'
import AlgorithmTabs from '../../components/common/AlgorithmTabs'
import StepLog from '../../components/common/StepLog'
import StackVisualizer from '../../components/visualizers/StackVisualizer'
import { useAlgorithmPlayer } from '../../hooks/useAlgorithmPlayer'
import {
  DEFAULT_STACK_CAPACITY,
  MAX_STACK_CAPACITY,
  MIN_STACK_CAPACITY,
  stackCode,
  generateStackSteps,
  defaultStackOps,
  normalizeStackCapacity,
} from '../../algorithms/stack/stack'
import { stackTheory } from '../../data/stackTheory'

export default function StackPage() {
  const [operations, setOperations] = useState([])
  const [pushValue, setPushValue] = useState('')
  const [capacityInput, setCapacityInput] = useState(String(DEFAULT_STACK_CAPACITY))
  const capacity = normalizeStackCapacity(capacityInput)

  const steps = useMemo(() => generateStackSteps(operations, capacity), [operations, capacity])

  const player = useAlgorithmPlayer(steps)
  const cur = player.currentStep
  const trimmedValue = pushValue.trim()
  const hasPushValue = trimmedValue.length > 0

  useEffect(() => {
    player.goTo(Math.max(0, steps.length - 1))
  }, [steps, player.goTo])

  const addPush = () => {
    if (!hasPushValue) return
    const numericValue = Number(trimmedValue)
    const value = Number.isNaN(numericValue) ? trimmedValue : numericValue
    setOperations(prev => [...prev, { type: 'push', value }])
    setPushValue('')
  }

  const addOperation = (type) => {
    setOperations(prev => [...prev, { type }])
  }

  const inputControls = (
    <div className="w-full space-y-3">
      <div className="flex flex-wrap gap-3 items-end">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500 font-mono">Push value</label>
          <input
            value={pushValue}
            onChange={e => setPushValue(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') addPush()
            }}
            placeholder="10"
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm font-mono text-gray-200 w-36 focus:border-cyan-600 outline-none"
          />
        </div>
        <button
          onClick={addPush}
          disabled={!hasPushValue}
          className={`btn-primary text-xs ${!hasPushValue ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Push
        </button>
        <button onClick={() => addOperation('pop')} className="px-4 py-2 bg-rose-700 hover:bg-rose-600 border border-rose-600 text-white rounded-lg font-medium transition-all duration-150 text-xs">
          Pop
        </button>
        <button onClick={() => addOperation('peek')} className="px-4 py-2 bg-amber-700 hover:bg-amber-600 border border-amber-600 text-white rounded-lg font-medium transition-all duration-150 text-xs">
          Peek
        </button>
        <button
          onClick={() => setOperations(prev => prev.slice(0, -1))}
          disabled={operations.length === 0}
          className={`btn-ghost text-xs ${operations.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Undo Last
        </button>
        <button
          onClick={() => setOperations([])}
          disabled={operations.length === 0}
          className={`btn-ghost text-xs ${operations.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Clear
        </button>
        <button onClick={() => setOperations(defaultStackOps)} className="btn-ghost text-xs">
          Reset Demo
        </button>
      </div>
      <div className="flex flex-wrap gap-3 items-center">
        <label className="text-xs text-gray-500 font-mono">Capacity</label>
        <input
          type="number"
          min={MIN_STACK_CAPACITY}
          max={MAX_STACK_CAPACITY}
          value={capacityInput}
          onChange={e => setCapacityInput(e.target.value)}
          onBlur={() => setCapacityInput(String(capacity))}
          className="w-24 bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm font-mono text-gray-200 focus:border-cyan-600 outline-none"
        />
        <span className="text-xs text-gray-500 font-mono">
          allowed: {MIN_STACK_CAPACITY}-{MAX_STACK_CAPACITY}, active: {capacity}
        </span>
      </div>
      <div>
        <div className="text-xs text-gray-500 font-mono mb-2">Operation sequence:</div>
        <div className="flex min-h-8 flex-wrap gap-2">
          {operations.length === 0 ? (
            <span className="text-xs text-gray-600 font-mono px-2 py-1">No operations added yet</span>
          ) : (
            operations.map((op, i) => (
              <span key={i} className={`text-xs font-mono px-2 py-1 rounded border ${
                op.type === 'push' ? 'bg-cyan-900/30 border-cyan-800 text-cyan-300' :
                op.type === 'pop'  ? 'bg-rose-900/30 border-rose-800 text-rose-300' :
                'bg-amber-900/30 border-amber-800 text-amber-300'
              }`}>
                {op.type}({op.value !== undefined ? op.value : ''})
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  )

  return (
    <AlgoLayout title="Stack" category="Stack" categoryPath="/stack">
      <AlgorithmTabs
        theory={stackTheory}
        visualizer={StackVisualizer}
        array={cur?.stack || []}
        step={cur}
        code={stackCode}
        currentStep={cur}
        player={player}
        steps={steps}
        inputControls={inputControls}
        timeComplexity="O(1)"
        spaceComplexity="O(n)"
        note="LIFO - Last In First Out"
        visualizerProps={{ capacity }}
        extraVisualPanel={<StepLog steps={steps} currentStepIdx={player.stepIdx} onSelectStep={player.goTo} />}
        defaultTab="learn"
      />
    </AlgoLayout>
  )
}
