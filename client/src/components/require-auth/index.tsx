import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/hooks/use-auth";
// Se não tiver um spinner do primereact, pode usar um texto simples
// import { ProgressSpinner } from 'primereact/progressspinner';

export const RequireAuth = () => {
    // Assumindo que você adicionou 'loading' no AuthContext conforme instruído anteriormente
    // Se não adicionou, o 'authenticated' começa como false e causa o redirect
    const { authenticated, authenticatedUser } = useAuth(); 
    const location = useLocation();

    // Verificação de segurança: Se tem usuário no localStorage mas o estado ainda é false,
    // esperamos um pouco (loading manual se não tiver no context)
    const hasToken = localStorage.getItem("token");

    if (!authenticated && hasToken) {
        // Ainda está carregando o contexto...
        return <div style={{display:'flex', justifyContent:'center', marginTop:'50px'}}>Carregando...</div>;
    }

    if (!authenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
};