// client/src/components/product-card/index.tsx
import { IProduct } from "@/commons/types";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/hooks/use-cart.ts";
import { Toast } from 'primereact/toast';
import { useRef } from "react";

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
  
  const handleAddToCart = () => {
    addItem(product, 1);
    toast.current?.show({ 
        severity: 'success', 
        summary: 'Added to Cart', 
        detail: `${product.name} added.`, 
        life: 3000 
    });
  };

  const imageUrl = "/assets/images/utfpr-logo.png"; 

  // MUDANÇA: Estilo do botão de carrinho (vermelho escuro Tabula)
  const cartButtonStyle = {
    width: '100%', 
    height: '50px', 
    backgroundColor: '#5c0000', 
    border: 'none', 
    borderRadius: '8px', 
    cursor: 'pointer', 
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginTop: 'auto',
    color: 'white',
    fontWeight: 'bold',
    transition: 'background-color 0.3s'
  };

  return (
    // MUDANÇA CRÍTICA: Adicionar mx-auto para centralizar o card dentro da sua coluna e limitar o max-width
    <div className="product-card-custom p-3 mx-auto" style={{ maxWidth: '280px' }}> 
      <Toast ref={toast} />
      
      {/* O Link para os Detalhes envolve a Imagem e o Título, como no seu HTML/JS */}
      <a onClick={handleDetailsClick} className="cursor-pointer" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <img
            alt={product.name}
            src={imageUrl} 
            style={{ width: "100%", height: "150px", objectFit: "contain", borderRadius: '5px', marginBottom: '10px' }} 
        />
        <h3 className="Titulo">
            {product.name}
        </h3>
      </a>
      
      {/* Divisor */}
      <div style={{ width: '100%', height: '3px', backgroundColor: '#2e0000', margin: '5px 0' }}></div>
      
      {/* Preço */}
      <p className="preco">
        Starting from: {product.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}
      </p>

      {/* Botão Adicionar ao Carrinho (.carrinho) */}
      <button 
        className="carrinho"
        onClick={handleAddToCart}
        style={cartButtonStyle} 
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#7a0000'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#5c0000'}
      >
        <i className="pi pi-plus" style={{ color: '#ffffff', fontSize: '18px' }}></i> 
        <span>Add to Cart</span>
      </button>

    </div>
  );
};