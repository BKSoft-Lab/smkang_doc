import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { ModuleWindowMenuBridge } from './components/ModuleWindowMenuBridge'
import SplashScreen from './components/SplashScreen'
import { isMdiModuleRoute } from './constants/mdiModules'
import { MesAuthProvider } from './context/MesAuthContext'
import { MesMdiProvider, useMesMdi } from './context/MesMdiContext'
import ModuleBlankPage from './pages/ModuleBlankPage'
import ModuleFeaturesPage from './pages/ModuleFeaturesPage'
import ScreenPlaceholderPage from './pages/ScreenPlaceholderPage'

function parseModuleNameFromPath(pathname: string): string | null {
  const m = pathname.match(/^\/module\/(.+)$/)
  if (!m) return null
  try {
    return decodeURIComponent(m[1])
  } catch {
    return m[1]
  }
}

function MenuOpenScreenBridge() {
  const navigate = useNavigate()
  const location = useLocation()
  const { openOrFocus } = useMesMdi()

  useEffect(() => {
    const unsub = window.mes?.onOpenScreen?.((payload) => {
      const id = payload?.screenId
      if (!id) return

      const mod = parseModuleNameFromPath(location.pathname)
      if (mod && isMdiModuleRoute(mod)) {
        openOrFocus(id)
        return
      }

      navigate(`/screens/${encodeURIComponent(id)}`)
    })
    if (typeof unsub === 'function') return unsub
    return undefined
  }, [navigate, location.pathname, openOrFocus])

  return null
}

function App() {
  return (
    <MesAuthProvider>
      <MesMdiProvider>
      <MenuOpenScreenBridge />
      <ModuleWindowMenuBridge />
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/module/:moduleName" element={<ModuleBlankPage />} />
        <Route path="/modules/:moduleName" element={<ModuleFeaturesPage />} />
        <Route path="/screens/:screenId" element={<ScreenPlaceholderPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </MesMdiProvider>
    </MesAuthProvider>
  )
}

export default App
