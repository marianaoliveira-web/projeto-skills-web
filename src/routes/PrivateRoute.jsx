import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }) {
    const userStorage = localStorage.getItem('@app:user');
    return userStorage ? children : <Navigate to="/" replace />;
}