import { IProduct } from "@/commons/types";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/hooks/use-cart";
import './styles.css';

interface ProductCardProps {
  product: IProduct;
  onAddToCart: (product: IProduct) => void; // Nova prop obrigatória
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const navigate = useNavigate();
  const { addItem } = useCart();

  const handleDetailsClick = () => {
    if (product.id) {
      navigate(`/product/${product.id}`);
    }
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    
    // 1. Adiciona ao Contexto (lógica)
    addItem(product, 1);
    
    // 2. Chama a função do Pai para mostrar o Toast (visual)
    onAddToCart(product);
  };

  const imageUrl = product.image || "https://placehold.co/600x400?text=Sem+Imagem";

  return (
    <div className="product-card-custom"> 
      {/* Removemos o Toast daqui de dentro para corrigir o bug visual */}
      
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