import { Outlet } from 'react-router-dom'

import { FiSettings } from 'react-icons/fi'

import { Navbar, Sidebar, ThemeSettings } from './components/admin'
import { useStateContext } from './contexts/ContextProvider'

function AdminLayout() {
  const {
    activeMenu,
    themeSettings,
    setThemeSettings,
    currentColor,
    currentMode
  } = useStateContext()

  return (
    <>
      <div className={currentMode === 'Dark' ? 'dark' : ''}>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '10' }}>
            <button
              type="button"
              className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white"
              style={{ background: currentColor }}
              onClick={() => setThemeSettings(true)}
            >
              <FiSettings />
            </button>
          </div>
          <div
            className={`fixed sidebar overflow-hidden dark:bg-secondary-dark-bg bg-white transition-all ease-in-out duration-500${
              activeMenu ? ' w-72' : ' w-0'
            }`}
          >
            <Sidebar />
          </div>
          <div
            className={`dark:bg-main-dark-bg min-h-screen w-full transition-all ease-in-out duration-500${
              activeMenu ? ' md:ml-72' : ''
            }`}
          >
            <div className="fixed md:relative dark:bg-main-dark-bg w-full">
              <Navbar />
            </div>

            {themeSettings && <ThemeSettings />}
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminLayout
