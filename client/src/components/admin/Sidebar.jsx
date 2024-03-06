import { Link, NavLink } from 'react-router-dom'
import { MdOutlineCancel } from 'react-icons/md'
import { useStateContext } from '../../contexts/ContextProvider'
import { useUserContext } from '../../contexts/UserContext'
import { linksSuperadmin, linksAdmin, linksTrainer } from '../../data/dummy'
import { NavButton } from '../'
import logoDisnaker from '../../assets/disnaker.png'

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize, currentColor } =
    useStateContext()
  const { user } = useUserContext()
  let links = []

  const handleCloseSidebar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false)
    }
  }

  if (user?.role === 'superadmin') {
    links = linksSuperadmin
  } else if (user?.role === 'admin') {
    links = linksAdmin
  } else if (user?.role === 'trainer') {
    links = linksTrainer
  }

  const activeLink =
    'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg truncate text-white text-md m-2'
  const normalLink =
    'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg truncate text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-gray-100 m-2'

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      <div className="flex justify-between items-center bg-white p-2 h-16">
        <Link
          to="/"
          onClick={() => handleCloseSidebar}
          className="dark:text-white text-slate-900 w-32"
        >
          <img alt="Logo disnaker" src={logoDisnaker} />
        </Link>
        <NavButton
          title="Close"
          customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
          color={currentColor}
          icon={<MdOutlineCancel />}
        />
      </div>
      <div className="mt-10">
        {links.map((item) => (
          <div key={item.title}>
            <p className="text-gray-400 m-3 mt-4 uppercase">{item.title}</p>
            {item.links.map((link) => (
              <NavLink
                to={`/admin${link.path}`}
                key={link.name}
                onClick={handleCloseSidebar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : ''
                })}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                {link.icon}
                <span className="capitalize">{link.name}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
