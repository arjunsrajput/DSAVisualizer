import { useState, useMemo } from 'react'
import { useDeferredValue } from 'react'
import AlgoLayout from '../../components/common/AlgoLayout'
import AlgorithmTabs from '../../components/common/AlgorithmTabs'
import StepLog from '../../components/common/StepLog'
import BarVisualizer from '../../components/visualizers/BarVisualizer'
import { useAlgorithmPlayer, useDebounce } from '../../hooks/useAlgorithmPlayer'

const DEFAULT_ARRAY = [64, 34, 25, 12, 22, 11, 90, 45]

export default function SortingPage({ title, theory, code, generator, timeComplexity, spaceComplexity, note, categoryPath = '/sorting/bubble' }) {
  const [inputArr, setInputArr] = useState(DEFAULT_ARRAY.join(', '))
  const debouncedInput = useDebounce(inputArr, 400)

  // Validation
  const parsed = debouncedInput.split(',').map(s => s.trim())
  const invalid = parsed.filter(s => s !== '' && isNaN(parseInt(s)))

  const { array, steps } = useMemo(() => {
    const arr = debouncedInput.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n))
    if (arr.length === 0) return { array: DEFAULT_ARRAY, steps: generator(DEFAULT_ARRAY) }
    return { array: arr, steps: generator(arr) }
  }, [debouncedInput, generator])

  const player = useAlgorithmPlayer(steps)
  const cur = player.currentStep

  const inputControls = (
    <>
      <div className="flex items-center gap-2 w-full flex-wrap">
        <label className="text-xs text-gray-500 font-mono">Array</label>
        <input value={inputArr} onChange={e => setInputArr(e.target.value)}
          className={`bg-gray-800 border rounded-lg px-3 py-1.5 text-sm font-mono text-gray-200 w-72 outline-none transition-colors ${invalid.length > 0 ? 'border-rose-600 focus:border-rose-400' : 'border-gray-700 focus:border-cyan-600'}`} />
        {invalid.length > 0 && (
          <span className="text-xs text-rose-400 font-mono">⚠ Invalid: {invalid.join(', ')}</span>
        )}
        <button onClick={() => {
          const arr = Array.from({ length: 8 }, () => Math.floor(Math.random() * 90) + 10)
          setInputArr(arr.join(', '))
        }} className="btn-ghost text-xs">⚄ Random</button>
        <div className="ml-auto flex gap-4">
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-widest font-mono">Swaps</div>
            <div className="text-xl font-bold text-cyan-300 font-mono">{cur?.swapCount ?? 0}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500 uppercase tracking-widest font-mono">Total</div>
            <div className="text-sm text-slate-300 font-mono">{steps.at(-1)?.swapCount ?? 0}</div>
          </div>
        </div>
      </div>
    </>
  )

  return (
    <AlgoLayout title={title} category="Sorting" categoryPath={categoryPath}>
      <AlgorithmTabs
        theory={theory} visualizer={BarVisualizer}
        array={cur?.array || array} step={cur}
        code={code} currentStep={cur} player={player} steps={steps}
        inputControls={inputControls} timeComplexity={timeComplexity}
        spaceComplexity={spaceComplexity} note={note}
        extraVisualPanel={<StepLog steps={steps} currentStepIdx={player.stepIdx} onSelectStep={player.goTo} />}
      />
    </AlgoLayout>
  )
}
