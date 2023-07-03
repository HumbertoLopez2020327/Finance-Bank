import 'bootstrap/dist/css/bootstrap. css'
export const Transferencias = () => {
  return (
    <>

    <form>

      <div className="container">
        <div className="row justify-content-center ">
          <div className="col-md-10">
  <div className="form-group row">

    <label for="inputEmail3" class="col-sm-2 col-form-label">Tipo de Transferencia:</label>

    <div className="col-sm-10">

      <input type="email" class="form-control" id="inputEmail3" placeholder="Ejem. Débitos"/>

    </div>

  </div>

  <div className="form-group row">

    <label for="inputPassword3" class="col-sm-2 col-form-label">Numero de cuenta:</label>

    <div className="col-sm-10">

      <input type="password" class="form-control" id="inputPassword3" placeholder="Ejem. 1234567890"/>

    </div>

  </div>

  <div className="form-group row">

    <label for="inputPassword3" class="col-sm-2 col-form-label">Destinatario:</label>

    <div className="col-sm-10">

      <input type="password" class="form-control" id="inputPassword3" placeholder="Ejem. Persona1"/>

    </div>

  </div>

  <div className="form-group row">

    <label for="inputPassword3" class="col-sm-2 col-form-label">Monto:</label>

    <div className="col-sm-10">

      <input type="password" class="form-control" id="inputPassword3" placeholder="Q.00"/>

    </div>

  </div>

  <div className="form-group row">

    <label for="inputPassword3" class="col-sm-2 col-form-label">Fecha Emitida:</label>

    <div className="col-sm-10">

      <input type="password" class="form-control" id="inputPassword3" placeholder="YY/MM/DD"/>

    </div>

  </div>

  <div className="form-group row">

    <div className="col-sm-10">

      <button type="submit" class="btn btn-primary">Transferir</button>

    </div>
    </div>
  </div>
  </div>

  </div>

</form>

    </>
  )
}
