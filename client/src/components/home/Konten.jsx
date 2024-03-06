import janji from '/src/assets/icon/janji.png'
import dengar from '/src/Assets/icon/dengar.png'
import baca from '/src/Assets/icon/baca.png'

function Konten() {
  return (
    <div className="grid-flow-col md:grid grid-cols-3 gap-8 bg-primary rounded-2xl items-center px-12 sm:px-24 md:px-4 p-8 lg:mb-28">
      <div className="flex items-center justify-start md:justify-center gap-4">
        <img src={janji} className="" width={80}></img>
        <h4 className="text-2xl font-bold text-white">Profil</h4>
      </div>
      <div className="flex mt-4 md:mt-0 items-center justify-start md:justify-centerjustify-center gap-4">
        <img src={dengar} className="" width={80}></img>
        <h4 className="text-2xl font-bold text-white">Pengumuman</h4>
      </div>
      <div className="flex mt-4 md:mt-0 items-center justify-start md:justify-centerjustify-center gap-4">
        <img src={baca} className="" width={80}></img>
        <h4 className="text-2xl font-bold text-white">Tentang Kami</h4>
      </div>
    </div>
  )
}

export default Konten
