// client/src/components/layout/index.tsx
import { Outlet, Link as RouterLink, useNavigate } from "react-router-dom";
import TopMenu from "@/components/top-menu";
import React, { useEffect, useState } from "react"; 
import CategoryService from "@/services/category-service"; 
import type { ICategory } from "@/commons/types"; 

// COMPONENTE: Menu de Categorias (Underbar)
const Underbar: React.FC = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(() => {
        const loadCategories = async () => {
            const response = await CategoryService.findAll();
            if (response.success && Array.isArray(response.data)) {
                setCategories(response.data as ICategory[]);
            }
        };
        loadCategories();
    }, []);

    // LISTA FIXA DE CATEGORIAS (Garante que os links apareçam mesmo se a API falhar)
    const fixedCategories = [
        { name: 'Todos os Produtos', key: 'all' },
        { name: 'Guerra', key: 'guerra' },
        { name: 'Estratégia', key: 'estrategia' },
        { name: 'Cooperativo', key: 'cooperativo' },
        { name: 'Cartas', key: 'cartas' },
        { name: 'Clássicos', key: 'classicos' },
    ];

    return (
        <nav 
            style={{ 
                backgroundColor: 'rgb(126, 0, 0)', 
                padding: '0.5rem 0',
                position: 'fixed',
                // AJUSTE CRÍTICO: 80px garante que fique abaixo do TopMenu (que tem ~75px)
                top: '80px', 
                left: 0,
                width: '100%',
                zIndex: 990, // Fica logo abaixo do TopMenu (que tem 1000)
                display: 'flex',
                justifyContent: 'center',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
            }}
        >
            <ul className="flex justify-content-center gap-4 flex-wrap" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {/* Links das categorias fixas */}
                {fixedCategories.map((category) => (
                    <li key={category.key}>
                        <a 
                            href="#" 
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(`/products-list?category=${category.key}`); 
                            }}
                            className="p-2 no-underline text-white font-bold border-round"
                            style={{ fontSize: '1rem', display: 'block', transition: '0.3s' }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#5c0000'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            {category.name}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};


// COMPONENTE: Rodapé (Footer)
const Footer: React.FC = () => {
    const socialLinks = [
        { name: 'whatsapp', icon: 'pi pi-whatsapp', url: 'https://wa.me/559999999999' },
        { name: 'instagram', icon: 'pi pi-instagram', url: 'https://instagram.com/tabula' },
        { name: 'facebook', icon: 'pi pi-facebook', url: 'https://facebook.com/tabula' } 
    ];

    const privacyLinkStyle = { 
        color: '#428bca', 
        textDecoration: 'underline', 
        fontWeight: 'bold', 
        cursor: 'pointer' 
    };

    return (
        <footer className="mt-5 w-full" style={{ backgroundColor: 'rgb(90, 0, 0)', color: 'whitesmoke', padding: '0.4rem 0' }}> 
            <div className="grid container mx-auto p-1"> 
                <div className="col-12 md:col-4" style={{ color: 'rgb(177, 177, 177)' }}>
                    <h5 className="text-xl mb-1">Institution Information</h5> 
                    <p className="text-base">CNPJ: 00.623.904/0001-73</p>
                    <p className="text-base">Registration: 123.45678-50</p>
                    <p className="text-base">Address: Rua Ernesto Beuter - 53</p>
                </div>
                <div className="col-12 md:col-4" style={{ color: 'rgb(177, 177, 177)' }}>
                    <h5 className="text-xl mb-1">Customer Support</h5> 
                    <p className="text-base">Email: tabula.email@tabulairos.com</p>
                    <p className="text-base">Phone: +55 (99) 99999-9999</p>
                </div>
                <div className="col-12 md:col-4" style={{ color: 'rgb(177, 177, 177)' }}>
                    <h5 className="text-xl mb-1">Privacy</h5> 
                    <RouterLink 
                        to="/privacy-policy" 
                        className="no-underline text-base" 
                        style={privacyLinkStyle}
                    >
                        Our Privacy Policy
                    </RouterLink>
                </div>
            </div>
            <div className="flex justify-content-center mt-1"> 
                <div className="flex gap-3">
                    {socialLinks.map(link => (
                        <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="no-underline">
                            <i className={link.icon} style={{ fontSize: '1.8rem', color: 'whitesmoke' }} /> 
                        </a>
                    ))}
                </div>
            </div>
            <div className="text-center mt-1 text-sm" style={{ color: 'rgb(177, 177, 177)' }}> 
                © {new Date().getFullYear()} Tabula. All rights reserved.
            </div>
        </footer>
    );
};

export function Layout() {
    return (
        <>
            <TopMenu />
            
            {/* Menu de Categorias */}
            <Underbar /> 
            
            {/* AJUSTE DE ESPAÇO: Aumentamos para 140px para compensar as duas barras fixas */}
            <main style={{ paddingTop: "140px", minHeight: "calc(100vh - 100px)" }}> 
                <Outlet />
            </main>
            
            <Footer />
        </>
    );
}