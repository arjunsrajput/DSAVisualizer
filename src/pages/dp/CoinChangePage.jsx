import { useMemo, useState } from 'react'
import AlgoLayout from '../../components/common/AlgoLayout'
import AlgorithmTabs from '../../components/common/AlgorithmTabs'
import StepLog from '../../components/common/StepLog'
import OneDDPVisualizer from '../../components/visualizers/OneDDPVisualizer'
import { useAlgorithmPlayer } from '../../hooks/useAlgorithmPlayer'
import { coinChangeCode, generateCoinChangeSteps } from '../../algorithms/dp/coinChange'
import { coinChangeTheory } from '../../data/dpTheory'

const parseNumbers = (input) => input.split(',').map(s => Number(s.trim())).filter(Number.isFinite)

export default function CoinChangePage() {
  const [coinsInput, setCoinsInput] = useState('1, 3, 4')
  const [amount, setAmount] = useState(6)
  const steps = useMemo(() => generateCoinChangeSteps(parseNumbers(coinsInput), amount), [coinsInput, amount])
  const player = useAlgorithmPlayer(steps)
  const cur = player.currentStep

  const inputControls = (
    <div className="flex items-center gap-3 flex-wrap">
      <label className="text-xs text-gray-500 font-mono">Coins</label>
      <input value={coinsInput} onChange={e => setCoinsInput(e.target.value)}
        className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm font-mono text-gray-200 w-44 focus:border-cyan-600 outline-none" />
      <label className="text-xs text-gray-500 font-mono">Amount</label>
      <input type="number" min="0" max="40" value={amount} onChange={e => setAmount(Number(e.target.value))}
        className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm font-mono text-cyan-300 w-24 text-center focus:border-cyan-600 outline-none" />
    </div>
  )

  return (
    <AlgoLayout title="Coin Change" category="Dynamic Programming" categoryPath="/dp/coin-change">
      <AlgorithmTabs
        theory={coinChangeTheory}
        visualizer={OneDDPVisualizer}
        array={[]}
        step={cur}
        code={coinChangeCode}
        currentStep={cur}
        player={player}
        steps={steps}
        inputControls={inputControls}
        timeComplexity="O(amount × coins)"
        spaceComplexity="O(amount)"
        note="Each amount tries every coin and stores the minimum count"
        mode="coin"
        extraVisualPanel={<StepLog steps={steps} currentStepIdx={player.stepIdx} onSelectStep={player.goTo} />}
      />
    </AlgoLayout>
  )
}
