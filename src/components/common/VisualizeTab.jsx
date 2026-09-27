import StepDescription from './StepDescription'
import Controls from './Controls'
import CodePanel from './CodePanel'

export default function VisualizeTab({ 
  visualizer: Visualizer,
  array,
  step,
  code,
  currentStep,
  player,
  steps,
  inputControls,
  timeComplexity,
  spaceComplexity,
  note,
  mode,
  visualizerProps = {},
  extraVisualPanel
}) {
  return (
    <div className="space-y-4 pb-8">
      {/* Input Controls */}
      {inputControls && (
        <div className="panel p-4 flex flex-wrap gap-3 items-center">
          {inputControls}
        </div>
      )}

      {/* Main visualization grid - responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left side - Visualizer and controls (takes 2 cols on desktop) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Visualizer */}
          <Visualizer array={array} step={step} mode={mode} {...visualizerProps} />

          {/* Step Description */}
          <StepDescription description={currentStep?.description} />

          {/* Controls */}
          <Controls
            playing={player.playing}
            onToggle={player.toggle}
            onPrev={player.prev}
            onNext={player.next}
            onReset={player.reset}
            isFirst={player.isFirst}
            isLast={player.isLast}
            stepIdx={player.stepIdx}
            totalSteps={steps.length}
            progress={player.progress}
          />
        </div>

        {/* Right side - Code Panel (takes 1 col on desktop, full width on mobile) */}
        <div className="h-auto lg:h-[520px]">
          <CodePanel 
            code={code} 
            activeLine={currentStep?.activeLine ?? -1}
            timeComplexity={timeComplexity}
            spaceComplexity={spaceComplexity}
            note={note}
          />
        </div>
      </div>

      {extraVisualPanel}
    </div>
  )
}
