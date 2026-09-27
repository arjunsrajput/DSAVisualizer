import { useMemo } from 'react'
import AlgoLayout from '../../components/common/AlgoLayout'
import AlgorithmTabs from '../../components/common/AlgorithmTabs'
import StepLog from '../../components/common/StepLog'
import FloydCycleVisualizer from '../../components/visualizers/FloydCycleVisualizer'
import { useAlgorithmPlayer } from '../../hooks/useAlgorithmPlayer'
import { floydCycleCode, generateFloydCycleSteps, defaultFloydValues, defaultFloydCycleStart } from '../../algorithms/linkedList/floydCycle'
import { floydCycleTheory } from '../../data/linkedListTheory'

export default function FloydCyclePage() {
  const steps = useMemo(() => generateFloydCycleSteps(defaultFloydValues, defaultFloydCycleStart), [])
  const player = useAlgorithmPlayer(steps)
  const cur = player.currentStep

  return (
    <AlgoLayout title="Floyd's Cycle Detection" category="Linked List" categoryPath="/linked-list/floyd">
      <AlgorithmTabs
        theory={floydCycleTheory}
        visualizer={FloydCycleVisualizer}
        array={[]} step={cur} code={floydCycleCode} currentStep={cur}
        player={player} steps={steps}
        timeComplexity="O(n)" spaceComplexity="O(1)"
        note="Tortoise & Hare — they must meet if cycle exists"
        visualizerProps={{ step: cur }}
        extraVisualPanel={<StepLog steps={steps} currentStepIdx={player.stepIdx} onSelectStep={player.goTo} />}
      />
    </AlgoLayout>
  )
}
