import { Link } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import { useUserContext } from '../contexts/UserContext'

function HeaderDashboard({ title, to, icon, buttonText }) {
  const { currentColor } = useStateContext()
  const { user } = useUserContext()

  return (
    <>
      <div className="mb-4 flex justify-between items-start">
        <h1 className="font-bold text-2xl">{title}</h1>
        {(user?.role === 'superadmin' || user?.role === 'admin') &&
          <Link
            to={to}
            style={{ backgroundColor: currentColor }}
            className="rounded-full text-white px-4 py-2 flex items-center gap-1"
          >
            {icon}
            <div className="hidden sm:block">{buttonText}</div>
          </Link>
        }
      </div>
    </>
  )
}

export default HeaderDashboard
