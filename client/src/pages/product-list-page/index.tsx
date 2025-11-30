// client/src/pages/product-list-page/index.tsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"; 
import { Toast } from "primereact/toast"; // Se precisar de toast
import { IProduct } from "@/commons/types";
import ProductService from "@/services/product-service";
import { ProductCard } from "@/components/product-card";
import './styles.css'; // Importa o CSS que criamos no Passo 1

export const ProductListPage = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Hook para ler ?categoryId=1 da URL
    const [searchParams] = useSearchParams(); 
    
    // Pega o ID e o Título da URL
    const categoryId = searchParams.get('categoryId');
    const pageTitle = searchParams.get('title') || 'Todos os Produtos';

    const { findAll } = ProductService;

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            let response;

            if (categoryId) {
                // Se tem ID, busca filtrado pelo endpoint que ajustamos no service
                response = await findAll(parseInt(categoryId));
            } else {
                // Se não tem ID, busca todos
                response = await findAll();
            }

            if (response.success && Array.isArray(response.data)) {
                setProducts(response.data as IProduct[]);
            } else {
                setProducts([]);
            }
            setLoading(false);
        };

        fetchProducts();
    }, [categoryId]); // Recarrega toda vez que o categoryId muda na URL
    
    return (
        <div className="w-full">
            {/* Faixa decorativa opcional antes do título */}
            <div style={{ height: '20px', backgroundColor: '#e0e0e0' }} className="mb-4 w-full"></div>
            
            <div className="lista-header">
                <i className="pi pi-chevron-right text-2xl mr-2" style={{ color: '#800000' }} />
                <h2 className="text-3xl font-bold uppercase" style={{ color: '#800000' }}>
                    {pageTitle}
                </h2>
            </div> 

            <div className="produtos-container"> 
                {loading ? (
                    <div className="col-12 text-center p-5">
                        <i className="pi pi-spin pi-spinner text-4xl" style={{color: '#800000'}}></i>
                    </div> 
                ) : (
                    products.length > 0 ? (
                        products.map((product) => (
                            <div key={product.id} style={{ height: '100%' }}> 
                                <ProductCard product={product} /> 
                            </div>
                        ))
                    ) : (
                        <p className="col-12 text-center text-xl">Nenhum produto encontrado nesta categoria.</p>
                    )
                )}
            </div>
        </div>
    );
};