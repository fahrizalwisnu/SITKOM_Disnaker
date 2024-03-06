import { Tooltip } from 'react-tooltip'

const NavButton = ({ title, customFunc, icon, color }) => (
  <>
    <button
      type="button"
      onClick={customFunc}
      style={{ color }}
      data-tooltip-id={title}
      data-tooltip-content={title}
      className="relative text-xl rounded-full p-3 hover:bg-gray-100"
    >
      {icon}
    </button>
    <Tooltip id={title} data-tooltip-place="bottom" />
  </>
)

export default NavButton