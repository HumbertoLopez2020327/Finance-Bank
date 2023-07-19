import { useState } from 'react';
import register  from '../api/ApiRegister';
import "../styles/Register.css"
import Swal from 'sweetalert2';

export const CreateUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('');

  const handleRegister = async(e) => {
    e.preventDefault();
    const token = await register(name, email, password, rol)
          if (token) {
            Swal.fire({
              icon: "success",
              title: "Por fin",
              text: "Te has registrado!",
              confirmButtonText: "Ok"
            }).then((r) => {
              if (r.isConfirmed) {
                localStorage.removeItem("token")
                window.location.replace = "/login";
              }else{
                localStorage.removeItem("token")
                window.location.replace = "/login";
              }

            })
          }
  };

  return (
    <div className="register-container">
    <div className="card">
      <form onSubmit={handleRegister}>
        <h2 className="card-title">Registro</h2>
        <div className="form-group">
          <label className="label">Username</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label className="label">Correo Electrónico</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label className="label">Contraseña</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label className="label">Rol</label>
          <input
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            type="text"
            className="input"
            required
          />
        </div>
        <button onClick={ (e) => handleRegister(e) } type="submit" className="button">
          Registrarse
        </button>
      </form>
    </div>
  </div>
  );
};

