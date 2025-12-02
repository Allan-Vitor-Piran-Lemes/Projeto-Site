import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/hooks/use-auth";

export const RequireAuth = () => {
    //Verifica se o usuário está autenticado no contexto global
    const { authenticated } = useAuth(); 
    const location = useLocation();
    //Busca o token no Local Storage.
    const hasToken = localStorage.getItem("token");

    if (!authenticated && hasToken) {
        return <div style={{display:'flex', justifyContent:'center', marginTop:'50px'}}>Carregando...</div>;
    }

    if (!authenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
};