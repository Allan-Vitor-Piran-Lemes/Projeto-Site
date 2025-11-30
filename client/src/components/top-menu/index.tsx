// client/src/components/top-menu/index.tsx
import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/hooks/use-auth";
import { InputSwitch } from "primereact/inputswitch";
import { Badge } from 'primereact/badge';
import { Avatar } from "primereact/avatar";
import { useCart } from "@/context/hooks/use-cart"; 
import './styles.css'; // <--- Importando o novo CSS

const TopMenu: React.FC = () => {
    const navigate = useNavigate();
    
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        return localStorage.getItem("theme") === "dark";
    });
    const { authenticated, handleLogout, authenticatedUser } = useAuth();
    const { cartCount } = useCart(); 

    useEffect(() => {
        const themeLink = document.getElementById("theme-link") as HTMLLinkElement;
        themeLink.href = darkMode
            ? "https://unpkg.com/primereact/resources/themes/lara-dark-blue/theme.css"
            : "https://unpkg.com/primereact/resources/themes/lara-light-blue/theme.css";
        localStorage.setItem("theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    const handleLogoutClick = () => {
        handleLogout();
        navigate("/login");
    };

    return (
        <header className="top-menu-header">
            
            {/* LOGO (Tabula) */}
            <h1 className="top-menu-logo">
                <Link to="/" className="top-menu-logo-link">Tabula</Link>
            </h1>

            {/* SEARCH BOX */}
            <div className="top-menu-search-box">
                <input type="text" className="top-menu-search-input" placeholder="Search..." />
                <div className="top-menu-search-icon-container">
                    <i className="pi pi-search top-menu-search-icon" />
                </div>
            </div>

            {/* NAVBAR NAV */}
            <nav className="top-menu-nav">
                
                {/* CARRINHO */}
                <div className="top-menu-cart-container">
                    <Button 
                        icon="pi pi-shopping-cart" 
                        className="p-button-rounded p-button-text top-menu-cart-button" 
                        onClick={() => navigate("/cart")} 
                        tooltip="Cart"
                    />
                    {cartCount > 0 && ( 
                        <Badge value={cartCount} severity="danger" className="top-menu-cart-badge" />
                    )}
                </div>

                {/* LOGIN / CADASTRO */}
                {authenticated ? (
                    <div className="top-menu-user-container">
                        <span className="top-menu-user-name">
                            {authenticatedUser?.displayName}
                        </span> 
                        <Avatar 
                            image="https://api.dicebear.com/9.x/bottts-neutral/svg?seed=User" 
                            shape="circle" 
                            className="top-menu-avatar"
                        />
                        <Button 
                            icon="pi pi-sign-out" 
                            className="p-button-text top-menu-logout-button" 
                            onClick={handleLogoutClick} 
                            tooltip="Sign Out" 
                        />
                    </div>
                ) : (
                    <div className="top-menu-auth-links">
                        <Link to="/login" className="top-menu-login-link">Login</Link>
                        <Link to="/register" className="top-menu-register-link">Register</Link>
                    </div>
                )}
                
                {/* Modo Noturno */}
                <div className="top-menu-theme-switch">
                    <InputSwitch checked={darkMode} onChange={(e) => setDarkMode(e.value ?? false)} />
                </div>

            </nav>
        </header>
    );
};

export default TopMenu;