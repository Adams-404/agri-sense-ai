import { createContext, useContext, useState, useCallback } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false)
  const [currentLang, setCurrentLang] = useState('en')
  const [toast, setToast] = useState(null)
  const [dashCounts, setDashCounts] = useState({ diseases: 0, chats: 0, products: 0, priceChecks: 0 })

  const toggleTheme = useCallback(() => {
    setDarkMode(prev => !prev)
  }, [])

  const showToast = useCallback((msg, type = 'info') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }, [])

  const updateDash = useCallback((type) => {
    setDashCounts(prev => {
      if (prev[type] !== undefined) {
        return { ...prev, [type]: prev[type] + 1 }
      }
      return prev
    })
  }, [])

  const langLabels = { en: 'English', ha: 'Hausa', ful: 'Fulfulde', yo: 'Yoruba', ig: 'Igbo', kr: 'Kanuri' }

  return (
    <AppContext.Provider value={{
      darkMode, toggleTheme,
      currentLang, setCurrentLang,
      langLabels,
      toast, showToast,
      dashCounts, updateDash,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
