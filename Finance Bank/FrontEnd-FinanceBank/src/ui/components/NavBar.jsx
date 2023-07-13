import { Link, NavLink, useNavigate } from 'react-router-dom';
import '/src/ui/styles/NavBar.css'


export const NavBar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login', {
            replace: true
        });
    }

    const onRegister = () => {
        navigate('/createUser', {
            replace: true
        });
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className='navbar-logo'>
                <Link to=''>
                    <img src="./src/img/Bank.jpg" alt="" className='imagen' />
                </Link>
            </div>
            {/*<Link 
                className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
                to="/cuenta"
            >
                Cuenta
            </Link>*/}
            <Link 
    className={`nav-item nav-link ${window.location.pathname === '/cuenta' ? 'active' : ''}`}
    to="/cuenta"
>
    Cuenta
</Link>


            <div className="navbar-collapse">
                <div className="navbar-nav">

                    {/*<NavLink 
                        className={ ({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
                        to="/historial"
                    >
                        Historial
                    </NavLink>

                    <NavLink 
                        className={ ({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
                        to="/transferencias"
                    >
                        Transferencias
                    </NavLink>*/}
                    <NavLink 
    className={`nav-item nav-link ${window.location.pathname === '/historial' ? 'active' : ''}`}
    to="/historial"
>
    Historial
</NavLink>

<NavLink 
    className={`nav-item nav-link ${window.location.pathname === '/transferencias' ? 'active' : ''}`}
    to="/transferencias"
>
    Transferencias
</NavLink>
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto">
                    
                    <button 
                        className="nav-item nav-link btn" 
                        onClick={ handleLogout }
                    >
                        Login
                    </button>
                    <button
                        className='nav-item nav-link btn'
                        onClick={onRegister}
                    >
                        Register
                    </button>
                </ul>
            </div>
        </nav>
    )
}