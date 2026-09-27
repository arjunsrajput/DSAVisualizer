import { useMemo } from 'react'
import AlgoLayout from '../../components/common/AlgoLayout'
import AlgorithmTabs from '../../components/common/AlgorithmTabs'
import StepLog from '../../components/common/StepLog'
import WeightedGraphVisualizer from '../../components/visualizers/WeightedGraphVisualizer'
import { useAlgorithmPlayer } from '../../hooks/useAlgorithmPlayer'
import { kruskalsCode, generateKruskalsSteps } from '../../algorithms/graph/kruskals'
import { defaultWeightedGraph } from '../../algorithms/graph/dijkstra'
import { kruskalsTheory } from '../../data/graphTheory'

export default function KruskalsPage() {
  const steps = useMemo(() => generateKruskalsSteps(defaultWeightedGraph), [])
  const player = useAlgorithmPlayer(steps)
  const cur = player.currentStep

  return (
    <AlgoLayout title="Kruskal's MST Algorithm" category="Graph" categoryPath="/graph/kruskals">
      <AlgorithmTabs
        theory={kruskalsTheory}
        visualizer={WeightedGraphVisualizer}
        array={[]} step={cur} code={kruskalsCode} currentStep={cur}
        player={player} steps={steps}
        visualizerProps={{ step: cur, graphDef: defaultWeightedGraph, title: "Kruskal's MST", showMST: true }}
        timeComplexity="O(E log E)" spaceComplexity="O(V)"
        note="Uses Union-Find (Disjoint Set Union) to detect cycles"
        extraVisualPanel={<StepLog steps={steps} currentStepIdx={player.stepIdx} onSelectStep={player.goTo} />}
      />
    </AlgoLayout>
  )
}
