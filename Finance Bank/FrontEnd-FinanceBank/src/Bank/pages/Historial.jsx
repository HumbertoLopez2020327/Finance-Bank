import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

export const Historial = () => {
  const [transacciones, setTransacciones] = useState([]);

  useEffect(() => {
    const obtenerHistorial = async () => {
      try {
        const response = await axios.get('http://localhost:4009/api/historial'); 
        const data = response.data.transaccion;
        setTransacciones(data);
      } catch (error) {
        console.error('Error al obtener el historial:', error);
      }
    };

    obtenerHistorial();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1>Historial</h1>
          <ul className="list-group">
            {transacciones.map((transaccion) => (
              <li key={transaccion._id} className="list-group-item">
                {/* Mostrar detalles de la transacción */}
                Fuente: {transaccion.noCuentaFuente}, Destinatario: {transaccion.noCuentaDestinatario}, Monto: {transaccion.monto}, Fecha: {transaccion.date}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};