import { YellowCardForm } from '../components'

import poster from '../assets/daftar.png'

function YellowCardPage() {
  return (
    <div className="pt-24 pb-10 relative">
      <div className='fixed right-0 hidden sm:block' style={{ zIndex: '-1' }}>
        <img src={poster} className='right-0' />
      </div>
      <div className='sm:w-[500px] sm:ml-10 md:ml-28 lg:ml-0 relative'>
        <YellowCardForm/>
      </div>
    </div>
  )
}

export default YellowCardPage
