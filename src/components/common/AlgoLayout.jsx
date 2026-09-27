import { Link } from 'react-router-dom'

export default function AlgoLayout({ title, category, categoryPath, children }) {
  return (
    <div className="min-h-screen pt-14 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-4 font-mono">
          <Link to="/" className="hover:text-gray-300 transition-colors">home</Link>
          <span>/</span>
          <Link to={categoryPath} className="hover:text-gray-300 transition-colors">{category.toLowerCase()}</Link>
          <span>/</span>
          <span className="text-cyan-400">{title.toLowerCase().replace(/ /g, '-')}</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-white mb-6 font-display">{title}</h1>

        {children}
      </div>
    </div>
  )
}
