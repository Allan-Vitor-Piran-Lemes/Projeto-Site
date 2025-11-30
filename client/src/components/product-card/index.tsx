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

  // LÓGICA DA IMAGEM:
  // Se existir url_image no produto, monta o caminho completo.
  // Caso contrário, usa o placeholder.
  const imageUrl = product.url_image 
    ? `http://localhost:8044/assetsImages/${product.url_image}` 
    : "/assets/images/utfpr-logo.png";

  const cartButtonStyle = {
    // ... (mantenha o estilo igual)
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
    <div className="product-card-custom p-3 mx-auto" style={{ maxWidth: '280px' }}> 
      <Toast ref={toast} />
      
      <a onClick={handleDetailsClick} className="cursor-pointer" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <img
            alt={product.name}
            src={imageUrl} 
            // Ajustei o objectFit para 'cover' para preencher melhor o cartão sem distorcer
            style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: '5px', marginBottom: '10px' }} 
        />
        <h3 className="Titulo">
            {product.name}
        </h3>
      </a>
      
      {/* ... (resto do componente igual) ... */}
      
      <div style={{ width: '100%', height: '3px', backgroundColor: '#2e0000', margin: '5px 0' }}></div>
      
      <p className="preco">
        Starting from: {product.price.toLocaleString("pt-PT", { style: "currency", currency: "EUR" })}
      </p>

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