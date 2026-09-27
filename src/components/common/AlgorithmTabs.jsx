import { useState, useEffect } from 'react'
import LearnTab from './LearnTab'
import VisualizeTab from './VisualizeTab'
import TipsTab from './TipsTab'

export default function AlgorithmTabs({
  theory, visualizer: Visualizer, array, step, code, currentStep,
  player, steps, inputControls, timeComplexity, spaceComplexity, note,
  mode, visualizerProps, extraVisualPanel, defaultTab = 'learn'
}) {
  // Fix: single useState init reads localStorage, no race condition
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem('algoTab') || defaultTab)
  const hasTips = Boolean(theory?.tips)
  const tabs = hasTips ? ['learn', 'visualize', 'tips'] : ['learn', 'visualize']

  useEffect(() => {
    if (!tabs.includes(activeTab)) setActiveTab(defaultTab)
  }, [activeTab, defaultTab, tabs])

  useEffect(() => { localStorage.setItem('algoTab', activeTab) }, [activeTab])

  return (
    <div className="w-full">
      <div className="flex gap-1 mb-4 bg-gray-900 p-1 rounded-lg overflow-x-auto">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`flex-1 min-w-[120px] py-2 px-4 rounded font-semibold text-sm transition-all whitespace-nowrap ${
              activeTab === tab
                ? 'bg-cyan-700 text-white shadow-lg shadow-cyan-500/20'
                : 'text-gray-400 hover:text-gray-300 bg-gray-800'
            }`}>
            {tab === 'tips' ? 'Tips & Tricks' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div>
        {activeTab === 'learn' && (
          <div className="animate-fadeIn">
            <LearnTab theory={theory} />
          </div>
        )}
        {activeTab === 'visualize' && (
          <div className="animate-fadeIn">
            <VisualizeTab
              visualizer={Visualizer} array={array} step={step} code={code}
              currentStep={currentStep} player={player} steps={steps}
              inputControls={inputControls} timeComplexity={timeComplexity}
              spaceComplexity={spaceComplexity} note={note} mode={mode}
              visualizerProps={visualizerProps} extraVisualPanel={extraVisualPanel}
            />
          </div>
        )}
        {activeTab === 'tips' && hasTips && (
          <div className="animate-fadeIn">
            <TipsTab tips={theory?.tips} />
          </div>
        )}
      </div>
    </div>
  )
}
