import { useState } from 'react';
import logo from "/src/assets/tekstil.png";
import logo1 from "/src/assets/otomotif.png";
import logo2 from "/src/assets/masak.png";
import logo3 from "/src/assets/bahasa.png";


const Dokter = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return(
    <>
    <div className='container mt-4'>
      <div className='row'>
        <div className='col-sm-12'>
          <h4 className='fw-bold'>Jenis Pelatihan Kerja Disnaker Solo</h4>
        </div>
      </div>
    </div>
    <div className='mt-2'>
      <div className='row'>
        <div className='col-lg-3 col-md-6 col-sm-12 mb-4 d-flex justify-content-center'>
          <Card border="light" className='bayangan kartu' style={{ width: '16rem' }}>
            <Card.Img className='p-2' variant="top" src={logo} style={{ borderRadius: '16px' }}/>
            <Card.Body>
              <div className='row'>
                <div className='col-12'>
                <small className='text-info fw-bold'><i className="fa-solid fa-stethoscope me-2"></i>Disnaker Surakarta</small>
                </div>
              </div>
              <Card.Title className='fw-bold'></Card.Title>
              <small className='text-muted'><i className="fa-solid fa-location-dot me-2"></i>Pelatihan Kerja di bidang Tekstil.</small>
              <Button className='text-light col-12 mt-2' size='sm' href="https://www.kominfo.go.id/" onClick={handleShow}>Selengkapnya</Button>
            </Card.Body>
          </Card>
        </div>

        <div className='col-lg-3 col-md-6 col-sm-12 mb-4 d-flex justify-content-center'>
          <Card border="light" className='bayangan kartu' style={{ width: '16rem' }}>
            <Card.Img className='p-2' variant="top" src={logo1} style={{ borderRadius: '16px' }}/>
            <Card.Body>
              <div className='row'>
                <div className='col-12'>
                <small className='text-info fw-bold'><i className="fa-solid fa-stethoscope me-2"></i>Disnaker Surakarta</small>
                </div>
              </div>
              <Card.Title className='fw-bold'></Card.Title>
              <small className='text-muted'><i className="fa-solid fa-location-dot me-2"></i>Pelatihan Kerja di bidang Otomotif</small>
              <Button className='text-light col-12 mt-2' size='sm' href="https://www.kominfo.go.id/" onClick={handleShow}>Selengkapnya</Button>
            </Card.Body>
          </Card>
        </div>

        <div className='col-lg-3 col-md-6 col-sm-12 mb-4 d-flex justify-content-center'>
          <Card border="light" className='bayangan kartu' style={{ width: '16rem' }}>
            <Card.Img className='p-2' variant="top" src={logo2} style={{ borderRadius: '16px' }}/>
            <Card.Body>
              <div className='row'>
                <div className='col-12'>
                <small className='text-info fw-bold'><i className="fa-solid fa-stethoscope me-2"></i>Disnaker Surakarta</small>
                </div>
              </div>
              <Card.Title className='fw-bold'></Card.Title>
              <small className='text-muted'><i className="fa-solid fa-location-dot me-2"></i>Pelatihan Kerja di bidang Memasak</small>
              <Button className='text-light col-12 mt-2' size='sm' href="https://www.kominfo.go.id/" onClick={handleShow}>Selengkapnya</Button>
            </Card.Body>
          </Card>
        </div>

       <div className='col-lg-3 col-md-6 col-sm-12 mb-4 d-flex justify-content-center'>
          <Card border="light" className='bayangan kartu' style={{ width: '16rem' }}>
            <Card.Img className='p-2' variant="top" src={logo3} style={{ borderRadius: '16px' }}/>
            <Card.Body>
              <div className='row'>
                <div className='col-12'>
                <small className='text-info fw-bold'><i className="fa-solid fa-stethoscope me-2"></i>Disnaker Surakarta</small>
                </div>
              </div>
              <Card.Title className='fw-bold'></Card.Title>
              <small className='text-muted'><i className="fa-solid fa-location-dot me-2"></i>Pelatihan Kerja di bidang Bahasa</small>
              <Button className='text-light col-12 mt-2' size='sm' href="https://www.kominfo.go.id/" onClick={handleShow}>Selengkapnya</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
    </>
  )
}

export default Dokter;