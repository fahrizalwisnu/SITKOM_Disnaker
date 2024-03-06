import { Oval } from 'react-loader-spinner'
import { useStateContext } from '../contexts/ContextProvider'


function OvalLoader() {
  const { currentColor } = useStateContext()

  return (
    <Oval
      visible={true}
      height="80"
      width="80"
      color={currentColor}
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  )
}

export default OvalLoader
