// client/src/components/top-menu/index.tsx
import React, { useState, useRef, useEffect } from "react";
import { Button } from "primereact/button";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/hooks/use-auth";
import { Badge } from 'primereact/badge';
import { useCart } from "@/context/hooks/use-cart"; 
import './styles.css';

const TopMenu: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { authenticated, handleLogout, authenticatedUser } = useAuth();
    const { cartCount } = useCart(); 
    
    const [showUserMenu, setShowUserMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleLogoutClick = () => {
        setShowUserMenu(false);
        handleLogout();
        navigate("/"); 
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowUserMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Pega o primeiro nome
    const firstName = authenticatedUser?.displayName?.split(' ')[0] || 'Usuário';

    return (
        <header className="top-menu-header">
            {/* LOGO */}
            <h1 className="top-menu-logo">
                <Link to="/" className="top-menu-logo-link">Tabula</Link>
            </h1>

            {/* NAVEGAÇÃO DIREITA */}
            <nav className="top-menu-nav">
                
                {/* Carrinho */}
                <div className="top-menu-cart-container mr-4">
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

                {/* LÓGICA: Logado ou Não */}
                {authenticated ? (
                    <div className="user-menu-container" ref={menuRef}>
                        <div 
                            className="user-profile-trigger"
                            onClick={() => setShowUserMenu(!showUserMenu)}
                        >
                            <i className="pi pi-user text-xl"></i>
                            <span className="user-name">{firstName}</span>
                            {/* Flecha alinhada à direita */}
                            <i className={`pi pi-angle-${showUserMenu ? 'up' : 'down'} ml-1 text-xs`}></i>
                        </div>

                        {showUserMenu && (
                            <div className="user-dropdown-menu">
                                <div className="dropdown-header">
                                    Olá, <strong>{firstName}</strong>
                                </div>
                                <ul className="dropdown-list">
                                    <li onClick={() => { navigate("/my-orders"); setShowUserMenu(false); }}>
                                        <i className="pi pi-box"></i> Meus Pedidos
                                    </li>
                                    <li onClick={handleLogoutClick} className="logout-item">
                                        <i className="pi pi-sign-out"></i> Sair da Conta
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="auth-buttons-container">
                        <Link to="/login" state={{ from: location }} className="auth-btn-link">Entrar</Link>
                        <span className="divider">/</span>
                        <Link to="/register" state={{ from: location }} className="auth-btn-link">Cadastrar-se</Link>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default TopMenu;