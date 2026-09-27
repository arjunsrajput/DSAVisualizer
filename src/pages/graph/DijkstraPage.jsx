import { useMemo } from 'react'
import AlgoLayout from '../../components/common/AlgoLayout'
import AlgorithmTabs from '../../components/common/AlgorithmTabs'
import StepLog from '../../components/common/StepLog'
import WeightedGraphVisualizer from '../../components/visualizers/WeightedGraphVisualizer'
import { useAlgorithmPlayer } from '../../hooks/useAlgorithmPlayer'
import { dijkstraCode, generateDijkstraSteps, defaultWeightedGraph } from '../../algorithms/graph/dijkstra'
import { dijkstraTheory } from '../../data/graphTheory'

export default function DijkstraPage() {
  const steps = useMemo(() => generateDijkstraSteps(defaultWeightedGraph, 0), [])
  const player = useAlgorithmPlayer(steps)
  const cur = player.currentStep

  return (
    <AlgoLayout title="Dijkstra's Shortest Path" category="Graph" categoryPath="/graph/dijkstra">
      <AlgorithmTabs
        theory={dijkstraTheory}
        visualizer={WeightedGraphVisualizer}
        array={[]} step={cur} code={dijkstraCode} currentStep={cur}
        player={player} steps={steps}
        visualizerProps={{ step: cur, graphDef: defaultWeightedGraph, title: "Weighted Graph — Dijkstra's", showDist: true }}
        timeComplexity="O((V+E) log V)" spaceComplexity="O(V)"
        note="Does NOT work with negative edge weights — use Bellman-Ford instead"
        extraVisualPanel={<StepLog steps={steps} currentStepIdx={player.stepIdx} onSelectStep={player.goTo} />}
      />
    </AlgoLayout>
  )
}
