export default function StepDescription({ description, stepIdx, totalSteps }) {
  if (!description) return null
  return (
    <div className="panel px-4 py-3 flex items-start gap-3">
      <span className="text-cyan-400 mt-0.5 shrink-0">▶</span>
      <p className="text-sm text-slate-300 leading-relaxed">{description}</p>
    </div>
  )
}
