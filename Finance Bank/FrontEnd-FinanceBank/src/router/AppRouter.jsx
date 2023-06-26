import { Routes, Route, Navigate } from 'react-router-dom';
import { BankRoutes } from '../Bank';
import { userAuthenticated } from "../auth/api/Autentication"
import { LoginPage } from "../auth/pages/LoginPage"
import { CreateUser } from '../auth/pages/CreateUser';
import { HomePage } from '../Bank/components/HomePage';


export const AppRouter = () => {
  return (
    <>

      <Routes>

        <Route path="/" element={userAuthenticated() ? (<HomePage/>) : (<Navigate to="/login"/>)} />

        <Route path="/login" element={!userAuthenticated() ? (<LoginPage/>) : (<Navigate to="/"/>)} />
        <Route path="/create-user" element={<CreateUser/>}/>
        <Route path="login" element={<LoginPage />} />
        <Route path="/*" element={<BankRoutes />} />

      </Routes>
    </>
  )
}
