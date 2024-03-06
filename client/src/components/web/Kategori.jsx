import { useState } from 'react';
// import Button from 'react-bootstrap/ButtonGroup';
// import ToggleButton from 'react-bootstrap/ToggleButton';

function Kategori() {
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('1');

  const radios = [
    { name: 'Semua', value: '1' },
    { name: 'Sales Training', value: '2' },
    { name: 'On the job training', value: '3' },
    { name: 'Administrasi Perkantoran', value: '4' },
    { name: 'Desain Grafis', value: '5' },
    { name: 'IT Support', value: '6' },
    { name: 'Digital Marketing', value: '7' },
    { name: 'Multimedia', value: '8' },
  ];

  return (
    <div className='container mt-4'>
    {radios.map((radio, idx) => (
        <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            className="mx-2"
            type="radio"
            size='sm'
            variant={idx % 2 ? 'outline-info' : 'outline-info'}
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}>
            {radio.name}
        </ToggleButton>
    ))}
    </div>
  );
}

export default Kategori;

// const Kategori = () => {
//     return(
//         <div className="container">
//             <div className="row">
//                 <div className="col-md-12">

//                 </div>
//             </div>
//         </div>       
//     )
// }