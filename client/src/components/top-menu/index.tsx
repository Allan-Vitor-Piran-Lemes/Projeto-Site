// client/src/components/top-menu/index.tsx
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/hooks/use-auth";
import { InputSwitch } from "primereact/inputswitch";
import { Badge } from 'primereact/badge';
import { Avatar } from "primereact/avatar";
import { useCart } from "@/context/hooks/use-cart"; 

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
        <div style={{ paddingBottom: '70px' }}>
            <header 
                className="flex justify-content-between align-items-center" 
                style={{
                    // ESTILO CORRIGIDO (Inline)
                    backgroundColor: 'rgb(90, 0, 0)', 
                    padding: '1.2% 6%',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                }}
            >
                
                {/* LOGO (Tabula) */}
                <h1 className="logo ml-5">
                    <Link to="/" style={{ color: 'whitesmoke', fontSize: '2.3rem', textDecoration: 'none' }}>Tabula</Link>
                </h1>

                {/* SEARCH BOX */}
                <div className="search-box">
                    <input type="text" className="search-input" placeholder="Search..." />
                    <div className="search-icon flex align-items-center justify-content-center px-2">
                        <i className="pi pi-search text-2xl" style={{ color: '#888' }} />
                    </div>
                </div>

                {/* NAVBAR NAV (Carrinho, Login/Cadastro, Usuário) */}
                <nav className="flex align-items-center gap-4 text-white text-2xl">
                    {/* CARRINHO (APENAS ÍCONE) */}
                    <div className="relative">
                        <Button 
                            icon="pi pi-shopping-cart" 
                            className="p-button-rounded p-button-text" 
                            style={{ color: 'whitesmoke' }}
                            onClick={() => navigate("/cart")} 
                            tooltip="Cart"
                        />
                        {cartCount > 0 && ( 
                            <Badge value={cartCount} severity="danger" className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2" />
                        )}
                    </div>

                    {/* LOGIN / CADASTRO */}
                    {authenticated ? (
                        <div className="flex align-items-center gap-2">
                            <span className="text-sm font-bold">{authenticatedUser?.displayName || "Profile"}</span> 
                            <Avatar 
                                image="https://api.dicebear.com/9.x/bottts-neutral/svg?seed=User" 
                                shape="circle" 
                                className="cursor-pointer"
                                style={{ width: '2.5rem', height: '2.5rem' }}
                            />
                            <Button 
                                icon="pi pi-sign-out" 
                                className="p-button-text" 
                                style={{ color: 'whitesmoke' }}
                                onClick={handleLogoutClick} 
                                tooltip="Sign Out" 
                            />
                        </div>
                    ) : (
                        <div className="flex flex-column text-xs" style={{ whiteSpace: 'nowrap' }}>
                            <Link to="/login" style={{ color: 'whitesmoke', textDecoration: 'none', fontWeight: 'bold' }}>Sign In Or</Link>
                            <Link to="/register" style={{ color: 'whitesmoke', textDecoration: 'underline', fontWeight: 'bold' }}>Register</Link>
                        </div>
                    )}
                    
                    {/* Modo Noturno (Manter) */}
                    <div className="flex align-items-center gap-1 ml-3">
                        <i className={`pi pi-sun ${darkMode ? "text-gray-400" : "text-yellow-500"}`} />
                        <InputSwitch checked={darkMode} onChange={(e) => setDarkMode(e.value ?? false)} />
                        <i className={`pi pi-moon ${darkMode ? "text-blue-300" : "text-gray-400"}`} />
                    </div>

                </nav>
            </header>
        </div>
    );
};

export default TopMenu;