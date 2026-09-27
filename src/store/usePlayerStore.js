import { create } from 'zustand'

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'dark'
  const saved = window.localStorage.getItem('theme')
  return saved === 'light' || saved === 'dark' ? saved : 'dark'
}

const usePlayerStore = create((set) => ({
  speedMs: 500,
  theme: getInitialTheme(),
  setSpeedMs: (ms) => set({ speedMs: ms }),
  setTheme: (theme) => {
    if (typeof window !== 'undefined') window.localStorage.setItem('theme', theme)
    set({ theme })
  },
}))

export default usePlayerStore
