import axios from "axios"
import Swal from "sweetalert2"
const URL = "http://localhost:4009/api/"
export const transferencia = async(
    TipoDeTransaccion, noCuentaFuente, noCuentaDestinatario, monto, date, saldo, descripcion
                                    )=>{
    try {
        const response = await axios.post(`${URL}Transferencia`, {TipoDeTransaccion, noCuentaFuente, noCuentaDestinatario, monto, date, saldo, descripcion})
        return response;
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "no se pudo transferir",
            });
            console.log(error);
    }
}