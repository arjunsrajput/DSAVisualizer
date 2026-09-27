import { useEffect, useState, useMemo } from 'react'
import AlgoLayout from '../../components/common/AlgoLayout'
import AlgorithmTabs from '../../components/common/AlgorithmTabs'
import StepLog from '../../components/common/StepLog'
import AVLVisualizer from '../../components/visualizers/AVLVisualizer'
import { useAlgorithmPlayer } from '../../hooks/useAlgorithmPlayer'
import { avlTreeCode, generateAVLSteps, defaultAVLValues } from '../../algorithms/tree/avlTree'
import { avlTreeTheory } from '../../data/treeTheory'

export default function AVLPage() {
  const [values, setValues] = useState([])
  const [inputValue, setInputValue] = useState('')

  const steps = useMemo(() => generateAVLSteps(values), [values])

  const player = useAlgorithmPlayer(steps)
  const cur = player.currentStep
  const trimmedValue = inputValue.trim()
  const hasValue = trimmedValue.length > 0

  useEffect(() => {
    player.goTo(Math.max(0, steps.length - 1))
  }, [steps, player.goTo])

  const addValue = () => {
    if (!hasValue) return
    setValues(prev => [...prev, Number(trimmedValue)])
    setInputValue('')
  }

  return (
    <AlgoLayout title="AVL Tree (Self-Balancing BST)" category="Tree" categoryPath="/tree/avl">
      <AlgorithmTabs
        theory={avlTreeTheory}
        visualizer={AVLVisualizer}
        array={[]} step={cur} code={avlTreeCode} currentStep={cur}
        player={player} steps={steps}
        inputControls={
          <div className="w-full space-y-3">
            <div className="flex flex-wrap items-end gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500 font-mono">Insert value</label>
                <input value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') addValue() }}
                  className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm font-mono text-gray-200 w-36 focus:border-cyan-600 outline-none" />
              </div>
              <button onClick={addValue} disabled={!hasValue} className={`btn-primary text-xs ${!hasValue ? 'opacity-50 cursor-not-allowed' : ''}`}>Insert</button>
              <button onClick={() => setValues(prev => prev.slice(0, -1))} disabled={values.length === 0} className={`btn-ghost text-xs ${values.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}>Undo Last</button>
              <button onClick={() => setValues([])} disabled={values.length === 0} className={`btn-ghost text-xs ${values.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}>Clear</button>
              <button onClick={() => setValues(defaultAVLValues)} className="btn-ghost text-xs">Reset Demo</button>
            </div>
            <div className="flex min-h-8 flex-wrap gap-2">
              {values.length === 0 ? <span className="text-xs text-gray-600 font-mono px-2 py-1">No values inserted yet</span> : values.map((value, i) => (
                <span key={`${value}-${i}`} className="text-xs font-mono px-2 py-1 rounded border bg-emerald-900/30 border-emerald-800 text-emerald-300">insert({value})</span>
              ))}
            </div>
          </div>
        }
        visualizerProps={{ step: cur }}
        timeComplexity="O(log n)" spaceComplexity="O(n)"
        note="Balance factor (bf) = height(left) - height(right). Must be -1, 0, or 1"
        extraVisualPanel={<StepLog steps={steps} currentStepIdx={player.stepIdx} onSelectStep={player.goTo} />}
      />
    </AlgoLayout>
  )
}
