import { IProduct } from "@/commons/types";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/hooks/use-cart";
import { Toast } from 'primereact/toast';
import { useRef } from "react";
import './styles.css';

interface ProductCardProps {
  product: IProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const toast = useRef<Toast>(null);

  const handleDetailsClick = () => {
    if (product.id) {
      navigate(`/product/${product.id}`);
    }
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, 1);
    toast.current?.show({ 
        severity: 'success', 
        summary: 'Adicionado', 
        detail: `${product.name} foi para o carrinho.`, 
        life: 3000 
    });
  };

  // Fallback genérico (Sem Imagem)
  const fallbackImage = 'https://placehold.co/600x400?text=Sem+Imagem';
  
  // Se o produto tiver imagem, usa ela. Senão, usa o fallback.
  const imageUrl = product.image || fallbackImage;

  return (
    <div className="product-card-custom"> 
      <Toast ref={toast} />
      
      <div onClick={handleDetailsClick} className="card-link cursor-pointer">
        <img
            alt={product.name}
            src={imageUrl} 
            className="product-image"
            // Se a imagem não carregar (ex: caminho errado), mostra o fallback
            onError={(e) => (e.currentTarget.src = fallbackImage)}
        />
        <h3 className="Titulo">
            {product.name}
        </h3>
      </div>
      
      <div className="separator"></div>
      
      <p className="preco">
        {product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
      </p>

      <button 
        className="carrinho"
        onClick={handleAddToCart}
      >
        <i className="pi pi-plus"></i> 
        <span>Adicionar</span>
      </button>

    </div>
  );
};