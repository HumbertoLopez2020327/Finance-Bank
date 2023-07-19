export const HomePage =() =>{
    const logout = ()=>{
        localStorage.removeItem("token")
        window.location.href = "/login"
    }
    return(
        <>
        <h1>Pagina Principal</h1>
        <button onClick={ logout }>logout</button>
        </>
    )
}