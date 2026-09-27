import { useMemo } from 'react'
import AlgoLayout from '../../components/common/AlgoLayout'
import AlgorithmTabs from '../../components/common/AlgorithmTabs'
import StepLog from '../../components/common/StepLog'
import WeightedGraphVisualizer from '../../components/visualizers/WeightedGraphVisualizer'
import { useAlgorithmPlayer } from '../../hooks/useAlgorithmPlayer'
import { primsCode, generatePrimsSteps } from '../../algorithms/graph/prims'
import { defaultWeightedGraph } from '../../algorithms/graph/dijkstra'
import { primsTheory } from '../../data/graphTheory'

export default function PrimsPage() {
  const steps = useMemo(() => generatePrimsSteps(defaultWeightedGraph), [])
  const player = useAlgorithmPlayer(steps)
  const cur = player.currentStep

  return (
    <AlgoLayout title="Prim's MST Algorithm" category="Graph" categoryPath="/graph/prims">
      <AlgorithmTabs
        theory={primsTheory}
        visualizer={WeightedGraphVisualizer}
        array={[]} step={cur} code={primsCode} currentStep={cur}
        player={player} steps={steps}
        visualizerProps={{ step: cur, graphDef: defaultWeightedGraph, title: "Prim's MST", showMST: true }}
        timeComplexity="O(E log V)" spaceComplexity="O(V)"
        note="Greedy: always pick min-weight crossing edge from MST set"
        extraVisualPanel={<StepLog steps={steps} currentStepIdx={player.stepIdx} onSelectStep={player.goTo} />}
      />
    </AlgoLayout>
  )
}
