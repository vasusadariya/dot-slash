'use client'

import { useTheme } from './theme-provider'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-white border-2 border-black dark:bg-gray-700 "
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <Moon className="w-5 h-5 text-yellow-300" /> : <Sun className="w-5 h-5 text-green-400" />}
    </button>
  )
}