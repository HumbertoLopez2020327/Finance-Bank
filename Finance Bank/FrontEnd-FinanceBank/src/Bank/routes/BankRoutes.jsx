import { Navigate, Route, Routes } from 'react-router-dom';
import { NavBar } from '../../ui/components';
import { Cuenta, Historial, Transferencias} from '../pages';

import {CreateUser } from '../../auth/pages/CreateUser';
import {LoginPage } from '../../auth/pages/LoginPage';



export const BankRoutes = () => {
  return (
    <>
        <NavBar />
        <Routes>
            
            <Route path="cuenta" element={<Cuenta />}/>
            <Route path="historial" element={<Historial />}/>
            <Route path="transferencias" element={<Transferencias />}/>


            <Route path="login" element={<LoginPage />}/>
            <Route path="createUSer" element={<CreateUser />}/>

            <Route path="/" element={<Navigate to="/historial"/>}/>
        </Routes>
        
    </>
  )
}