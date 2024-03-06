import logo from '/src/assets/logofull.png';

export default function App() {
  return (
    <div className="hero d-flex justify-content-center mt-5">
      <Container>
         <Card.Body className='mt-5'>
        <iframe style = {{width: '100%', height: '400px'}} src={logo} ></iframe> 
      </Card.Body>
      </Container>
    </div>
  );
}