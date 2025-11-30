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
  const toast = useRef<Toast>(null);
  
  // Hook para ler os parâmetros da URL (ex: ?categoryId=1)
  const [searchParams] = useSearchParams();
  const categoryIdParam = searchParams.get('categoryId');
  const pageTitle = searchParams.get('title') || 'Todos os Produtos';

  useEffect(() => {
    loadProducts();
  }, [categoryIdParam]); // Recarrega sempre que a categoria mudar

  const loadProducts = async () => {
    setLoading(true);
    try {
      // Se houver categoria na URL, converte para número, senão envia undefined
      const id = categoryIdParam ? parseInt(categoryIdParam) : undefined;
      
      const response = await ProductService.findAll(id);

      if (response.success && Array.isArray(response.data)) {
        setProducts(response.data as IProduct[]);
      } else {
        setProducts([]);
        toast.current?.show({
          severity: "error",
          summary: "Erro",
          detail: "Erro ao carregar produtos.",
          life: 3000,
        });
      }
    } catch (error) {
      console.error(error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 pt-5">
      <Toast ref={toast} />
      
      {/* Título da Página / Categoria */}
      <div className="lista-header">
        <i className="pi pi-th-large header-icon text-3xl mr-3"></i>
        <h2 className="header-title text-3xl">{pageTitle}</h2>
      </div>
      <div className="decorative-strip"></div>

      {loading ? (
        <div className="loading-container">
           <i className="pi pi-spin pi-spinner text-4xl spinner-icon"></i>
           <p className="mt-3">A carregar produtos...</p>
        </div>
      ) : (
        <>
          {products.length > 0 ? (
            <div className="produtos-container">
              {products.map((product) => (
                <div key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-message">
              <i className="pi pi-box text-5xl mb-3 block"></i>
              <p>Nenhum produto encontrado nesta categoria.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};