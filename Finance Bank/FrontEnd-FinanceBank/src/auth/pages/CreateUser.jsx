import { useState } from 'react';
import register from '../api/ApiRegister';
import "../styles/Register.css"
import Swal from 'sweetalert2';

export const CreateUser = () => {
  const [name, setName] = useState('');
  const [apellido, setApellido] = useState('')
  const [DPI, setDPI] = useState('')
  const [tipoCuenta, setTipoCuenta] = useState('')
  const [saldo, setSaldo] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    const token = await register(name, apellido, DPI, tipoCuenta, email, password, rol, saldo)
    if (token) {
      Swal.fire({
        icon: "success",
        title: "Por fin",
        text: "Te has registrado!",
        confirmButtonText: "Ok"
      }).then((r) => {
        if (r.isConfirmed) {
          localStorage.removeItem("token")
          window.location.href = "/login";
        } else {
          localStorage.removeItem("token")
          window.location.href = "/login";
        }
      })
    }
  };

  return (
    <div className="body">
      <div className='containerUser'>
        <h2>Crear Cuenta</h2>
        <form action="#" onSubmit={handleRegister}>
          <div className="user-details">
            <div className="input-box">
              <span className='details'>Nombre</span>
              <input
                type="text"
                placeholder='Ingrese el nombre'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-box">
              <span className='details'>Apellido</span>
              <input
                type="text"
                placeholder='Ingrese el apellido'
                required
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
            </div>
            <div className="input-box">
              <span className='details'>DPI</span>
              <input
                type="text"
                placeholder='Ingrese el DPI'
                required
                value={DPI}
                onChange={(e) => setDPI(e.target.value)}
              />
            </div>
            <div className="input-box">
              <span className='details'>Correo Electrónico</span>
              <input
                type="email"
                placeholder='Ingrese el email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-box">
              <span className='details'>Contraseña</span>
              <input
                type="password"
                placeholder='Ingresa la contraseña'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-box">
              <span className='details'>Tipo de Cuenta</span>
              <select name="Tipo de Cuenta" id=""
                value={ tipoCuenta }
                onChange={(e) => setTipoCuenta(e.target.value)}>
                <option value="">Seleccione un tipo de cuenta</option>
                <option value="Monetaria" >Monetaria</option>
                <option value="Ahorro">Ahorro</option>
                <option value="Corriente">Corriente</option>
              </select>
            </div>
            <div className="input-box">
              <span className='details'>Rol</span>
              <input
                type="text"
                placeholder='Ingresa tu nombre'
                required
                value={rol}
                onChange={(e) => setRol(e.target.value)}
              />
            </div>
            <div className="input-box">
              <span className='details'>Saldo Inicial</span>
              <input
                type="text"
                placeholder='Ingresa tu nombre'
                required
                value={saldo}
                onChange={(e) => setSaldo(e.target.value)}
              />
            </div>
            <div className='button'>
            <button onClick={(e) => handleRegister(e)} type="submit" className='button'>
              Registrar
            </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};