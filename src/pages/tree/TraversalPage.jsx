import { useEffect, useState, useMemo } from 'react'
import AlgoLayout from '../../components/common/AlgoLayout'
import AlgorithmTabs from '../../components/common/AlgorithmTabs'
import StepLog from '../../components/common/StepLog'
import TraversalVisualizer from '../../components/visualizers/TraversalVisualizer'
import { useAlgorithmPlayer } from '../../hooks/useAlgorithmPlayer'
import {
  inorderCode, preorderCode, postorderCode, levelOrderCode,
  generateInorderSteps, generatePreorderSteps, generatePostorderSteps, generateLevelOrderSteps,
  defaultTreeValues
} from '../../algorithms/tree/treeTraversals'
import { inorderTheory, preorderTheory, postorderTheory, levelOrderTheory } from '../../data/treeTheory'

const TRAVERSAL_CONFIG = {
  inorder:    { code: inorderCode, gen: generateInorderSteps, theory: () => inorderTheory, title: 'Inorder Traversal (L→Root→R)', tc: 'O(n)', sc: 'O(h)', note: 'h = height of tree' },
  preorder:   { code: preorderCode, gen: generatePreorderSteps, theory: () => preorderTheory, title: 'Preorder Traversal (Root→L→R)', tc: 'O(n)', sc: 'O(h)' },
  postorder:  { code: postorderCode, gen: generatePostorderSteps, theory: () => postorderTheory, title: 'Postorder Traversal (L→R→Root)', tc: 'O(n)', sc: 'O(h)' },
  levelOrder: { code: levelOrderCode, gen: generateLevelOrderSteps, theory: () => levelOrderTheory, title: 'Level Order Traversal (BFS)', tc: 'O(n)', sc: 'O(w)', note: 'w = max width of tree' },
}

export default function TraversalPage({ type = 'inorder' }) {
  const cfg = TRAVERSAL_CONFIG[type]
  const [values, setValues] = useState(defaultTreeValues)
  const [inputValue, setInputValue] = useState('')

  const steps = useMemo(() => {
    if (values.length === 0) {
      return [{ nodes: [], edges: [], current: null, visited: [], queue: [], activeLine: 0, description: 'Tree is empty.' }]
    }
    return cfg.gen(values)
  }, [values, type])

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
    <AlgoLayout title={cfg.title} category="Tree" categoryPath={`/tree/${type}`}>
      <AlgorithmTabs
        theory={cfg.theory()}
        visualizer={TraversalVisualizer}
        array={[]} step={cur} code={cfg.code} currentStep={cur}
        player={player} steps={steps}
        inputControls={
          <div className="w-full space-y-3">
            <div className="flex flex-wrap items-end gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500 font-mono">Add node value</label>
                <input value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') addValue() }}
                  className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm font-mono text-gray-200 w-36 focus:border-cyan-600 outline-none" />
              </div>
              <button onClick={addValue} disabled={!hasValue} className={`btn-primary text-xs ${!hasValue ? 'opacity-50 cursor-not-allowed' : ''}`}>Add Node</button>
              <button onClick={() => setValues(prev => prev.slice(0, -1))} disabled={values.length === 0} className={`btn-ghost text-xs ${values.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}>Undo Last</button>
              <button onClick={() => setValues([])} disabled={values.length === 0} className={`btn-ghost text-xs ${values.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}>Clear</button>
              <button onClick={() => setValues(defaultTreeValues)} className="btn-ghost text-xs">Reset Demo</button>
            </div>
            <div className="flex min-h-8 flex-wrap gap-2">
              {values.length === 0 ? <span className="text-xs text-gray-600 font-mono px-2 py-1">No nodes added yet</span> : values.map((value, i) => (
                <span key={`${value}-${i}`} className="text-xs font-mono px-2 py-1 rounded border bg-emerald-900/30 border-emerald-800 text-emerald-300">{value}</span>
              ))}
            </div>
          </div>
        }
        visualizerProps={{ step: cur, title: cfg.title }}
        timeComplexity={cfg.tc} spaceComplexity={cfg.sc} note={cfg.note}
        extraVisualPanel={<StepLog steps={steps} currentStepIdx={player.stepIdx} onSelectStep={player.goTo} />}
      />
    </AlgoLayout>
  )
}
