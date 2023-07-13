import 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react';
import { transferencia } from '../api/ApiTransfer';
import Swal from "sweetalert2";

export const Transferencias = () => {
  const [tipo, setTipo] = useState('');
  const [fuente, setFuente] = useState('');
  const [destinatario, setDestinatario] = useState('');
  const [monto, setMonto] = useState(0);
  const [fecha, setFecha] = useState('');
  const [saldo, setSaldo] = useState(0);
  const [descripcion, setDescripcion] = useState('');

  const transfer = async(t)=>{
    t.preventDefault();
    const transferido = await transferencia(tipo, fuente, destinatario, monto, fecha, saldo, descripcion)
    if (transferido) {
      Swal.fire({
        icon: "success",
        title: "Transferencia exitosa",
        confirmButtonText: "Ok"
      })
    }
  }

  return (
    <>

    <form>

      <div className="container">
        <div className="row justify-content-center ">
          <div className="col-md-10">
  <div className="form-group row">

    <label className="col-sm-2 col-form-label">Tipo de Transferencia:</label>

    <div className="col-sm-10">

      <input value={ tipo } onChange={({target: { value }}) => setTipo( value )} type="text" className="form-control" id="inputEmail3" placeholder="Ejem. Débitos"/>

    </div>

  </div>

  <div className="form-group row">

    <label  className="col-sm-2 col-form-label">Numero de cuenta:</label>

    <div className="col-sm-10">

      <input value={ fuente } onChange={({target: { value }}) => setFuente( value )} type="text" className="form-control" id="inputPassword3" placeholder="Ejem. 1234567890"/>

    </div>

  </div>

  <div className="form-group row">

    <label className="col-sm-2 col-form-label">Destinatario:</label>

    <div className="col-sm-10">

      <input value={ destinatario } onChange={({target: { value }}) => setDestinatario( value )} type="text" className="form-control" id="inputPassword3" placeholder="Ejem. Persona1"/>

    </div>

  </div>

  <div className="form-group row">

    <label className="col-sm-2 col-form-label">Monto:</label>

    <div className="col-sm-10">

      <input value={ monto } onChange={({target: { value }}) => setMonto( value )} type="text" className="form-control" id="inputPassword3" placeholder="Q.00"/>

    </div>

  </div>

  <div className="form-group row">

    <label className="col-sm-2 col-form-label">Fecha Emitida:</label>

    <div className="col-sm-10">

      <input value={ fecha } onChange={({target: { value }}) => setFecha( value )} type="text" className="form-control" id="inputPassword3" placeholder="YY/MM/DD"/>

    </div>

  </div>
  <div className="form-group row">

    <label className="col-sm-2 col-form-label">Saldo:</label>

    <div className="col-sm-10">

      <input value={ saldo } onChange={({target: { value }}) => setSaldo( value )} type="text" className="form-control" id="inputPassword3" placeholder="Q0.00"/>

    </div>

  </div>
  <div className="form-group row">

    <label className="col-sm-2 col-form-label">Descripcion:</label>

    <div className="col-sm-10">

      <input value={ descripcion } onChange={({target: { value }}) => setDescripcion( value )} type="text" className="form-control" id="inputPassword3" placeholder="Descripcion"/>

    </div>

  </div>

  <div className="form-group row">

    <div className="col-sm-10">

      <button type="submit" className="btn btn-primary" onClick={(t) => transfer(t)}>Transferir</button>

    </div>
    </div>
  </div>
  </div>

  </div>

</form>

    </>
  )
}
