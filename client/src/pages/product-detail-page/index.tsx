import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { Toast } from "primereact/toast";
import { InputNumber } from 'primereact/inputnumber'; 
import { Button } from "primereact/button";
import { IProduct } from "@/commons/types";
import ProductService from "@/services/product-service";
import { useCart } from "@/context/hooks/use-cart";
import './styles.css';

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);
  
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const { findById } = ProductService;
  const { addItem } = useCart();

  // Imagem genérica caso a do produto falhe
  const fallbackImage = "https://placehold.co/600x400?text=Sem+Imagem";

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const response = await findById(parseInt(id)); 
        if (response.success && response.data) {
          const loadedProduct = response.data as IProduct;
          setProduct(loadedProduct);
          
          // Define a imagem principal inicial (ou fallback se vazia)
          setSelectedImage(loadedProduct.image || fallbackImage);
          
        } else {
          navigate("/products"); // Redireciona para lista se não achar
        }
      } catch (error) {
        console.error("Erro ao carregar produto:", error);
        navigate("/products");
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]); 
  
  const handleAddToCart = () => {
    if (product) {
        addItem(product, quantity);
        toast.current?.show({ 
            severity: 'success', 
            summary: 'Sucesso', 
            detail: `${quantity}x ${product.name} adicionado ao carrinho.`, 
            life: 3000 
        });
        setQuantity(1);
    }
  };

  if (loading) {
    return (
        <div className="flex justify-content-center align-items-center min-h-screen">
            <i className="pi pi-spin pi-spinner text-4xl" style={{color: '#5c0000'}}></i>
        </div>
    );
  }

  if (!product) return <div className="text-center mt-5"><h3>Produto não encontrado.</h3></div>;

  // Cria lista de imagens para as miniaturas (Principal + Galeria do Banco)
  const allImages = [product.image, ...(product.gallery || [])].filter(Boolean);

  return (
    <div className="product-detail-container">
      <Toast ref={toast} />
      
      <div className="detail-top-section">
        {/* --- Coluna Esquerda: Imagens --- */}
        <div className="gallery-container">
            <div className="main-image-wrapper">
                <img 
                    src={selectedImage} 
                    alt={product.name} 
                    className="main-image"
                    onError={(e) => (e.currentTarget.src = fallbackImage)}
                />
            </div>
            
            {/* Renderiza miniaturas apenas se houver imagens */}
            {allImages.length > 0 && (
                <div className="thumbnails-row">
                    {allImages.map((imgSrc, index) => (
                        <img 
                            key={index}
                            src={imgSrc} 
                            alt={`Miniatura ${index}`}
                            className={`thumbnail-image ${selectedImage === imgSrc ? 'active' : ''}`}
                            onClick={() => setSelectedImage(imgSrc!)}
                            onError={(e) => (e.currentTarget.src = fallbackImage)}
                        />
                    ))}
                </div>
            )}
        </div>

        {/* --- Coluna Direita: Detalhes e Compra --- */}
        <div className="info-container">
            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-price">
                {product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </div>
            
            <div className="installment-info">
                <i className="pi pi-credit-card mr-2"></i>
                {product.installmentInfo || "Em até 12x sem juros"}
            </div>
            
            {/* Botões e Ações */}
            <div className="actions-row">
                <div className="flex align-items-center gap-3">
                    <label htmlFor="qtd" className="font-bold text-gray-700">Qtd:</label>
                    <InputNumber 
                        id="qtd"
                        value={quantity} 
                        onValueChange={(e) => setQuantity(e.value ?? 1)} 
                        showButtons 
                        buttonLayout="horizontal"
                        step={1}
                        min={1} 
                        max={99} 
                        inputStyle={{ width: '3rem', textAlign: 'center' }}
                        decrementButtonClassName="p-button-secondary"
                        incrementButtonClassName="p-button-secondary"
                    />
                </div>

                <Button 
                    label="Adicionar ao Carrinho"
                    icon="pi pi-shopping-cart"
                    className="add-cart-btn"
                    onClick={handleAddToCart}
                />
            </div>
            
            <Button 
                label="Voltar para a Loja" 
                icon="pi pi-arrow-left" 
                className="p-button-text mt-3" 
                style={{color: '#5c0000'}}
                onClick={() => navigate("/")}
            />
        </div>
      </div>

      {/* --- Área Inferior: Descrição e Ficha Técnica --- */}
      <div className="detail-bottom-section">
        <div className="description-block">
            <h3 className="section-title">Descrição do Produto</h3>
            <p className="description-text">
                {product.description || "Descrição não informada pelo fabricante."}
            </p>
        </div>

        <div className="specs-block">
            <h3 className="section-title">Ficha Técnica</h3>
            <ul className="specs-list">
                {/* Renderiza as especificações vindas do Banco de Dados */}
                {product.specifications && product.specifications.length > 0 ? (
                    product.specifications.map((info, i) => (
                        <li key={i}>
                            <i className="pi pi-check-circle mr-2" style={{color: '#5c0000', fontSize: '0.8rem'}}></i>
                            {info}
                        </li>
                    ))
                ) : (
                    <li>Informações técnicas não disponíveis.</li>
                )}
            </ul>
        </div>
      </div>
    </div>
  );
};