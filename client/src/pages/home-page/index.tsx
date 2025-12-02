import { useEffect, useState, useRef, useCallback } from "react";
import { Toast } from "primereact/toast";
import { IProduct } from "@/commons/types";
import ProductService from "@/services/product-service";
import { ProductCard } from "@/components/product-card";
import { CategoryMenu } from "@/components/category-menu"; 
import { useSearchParams } from "react-router-dom"; 
import './styles.css';

export const HomePage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false); 
  
  const toast = useRef<Toast>(null);
  
  const { findAll } = ProductService;
  const [searchParams, setSearchParams] = useSearchParams(); 

  const loadProducts = useCallback(async () => { 
    setLoading(true);
    try {
        const response = await findAll(undefined); 
        if (response.success && Array.isArray(response.data)) {
            const allProducts = response.data as IProduct[];
            const topProducts = allProducts.slice(0, 8);
            setProducts(topProducts);
        } else {
            setProducts([]);
        }
    } catch (error) {
        console.error("Erro ao carregar produtos", error);
        setProducts([]);
    } finally {
        setLoading(false);
    }
  }, [findAll]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]); 

  const handleSelectCategory = (categoryId?: number) => { 
    if (categoryId) {
        setSearchParams({ category: String(categoryId) });
    } else {
        setSearchParams({});
    }
    setIsMenuVisible(false);
  };

  const handleShowToast = (product: IProduct) => {
      toast.current?.show({ 
          severity: 'success', 
          summary: 'Sucesso', 
          detail: `${product.name} adicionado ao carrinho!`, 
          life: 3000 
      });
  };
  
  // --- CORREÇÃO DO CAMINHO ---
  // Ajustado para a pasta static/mage conforme solicitado
  // Verifique se o nome do arquivo é banner-tabula.jpg ou o nome original da imagem
  const bannerPlaceholderUrl = "/static/mage/banner-tabula.png"; 
  
  return (
    <div className="pt-0"> 
      <Toast ref={toast} />
      
      <section className="mb-4">
        <a href="/products">
          <img 
            src={bannerPlaceholderUrl} 
            className="w-full" 
            alt="Banner Promoção" 
            style={{ display: 'block', maxHeight: '300px', objectFit: 'cover' }} 
            onError={(e) => {
                // Fallback para ajudar a debugar se a imagem não carregar
                e.currentTarget.src = "https://placehold.co/1200x300?text=Erro+no+Caminho+da+Imagem";
                console.error("Não foi possível carregar:", bannerPlaceholderUrl);
            }}
          /> 
        </a>
      </section>
      <div style={{ height: '5vh', backgroundColor: '#5c0000' }} className="mb-4"></div>

      <div className="Lista">
        <div className="Lista-header flex align-items-center mb-3 px-4">
          <i className="pi pi-chevron-right text-3xl mr-2" style={{ color: '#2e0000' }} />
          <h2 className="text-2xl font-bold" style={{ color: '#2e0000' }}>Produtos mais populares</h2>
        </div> 

        <div className="produtos-container"> 
          {loading ? (
             <div className="col-12 text-center p-5">
                <i className="pi pi-spin pi-spinner text-4xl" style={{color: '#800000'}}></i>
             </div>
          ) : (
            products.map((product) => (
              <div key={product.id}> 
                <ProductCard product={product} onAddToCart={handleShowToast} /> 
              </div>
            ))
          )}
          
          {!loading && products.length === 0 && (
             <div className="col-12 text-center p-5">
                <i className="pi pi-inbox text-4xl mb-3 block text-gray-400"></i>
                <p>Nenhum produto encontrado.</p>
             </div>
          )} 
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