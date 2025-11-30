// client/src/pages/product-list-page/index.tsx
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { InputNumber } from 'primereact/inputnumber';
import ProductService from "@/services/product-service";
import { useCart } from "@/context/hooks/use-cart";
import { IProduct } from "@/commons/types";
import './styles.css';

export const ProductDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addItem } = useCart();
    const toast = useRef<Toast>(null);

    const [product, setProduct] = useState<IProduct | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState<string>('');

    // Placeholder genérico para quando não houver imagem
    const fallbackImage = 'https://placehold.co/600x400?text=Sem+Imagem';

    useEffect(() => {
        if (id) {
            loadProduct(parseInt(id));
        }
    }, [id]);

    const loadProduct = async (productId: number) => {
        setLoading(true);
        try {
            const response = await ProductService.findById(productId);
            if (response.success && response.data) {
                const data = response.data as IProduct;
                setProduct(data);
                
                // Define a imagem inicial. Se vier vazia do banco, usa o fallback.
                setSelectedImage(data.image || fallbackImage);
            } else {
                navigate("/not-found");
            }
        } catch (error) {
            console.error("Error loading product", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = () => {
        if (product) {
            addItem(product, quantity);
            toast.current?.show({ 
                severity: 'success', 
                summary: 'Sucesso', 
                detail: `${quantity}x ${product.name} adicionado ao carrinho!`, 
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

    if (!product) return null;

    return (
        <div className="product-detail-container">
            <Toast ref={toast} />
            
            <div className="detail-top-section">
                {/* --- Galeria de Imagens (Esquerda) --- */}
                <div className="gallery-container">
                    {/* Imagem Grande Principal */}
                    <div className="main-image-wrapper">
                        <img 
                            src={selectedImage} 
                            alt={product.name} 
                            className="main-image" 
                            // Se a imagem falhar ao carregar, coloca o fallback
                            onError={(e) => (e.currentTarget.src = fallbackImage)}
                        />
                    </div>
                    
                    {/* Linha de Miniaturas */}
                    <div className="thumbnails-row">
                        {/* 1. Miniatura da Principal */}
                        <img 
                            src={product.image || fallbackImage}
                            alt="Principal"
                            className={`thumbnail-image ${selectedImage === product.image ? 'active' : ''}`}
                            onClick={() => setSelectedImage(product.image || fallbackImage)}
                            onError={(e) => (e.currentTarget.src = fallbackImage)}
                        />

                        {/* 2. Miniaturas da Galeria */}
                        {product.gallery?.map((imgUrl, index) => (
                            <img 
                                key={index}
                                src={imgUrl}
                                alt={`View ${index + 1}`}
                                className={`thumbnail-image ${selectedImage === imgUrl ? 'active' : ''}`}
                                onClick={() => setSelectedImage(imgUrl)}
                                onError={(e) => (e.currentTarget.src = fallbackImage)}
                            />
                        ))}
                    </div>
                </div>

                {/* --- Informações do Produto (Direita) --- */}
                <div className="info-container">
                    <h1 className="product-title">{product.name}</h1>
                    
                    <div className="product-price">
                        R$ {product.price.toFixed(2).replace('.', ',')}
                    </div>
                    
                    <div className="installment-info">
                        <i className="pi pi-credit-card mr-2"></i>
                        {product.installmentInfo || 'Em até 12x sem juros'}
                    </div>

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
                </div>
            </div>

            {/* --- Área Inferior: Descrição e Specs --- */}
            <div className="detail-bottom-section">
                <div className="description-block">
                    <h3 className="section-title">Descrição do Produto</h3>
                    <p className="description-text">
                        {product.description || "Sem descrição disponível."}
                    </p>
                </div>

                <div className="specs-block">
                    <h3 className="section-title">Ficha Técnica</h3>
                    <ul className="specs-list">
                        {product.specifications && product.specifications.length > 0 ? (
                            product.specifications.map((spec, index) => (
                                <li key={index}>
                                    <i className="pi pi-check-circle mr-2" style={{color: '#5c0000', fontSize: '0.8rem'}}></i>
                                    {spec}
                                </li>
                            ))
                        ) : (
                            <li>Detalhes não informados.</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};