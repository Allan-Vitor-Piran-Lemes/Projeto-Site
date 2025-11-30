// client/src/components/top-menu/index.tsx
import React from "react";
import { Button } from "primereact/button";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/hooks/use-auth";
import { Badge } from 'primereact/badge';
import { useCart } from "@/context/hooks/use-cart"; 
import './styles.css';

const TopMenu: React.FC = () => {
    const navigate = useNavigate();
    const { authenticated, handleLogout, authenticatedUser } = useAuth();
    const { cartCount } = useCart(); 

    const handleLogoutClick = () => {
        handleLogout();
        navigate("/"); 
    };

    const firstName = authenticatedUser?.displayName?.split(' ')[0] || 'Usuário';

    return (
        <header className="top-menu-header">
            
            {/* LOGO */}
            <h1 className="top-menu-logo">
                <Link to="/" className="top-menu-logo-link">Tabula</Link>
            </h1>

            {/* BUSCA */}
            <div className="top-menu-search-box">
                <input type="text" className="top-menu-search-input" placeholder="Buscar..." />
                <div className="top-menu-search-icon-container">
                    <i className="pi pi-search top-menu-search-icon" />
                </div>
            </div>

            {/* NAVEGAÇÃO DIREITA */}
            <nav className="top-menu-nav">
                
                {/* 1. Carrinho */}
                <div className="top-menu-cart-container mr-3">
                    <Button 
                        icon="pi pi-shopping-cart" 
                        className="p-button-rounded p-button-text top-menu-cart-button" 
                        onClick={() => navigate("/cart")} 
                        tooltip="Meu Carrinho"
                    />
                    {cartCount > 0 && ( 
                        <Badge value={cartCount} severity="danger" className="top-menu-cart-badge" />
                    )}
                </div>

                {/* 2. Ícone de Usuário */}
                <div className="top-menu-user-icon-container">
                    <i className="pi pi-user text-2xl"></i>
                    {authenticated && <span className="user-first-name">{firstName}</span>}
                </div>

                {/* 3. Ações (Entrar/Sair) */}
                {authenticated ? (
                    <div className="flex align-items-center">
                        <Button 
                            label="Sair"
                            icon="pi pi-sign-out" 
                            className="p-button-text p-button-sm text-white" 
                            onClick={handleLogoutClick} 
                        />
                    </div>
                ) : (
                    <div className="auth-buttons-container">
                        <Link to="/login" className="auth-btn-link">Entrar</Link>
                        <span className="divider">/</span>
                        <Link to="/register" className="auth-btn-link">Cadastrar-se</Link>
                    </div>
                )}

            </nav>
        </header>
    );
};

export default TopMenu;