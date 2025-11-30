import { IProduct } from "@/commons/types";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/hooks/use-cart"; // Verifique se o caminho está correto
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
  
  // CORREÇÃO AQUI: Adicionado 'e: React.MouseEvent' e 'e.stopPropagation()'
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Impede que o clique no botão afete o card inteiro
    
    addItem(product, 1);
    
    toast.current?.show({ 
        severity: 'success', 
        summary: 'Adicionado', // Traduzido
        detail: `${product.name} adicionado ao carrinho.`, 
        life: 3000 
    });
  };

  // Se existir imagem no banco, usa. Se não, usa placeholder.
  const imageUrl = product.image || "https://placehold.co/600x400?text=Sem+Imagem";

  return (
    <div className="product-card-custom"> 
      <Toast ref={toast} />
      
      {/* Área clicável que leva aos detalhes */}
      <div onClick={handleDetailsClick} className="card-link cursor-pointer">
        <img
            alt={product.name}
            src={imageUrl} 
            className="product-image"
            onError={(e) => (e.currentTarget.src = "https://placehold.co/600x400?text=Erro+Imagem")}
        />
        <h3 className="Titulo">
            {product.name}
        </h3>
      </div>
      
      <div className="separator"></div>
      
      <p className="preco">
        {product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
      </p>

      {/* Botão de Adicionar */}
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