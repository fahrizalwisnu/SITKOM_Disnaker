import { useEffect } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'

import { useStateContext } from '../../contexts/ContextProvider'
import { NavButton } from '../'
import DropdownUser from '../DropdownUser'

const Navbar = () => {
  const {
    activeMenu,
    setActiveMenu,
    screenSize,
    setScreenSize,
    currentColor
  } = useStateContext()

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth)

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    screenSize <= 900 ? setActiveMenu(false) : setActiveMenu(true)
  }, [screenSize])

  return (
    <div className="flex justify-between p-2 md:mx-4 relative bg-white rounded-b-lg navbar">
			{!activeMenu ? (
				<NavButton
					title="Menu"
					customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
					color={currentColor}
					icon={<AiOutlineMenu />}
				/>
			) : (
				<div></div>
			)}
      <DropdownUser/>
    </div>
  )
}

export default Navbar
