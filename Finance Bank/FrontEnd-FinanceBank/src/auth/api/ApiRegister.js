import axios from "axios";
import Swal from "sweetalert2";

const URL = "http://localhost:4009/api/"
export const register = async (nombre, apellido, dpi, tipoCuenta, email, password, rol,  saldo) => {
    try {
        const response = await axios.post(`${URL}create-cuenta`, { nombre, apellido, dpi, tipoCuenta, email, password, rol,  saldo})
        const token = response.data.token;
        localStorage.setItem("token", token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return token;
    } catch (err) {
        Swal.fire({
            icon: "error",
            title: "Algo salió mal :(",
            text: "No pudiste registrarte ",
        });
        console.log(err)
        console.log(err.response.data)
    }
}

export default register;