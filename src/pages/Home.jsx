import { Link } from 'react-router-dom'
import { categories } from '../data/algorithms'

const COLOR_MAP = {
  blue:    { bg: 'bg-blue-900/20',    border: 'border-blue-800/50',    icon: 'text-blue-400',    tag: 'bg-blue-800/30 text-blue-300' },
  cyan:  { bg: 'bg-cyan-900/20',  border: 'border-cyan-800/50',  icon: 'text-cyan-400',  tag: 'bg-cyan-800/30 text-cyan-300' },
  amber:   { bg: 'bg-amber-900/20',   border: 'border-amber-800/50',   icon: 'text-amber-400',   tag: 'bg-amber-800/30 text-amber-300' },
  green:   { bg: 'bg-green-900/20',   border: 'border-green-800/50',   icon: 'text-green-400',   tag: 'bg-green-800/30 text-green-300' },
  emerald: { bg: 'bg-emerald-900/20', border: 'border-emerald-800/50', icon: 'text-emerald-400', tag: 'bg-emerald-800/30 text-emerald-300' },
  rose:    { bg: 'bg-rose-900/20',    border: 'border-rose-800/50',    icon: 'text-rose-400',    tag: 'bg-rose-800/30 text-rose-300' },
}

const DIFF_CLASS = { Easy: 'tag-easy', Medium: 'tag-medium', Hard: 'tag-hard' }

export default function Home() {
  const totalAlgos = categories.reduce((sum, c) => sum + c.algorithms.length, 0)

  return (
    <div className="min-h-screen pt-14 bg-gray-950">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-transparent to-blue-900/10" />
        <div className="max-w-5xl mx-auto px-6 py-16 relative">
          <div className="font-mono text-cyan-400 text-sm mb-3 tracking-widest"></div>
          <h1 className="text-5xl font-bold text-white mb-4 font-display leading-tight">
            DSA<br />
            <span className="text-cyan-400">Visualizer</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-xl">
            Step through algorithms one operation at a time. Watch the code execute, understand each decision, and build intuition that sticks.
          </p>
          <div className="flex gap-6 text-sm font-mono">
            <div><span className="text-cyan-400 font-bold text-2xl">{totalAlgos}</span><span className="text-gray-500 ml-2">algorithms</span></div>
            <div><span className="text-cyan-400 font-bold text-2xl">{categories.length}</span><span className="text-gray-500 ml-2">categories</span></div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="space-y-10">
          {categories.map(cat => {
            const colors = COLOR_MAP[cat.color] || COLOR_MAP.cyan
            return (
              <div key={cat.id}>
                {/* Category header */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{cat.icon}</span>
                  <div>
                    <h2 className="text-xl font-bold text-white font-display">{cat.name}</h2>
                    <p className="text-sm text-gray-500">{cat.description}</p>
                  </div>
                </div>

                {/* Algorithm cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {cat.algorithms.map(algo => (
                    <Link key={algo.id} to={algo.route}
                      className={`block rounded-xl border p-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${colors.bg} ${colors.border} hover:border-opacity-100`}>
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-white text-sm">{algo.name}</h3>
                        <span className={DIFF_CLASS[algo.difficulty]}>{algo.difficulty}</span>
                      </div>
                      <p className="text-gray-400 text-xs mb-3 leading-relaxed">{algo.description}</p>
                      <div className="flex gap-3 text-xs font-mono">
                        <span><span className="text-gray-600">T: </span><span className="text-amber-400">{algo.time}</span></span>
                        <span><span className="text-gray-600">S: </span><span className="text-blue-400">{algo.space}</span></span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
