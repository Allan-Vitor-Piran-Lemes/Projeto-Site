// client/src/pages/product-list-page/index.tsx
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { Toast } from "primereact/toast";
import { IProduct } from "@/commons/types";
import ProductService from "@/services/product-service";
import { ProductCard } from "@/components/product-card";
import { useSearchParams, useNavigate } from "react-router-dom"; 

export const ProductListPage = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const toast = useRef(null);
    const { findAll } = ProductService;
    const [searchParams] = useSearchParams(); 
    const navigate = useNavigate();

    // Pega a categoria da URL (ex: ?category=guerra)
    const categoryKey = searchParams.get('category')?.toLowerCase() || 'all';

    // --- REGRAS DE NEGÓCIO (IDs por Categoria) ---
    // Aqui definimos exatamente quais produtos aparecem em qual menu
    const rules = useMemo(() => ({
        'guerra': { 
            title: 'Guerra', 
            // Os 8 primeiros (IDs 1 a 8)
            ids: [1, 2, 3, 4, 5, 6, 7, 8] 
        },
        'estrategia': { 
            title: 'Estratégia', 
            // Do 3 ao 10
            ids: [3, 4, 5, 6, 7, 8, 9, 10] 
        },
        'cooperativo': { 
            title: 'Cooperativo', 
            // Do 5 ao 12
            ids: [5, 6, 7, 8, 9, 10, 11, 12] 
        },
        'cartas': { 
            title: 'Cartas', 
            // Do 3 ao 10 (Repetindo a lógica de estratégia conforme seu pedido)
            ids: [3, 4, 5, 6, 7, 8, 9, 10] 
        },
        'classicos': { 
            title: 'Clássicos', 
            // Do 1 ao 8
            ids: [1, 2, 3, 4, 5, 6, 7, 8] 
        },
        'all': { 
            title: 'Todos os Produtos', 
            // Todos os 12
            ids: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] 
        }
    }), []);

    const currentRule = rules[categoryKey as keyof typeof rules] || rules['all'];

    const loadProducts = useCallback(async () => { 
        setLoading(true);
        // Buscamos TODOS os produtos da API para poder filtrar manualmente no front
        const response = await findAll(undefined); 

        if (response.success && Array.isArray(response.data)) {
            const allProducts = response.data as IProduct[];
           
            const filteredProducts = currentRule.ids
                .map(id => allProducts.find(p => p.id === id)) // Mapeia na ordem correta
                .filter(p => p !== undefined) as IProduct[]; // Remove vazios
                
            setProducts(filteredProducts);
        } else {
            setProducts([]);
        }
        setLoading(false);
    }, [findAll, currentRule.ids]);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);
    
    return (
        <div className="pt-0"> 
            <Toast ref={toast} />
            <div style={{ height: '5vh', backgroundColor: '#5c0000' }} className="mb-4"></div>
            
            <div className="Lista">
                <div className="Lista-header flex align-items-center mb-3 px-4">
                    <i className="pi pi-chevron-right text-3xl mr-2" style={{ color: '#2e0000' }} />
                    <h2 className="text-2xl font-bold" style={{ color: '#2e0000' }}>{currentRule.title}</h2>
                </div> 

                <div className="produtos-container"> 
                    {loading ? (
                        <p className="col-12 text-center">Carregando produtos...</p> 
                    ) : (
                        products.map((product) => (
                            <div key={product.id}> 
                                <ProductCard product={product} /> 
                            </div>
                        ))
                    )}
                    {products.length === 0 && !loading && <p className="col-12 text-center">Nenhum produto encontrado nesta categoria.</p>} 
                </div>
            </div>
        </div>
    );
};