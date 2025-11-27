// client/src/pages/home-page/index.tsx
import { useEffect, useState, useRef, useCallback } from "react";
import { Toast } from "primereact/toast";
import { IProduct } from "@/commons/types";
import ProductService from "@/services/product-service";
import { ProductCard } from "@/components/product-card";
import { CategoryMenu } from "@/components/category-menu"; 
import { useSearchParams } from "react-router-dom"; 

// MUDANÇA: Lista definitiva dos 8 produtos mais populares (para duas linhas de 4)
const TOP_8_PRODUCT_IDS = [1, 2, 3, 4, 5, 6, 7, 8]; 

export const HomePage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false); 
  const toast = useRef(null);
  const { findAll } = ProductService;
  const [searchParams, setSearchParams] = useSearchParams(); 

  const categoryIdParam = searchParams.get('category')?.toLowerCase();
  const selectedCategoryId = categoryIdParam ? parseInt(categoryIdParam) : undefined;
  
  // MUDANÇA: Função de carregamento focada em obter os 8 produtos (e ignorar filtro de URL por enquanto)
  const loadProducts = useCallback(async () => { 
    setLoading(true);
    // Buscar TODOS os produtos (a API retorna 12)
    const response = await findAll(undefined); 

    if (response.success && Array.isArray(response.data)) {
      const allProducts = response.data as IProduct[];
      
      // FILTRO: Mapeia e reordena para exibir apenas os 8 produtos definidos
      const topProducts = TOP_8_PRODUCT_IDS
        .map(id => allProducts.find(p => p.id === id)) 
        .filter(p => p !== undefined) as IProduct[]; 
      
      setProducts(topProducts);
    } else {
      setProducts([]);
    }
    setLoading(false);
  }, [findAll]);

  useEffect(() => {
    loadProducts();
  }, []); 

  const handleSelectCategory = (categoryId?: number) => { 
    if (categoryId) {
        setSearchParams({ category: String(categoryId) });
    } else {
        setSearchParams({});
    }
    setIsMenuVisible(false);
  };
  
  const bannerPlaceholderUrl = "https://via.placeholder.com/1200x200?text=TABULA+BANNER+PLACEHOLDER"; 
  
  return (
    <div className="pt-0"> 
      <Toast ref={toast} />
      
      {/* 1. SEÇÃO DO BANNER e NAVBANNER */}
      <section className="mb-4">
        <a href="/products/show">
          <img src={bannerPlaceholderUrl} className="w-full" alt="Banner Promoção" style={{ display: 'block' }} /> 
        </a>
      </section>
      <div style={{ height: '5vh', backgroundColor: '#5c0000' }} className="mb-4"></div>

      {/* 2. SEÇÃO DE LISTAGEM (.Lista) */}
      <div className="Lista">
        <div className="Lista-header flex align-items-center mb-3">
          <i className="pi pi-chevron-right text-3xl mr-2" style={{ color: '#2e0000' }} />
          <h2 className="text-2xl font-bold" style={{ color: '#2e0000' }}>Produtos mais populares</h2>
        </div> 

        {/* Usando o Grid CSS Nativo (4x1) */}
        <div className="produtos-container"> 
          {loading ? (
            <p className="col-12 text-center">Loading products...</p> 
          ) : (
            // MUDANÇA: Renderiza os 8 produtos filtrados
            products.map((product) => (
              <div key={product.id}> 
                <ProductCard product={product} /> 
              </div>
            ))
          )}
          {products.length === 0 && !loading && <p className="col-12 text-center">No popular products found.</p>} 
        </div>
      </div>
      
      <CategoryMenu 
        onSelectCategory={handleSelectCategory}
        visible={isMenuVisible} 
        onHide={() => setIsMenuVisible(false)} 
      />
    </div>
  );
};