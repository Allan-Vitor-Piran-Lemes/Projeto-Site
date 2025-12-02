// client/src/pages/product-list-page/index.tsx
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Toast } from "primereact/toast";
import type { IProduct } from "@/commons/types";
import ProductService from "@/services/product-service";
import { ProductCard } from "@/components/product-card";
import './styles.css';

export const ProductListPage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  
  // 1. Criar referência do Toast
  const toast = useRef<Toast>(null);
  
  const [searchParams] = useSearchParams();
  const categoryIdParam = searchParams.get('categoryId');
  const categoryName = searchParams.get('title') || 'Todos os Produtos';

  useEffect(() => {
    loadProducts();
  }, [categoryIdParam]); 

  const loadProducts = async () => {
    setLoading(true);
    try {
      const id = categoryIdParam ? parseInt(categoryIdParam) : undefined;
      const response = await ProductService.findAll(id);

      if (response.success && Array.isArray(response.data)) {
        setProducts(response.data as IProduct[]);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error(error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // 2. Função de callback para mostrar o Toast
  const handleShowToast = (product: IProduct) => {
      toast.current?.show({ 
          severity: 'success', 
          summary: 'Sucesso', 
          detail: `${product.name} adicionado ao carrinho!`, 
          life: 3000 
      });
  };

  return (
    <div className="container mx-auto px-4 pt-5" style={{ minHeight: '80vh' }}>
      {/* 3. Componente Toast aqui */}
      <Toast ref={toast} />
      
      <div className="lista-header flex align-items-center mb-4">
        <i className="pi pi-th-large header-icon text-3xl mr-3" style={{ color: '#800000' }}></i>
        <h2 className="header-title text-3xl m-0" style={{ color: '#800000' }}>{categoryName}</h2>
      </div>
      
      <div className="w-full mb-5" style={{ height: '4px', backgroundColor: '#e0e0e0' }}></div>

      {loading ? (
        <div className="flex flex-column align-items-center justify-content-center mt-5">
           <i className="pi pi-spin pi-spinner text-5xl" style={{ color: '#800000' }}></i>
           <p className="mt-3 text-lg text-600">A carregar produtos...</p>
        </div>
      ) : (
        <>
          {products.length > 0 ? (
            <div className="produtos-container">
              {products.map((product) => (
                <div key={product.id}>
                  {/* 4. Passar a função para o card */}
                  <ProductCard product={product} onAddToCart={handleShowToast} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-column align-items-center justify-content-center mt-5 text-gray-500">
              <i className="pi pi-box text-6xl mb-3"></i>
              <p className="text-xl">Nenhum produto encontrado.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};