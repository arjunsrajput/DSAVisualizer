import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { categories } from '../../data/algorithms'
import usePlayerStore from '../../store/usePlayerStore'

function getCategoryRoot(route = '/') {
  const parts = route.split('/').filter(Boolean)
  return parts.length ? `/${parts[0]}` : '/'
}

export default function Navbar() {
  const location = useLocation()
  const [openMenu, setOpenMenu] = useState(null)
  const navRef = useRef(null)
  const { theme, setTheme } = usePlayerStore()

  useEffect(() => {
    const onOutsideClick = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenMenu(null)
      }
    }
    const onEsc = (event) => {
      if (event.key === 'Escape') setOpenMenu(null)
    }

    document.addEventListener('mousedown', onOutsideClick)
    document.addEventListener('touchstart', onOutsideClick)
    document.addEventListener('keydown', onEsc)

    return () => {
      document.removeEventListener('mousedown', onOutsideClick)
      document.removeEventListener('touchstart', onOutsideClick)
      document.removeEventListener('keydown', onEsc)
    }
  }, [])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 h-14 bg-gray-950/90 backdrop-blur border-b border-gray-800 flex items-center px-6 gap-6"
    >
      <Link to="/" className="flex items-center gap-2 font-mono font-bold text-white">
        <span className="text-cyan-400">&lt;</span>
        <span>AlgoViz</span>
        <span className="text-cyan-400">/&gt;</span>
      </Link>
      <Link
        to="/contests"
        className={`px-3 py-1 rounded-md transition-all text-xs font-medium ${
          location.pathname === '/contests'
            ? 'bg-cyan-700/50 text-cyan-300'
            : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
        }`}
      >
        Contests
      </Link>
      <div className="flex gap-1 ml-4 text-sm">
        {categories.map((category) => {
          const firstRoute = category.algorithms[0]?.route || '/'
          const rootPath = getCategoryRoot(firstRoute)
          const isCategoryActive = location.pathname === rootPath || location.pathname.startsWith(`${rootPath}/`)
          const isOpen = openMenu === category.id

          return (
            <div key={category.id} className="relative">
              <button
                onClick={() => setOpenMenu(isOpen ? null : category.id)}
                className={`px-3 py-1 rounded-md transition-all text-xs font-medium flex items-center gap-1 ${
                  isCategoryActive
                    ? 'bg-cyan-700/50 text-cyan-300'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                }`}
              >
                {category.name}
                <span className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>▾</span>
              </button>

              {isOpen && (
                <div className="absolute top-full left-0 mt-2 min-w-48 panel p-1 z-50">
                  {category.algorithms.map((algo) => {
                    const isAlgoActive = location.pathname === algo.route
                    return (
                      <Link
                        key={algo.id}
                        to={algo.route}
                        onClick={() => setOpenMenu(null)}
                        className={`block rounded-md px-3 py-2 text-xs transition-colors ${
                          isAlgoActive
                            ? 'bg-cyan-700/50 text-cyan-200'
                            : 'text-gray-300 hover:bg-gray-800'
                        }`}
                      >
                        {algo.name}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
      <div className="ml-auto">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="px-3 py-1 rounded-md text-xs font-medium text-gray-300 hover:text-gray-100 bg-gray-800 border border-gray-700 hover:border-gray-600 transition-all"
          title="Toggle theme"
        >
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
      </div>
    </nav>
  )
}
