// import InputGroup from 'react-bootstrap/InputGroup';
// import Form from 'react-bootstrap/Form';

const Heros = () => {
    return(
        <section className="home">
            <div className="container pt-5 "> 
            <h2 className="fw-bold pt-4 text-light">Cari Pelatihan Kerja yang Anda Inginkan</h2>
            <p className="text-light">Temukan Pelatihan Kerja dan Akses dengan mudah</p>
            <div className="row">
                <div className="col-sm-7">
                    <form className="pt-2">
                        <input
                        type="search"
                        placeholder="Search"
                        />
                        <button id="inputGroup-sizing-default" className="bg-info text-light">
                        Cari
                        </button>
                    </form>
                </div>
            </div>
        </div>
        </section>
    )
}

export default Heros;