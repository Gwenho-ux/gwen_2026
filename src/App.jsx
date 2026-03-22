import { useEffect } from 'react'
import { createBrowserRouter, RouterProvider, Outlet, useLocation } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import UXDesignPage from './pages/UXDesignPage'
import CreativityPage from './pages/CreativityPage'
import AIPage from './pages/AIPage'
import PrototypingPage from './pages/PrototypingPage'
import LeadershipPage from './pages/LeadershipPage'
import CategoryLayout from './layouts/CategoryLayout'
import CaseStudyPage from './pages/CaseStudyPage'
import { useSoundEffects } from './hooks/useSoundEffects'

/**
 * Handles two scroll behaviours on every route change:
 * - Hash present  → smoothly scroll to the matching element
 * - No hash       → instantly jump to top (no scroll animation across pages)
 */
const ScrollHandler = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const tryScroll = (attempts = 0) => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        } else if (attempts < 10) {
          setTimeout(() => tryScroll(attempts + 1), 80)
        }
      }
      tryScroll()
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [pathname, hash])

  return null
}

const RootLayout = () => (
  <>
    <ScrollHandler />
    <Outlet />
  </>
)

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <LandingPage /> },
      {
        path: '/ux-design',
        element: <CategoryLayout><UXDesignPage /></CategoryLayout>,
      },
      {
        path: '/creativity',
        element: <CategoryLayout><CreativityPage /></CategoryLayout>,
      },
      {
        path: '/ai',
        element: <CategoryLayout><AIPage /></CategoryLayout>,
      },
      {
        path: '/prototyping',
        element: <CategoryLayout><PrototypingPage /></CategoryLayout>,
      },
      {
        path: '/leadership',
        element: <CategoryLayout><LeadershipPage /></CategoryLayout>,
      },
      {
        path: '/case/:id',
        element: <CaseStudyPage />,
      },
    ],
  },
])

const AppInner = () => {
  useSoundEffects()
  return <RouterProvider router={router} />
}

const App = () => <AppInner />

export default App
