import { NavLink } from "react-router-dom"
import { useStateContext } from '../contexts/ContextProvider'
import { linksParticipant } from "../data/dummy"

const AccountNavigate = () => {
	const { activeMenu, setActiveMenu, screenSize, currentColor } = useStateContext()
  
	const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg truncate text-white text-md m-2'
	const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg truncate text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-gray-100 m-2'

  return (
    <>
      {linksParticipant.map((link) => (
        <NavLink
          to={`${link.path}`}
          key={link.name}
          // onClick={handleCloseSidebar}
          style={({ isActive }) => ({
            backgroundColor: isActive ? currentColor : ''
          })}
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          {link.icon}
          <span className="capitalize">{link.name}</span>
        </NavLink>
      ))}
    </>
  )
}

export default AccountNavigate
