import axios from "axios";
import Swal from "sweetalert2";

const URL = "http://localhost:4009/api/"
export const register = async(name, email, password, rol) => {
    try{
        const response = await axios.post(`${URL}create-user`, {name: name, email: email, password: password, rol})
        const token = response.data.token;
        localStorage.setItem("token", token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return token;
    }catch(err){
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