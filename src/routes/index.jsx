import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../pages/Login/Login';
import { Cadastro } from '../pages/Cadastro/Cadastro';
import { Home } from '../pages/Home/Home';
import { PrivateRoute } from './PrivateRoute';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={ <PrivateRoute> <Home /> </PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}