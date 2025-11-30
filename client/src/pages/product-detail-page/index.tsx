import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { Toast } from "primereact/toast";
import { InputNumber } from 'primereact/inputnumber'; 
import { IProduct } from "@/commons/types";
import ProductService from "@/services/product-service";
import { useCart } from "@/context/hooks/use-cart";

// IMPORTANTE: Importar o CSS que acabamos de corrigir
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
 
  const mockData = {
    parcelamento: "Em até 12x sem juros",
    informacao: [
        "Marca: Tabula Games",
        "Material: Papelão, Plástico, Cartas Premium",
        "Gênero: Estratégia / Familiar",
        "Número de jogadores: 2-6 Jogadores",
        "Idade Recomendada: 14+"
    ],
    miniaturas: [] as string[] 
  };

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const response = await findById(parseInt(id)); 
        if (response.success && response.data) {
          const loadedProduct = response.data as IProduct;
          setProduct(loadedProduct);
          
          const baseUrl = "http://localhost:8044/assetsImages/";
          const imgUrl = loadedProduct.url_image 
            ? `${baseUrl}${loadedProduct.url_image}` 
            : "/assets/images/utfpr-logo.png";
            
          setSelectedImage(imgUrl);
          mockData.miniaturas = [imgUrl, imgUrl, imgUrl];
          
        } else {
          navigate("/products/show"); 
        }
      } catch (error) {
        console.error("Erro ao carregar produto:", error);
        navigate("/products/show");
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

  if (loading) return <div className="text-center mt-5"><h3>Carregando...</h3></div>;
  if (!product) return <div className="text-center mt-5"><h3>Produto não encontrado.</h3></div>;

  return (
    <div className="container-compras">
      <Toast ref={toast} />
      
      <div className="grade-compras">
        {/* Imagens */}
        <div className="image">
            <div className="miniaturas">
                {[selectedImage, selectedImage, selectedImage].map((imgSrc, index) => (
                    <img 
                        key={index}
                        src={imgSrc} 
                        alt="Miniatura"
                        className={selectedImage === imgSrc ? 'selected' : ''}
                        onClick={() => setSelectedImage(imgSrc)} 
                    />
                ))}
            </div>
            <div className="main-image">
                <img src={selectedImage} alt={product.name} />
            </div>
        </div>

        {/* Detalhes */}
        <div className="compra">
            <div>
                <h2>{product.name}</h2>
                <div style={{ height: '2px', width: '50px', backgroundColor: 'var(--primary-color)', marginBottom: '15px' }}></div>
                
                <div className="informacao">
                    <p><strong>Categoria:</strong> {product.category?.name || 'Geral'}</p>
                    {mockData.informacao.map((info, i) => <p key={i}>{info}</p>)}
                </div>

                <div className="preco-container">
                    <div className="preco">
                        {product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </div>
                    <div className="texto-parcelamento">{mockData.parcelamento}</div>
                </div>
            </div>

            <div className="acoes-compra">
                <div className="flex align-items-center gap-3 mb-2">
                    <label htmlFor="qtd" style={{ fontWeight: 'bold', color: '#333' }}>Quantidade:</label>
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

                {/* Botões usando as classes do CSS Local */}
                <button className="botao-carrinho" onClick={handleAddToCart}>
                    <i className="pi pi-shopping-cart" style={{marginRight: '10px'}}></i>
                    ADICIONAR AO CARRINHO
                </button>

                <button className="botao-voltar" onClick={() => navigate("/")}>
                    Voltar para a Loja
                </button>
            </div>
        </div>
      </div>

      <div className="descricao">
        <h2>Descrição do Produto</h2>
        <p>{product.description}</p>
      </div>
    </div>
  );
};