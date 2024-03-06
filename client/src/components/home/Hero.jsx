import gbr1 from '/src/assets/image 3.png'

function Hero() {
  return (
    <section className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-28 md:mt-0 grow min-h-screen items-center justify-around">
      <div className="items-center justify-around py-8 rounded-2xl">
        <h1 className='text-3xl mb-4 font-semibold'>SITKOM</h1>
        <p className="mb-1">
          SITKOM (Sistem Informasi Training Kompetensi) di Dinas Tenaga Kerja Kota
          Surakarta merupakan website yang membantu masyarakat Surakarta untuk
          mendapatkan informasi pelatihan, mendata masyarakat yang akan bekerja,
          siapa saja yang akan bekerja, dan menyediakan fitur untuk pengaduan
          kerja serta serta Pendaftaran dan Informasi Hasil Pelatihan/ kursus
        </p>
        <p>#DisnakerSurakarta</p>

        <button className="bg-primary text-white mt-2 hover:shadow-md" href="Login">
          Daftar Pelatihan Kerja
        </button>
      </div>
      <div className="mx-auto">
        <img
          src={gbr1}
          alt="Hero image"
          className=""
          width={600}
        ></img>
      </div>
    </section>
  )
}

export default Hero
