import { IProduct } from "@/commons/types";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/hooks/use-cart";
import React from 'react';
import './styles.css';

interface ProductCardProps {
  product: IProduct;
  onAddToCart: (product: IProduct) => void; 
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
    
    addItem(product, 1);
    
    onAddToCart(product);
  };

  const imageUrl = product.image.startsWith('http') 
    ? product.image 
    : `http://localhost:8044${product.image}`;

  return (
    <div className="product-card-custom"> 
      
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