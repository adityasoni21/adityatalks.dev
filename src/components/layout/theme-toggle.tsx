'use client'

import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [light, setLight] = useState(false)

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('theme')
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches
    const shouldUseLight = savedTheme ? savedTheme === 'light' : prefersLight
    document.documentElement.dataset.theme = shouldUseLight ? 'light' : 'dark'
    requestAnimationFrame(() => setLight(shouldUseLight))
  }, [])

  function toggleTheme() {
    const nextLight = !light
    document.documentElement.dataset.theme = nextLight ? 'light' : 'dark'
    window.localStorage.setItem('theme', nextLight ? 'light' : 'dark')
    setLight(nextLight)
  }

  return (
    <button
      type="button"
      aria-label={light ? 'Switch to dark theme' : 'Switch to light theme'}
      className="p-8 hover:text-accent transition-colors"
      onClick={toggleTheme}
    >
      {light ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  )
}
