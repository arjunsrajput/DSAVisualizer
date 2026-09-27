import { useMemo, useState } from 'react'
import AlgoLayout from '../../components/common/AlgoLayout'
import AlgorithmTabs from '../../components/common/AlgorithmTabs'
import StepLog from '../../components/common/StepLog'
import DPTableVisualizer from '../../components/visualizers/DPTableVisualizer'
import { useAlgorithmPlayer } from '../../hooks/useAlgorithmPlayer'
import { DEFAULT_KNAPSACK_ITEMS, generateKnapsackSteps, knapsackCode } from '../../algorithms/dp/knapsack'
import { knapsackTheory } from '../../data/dpTheory'

function parseItems(input) {
  return input
    .split(',')
    .map(part => part.trim())
    .filter(Boolean)
    .map(part => {
      const [weight, value] = part.split(':').map(token => Number(token.trim()))
      return { weight, value }
    })
    .filter(item => Number.isInteger(item.weight) && Number.isInteger(item.value))
}

export default function KnapsackPage() {
  const [itemsInput, setItemsInput] = useState(DEFAULT_KNAPSACK_ITEMS.map(item => `${item.weight}:${item.value}`).join(', '))
  const [capacity, setCapacity] = useState(5)

  const { items, steps } = useMemo(() => {
    const parsed = parseItems(itemsInput)
    const items = parsed.length ? parsed : DEFAULT_KNAPSACK_ITEMS
    return { items, steps: generateKnapsackSteps(items, capacity) }
  }, [itemsInput, capacity])

  const player = useAlgorithmPlayer(steps)
  const cur = player.currentStep

  const inputControls = (
    <div className="flex items-center gap-3 flex-wrap w-full">
      <label className="text-xs text-gray-500 font-mono">Items w:v</label>
      <input value={itemsInput} onChange={e => setItemsInput(e.target.value)}
        className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm font-mono text-gray-200 w-80 focus:border-cyan-600 outline-none" />
      <label className="text-xs text-gray-500 font-mono">Capacity</label>
      <input type="number" min="0" max="20" value={capacity} onChange={e => setCapacity(Number(e.target.value))}
        className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm font-mono text-cyan-300 w-24 text-center focus:border-cyan-600 outline-none" />
      <button onClick={() => {
        setItemsInput(DEFAULT_KNAPSACK_ITEMS.map(item => `${item.weight}:${item.value}`).join(', '))
        setCapacity(5)
      }} className="btn-ghost text-xs">Reset Demo</button>
      <span className="text-xs text-gray-500 font-mono">{items.length} items</span>
    </div>
  )

  return (
    <AlgoLayout title="0/1 Knapsack" category="Dynamic Programming" categoryPath="/dp/knapsack">
      <AlgorithmTabs
        theory={knapsackTheory}
        visualizer={DPTableVisualizer}
        array={[]}
        step={cur}
        code={knapsackCode}
        currentStep={cur}
        player={player}
        steps={steps}
        inputControls={inputControls}
        timeComplexity="O(nW)"
        spaceComplexity="O(nW)"
        note="Each cell compares skipping vs taking the current item"
        mode="knapsack"
        extraVisualPanel={<StepLog steps={steps} currentStepIdx={player.stepIdx} onSelectStep={player.goTo} />}
      />
    </AlgoLayout>
  )
}
