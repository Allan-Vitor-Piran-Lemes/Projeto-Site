import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { Toast } from "primereact/toast";
import { InputNumber } from 'primereact/inputnumber'; 
import { IProduct } from "@/commons/types";
import ProductService from "@/services/product-service";
import { useCart } from "@/context/hooks/use-cart";

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
 
  // Como a API não tem esses dados, criamos aqui para manter o visual
  const mockData = {
    parcelamento: "Em até 12x sem juros",
    informacao: [
        "Marca: Tabula Games",
        "Material: Papelão, Plástico, Cartas Premium",
        "Gênero: Estratégia / Familiar",
        "Número de jogadores: 2-6 Jogadores",
        "Idade Recomendada: 14+"
    ],
    // Vamos usar a imagem principal para preencher 3 slots de miniatura
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
          
          // Define imagem ou placeholder
          const imgUrl = loadedProduct.url_image ?? "/assets/images/utfpr-logo.png";
          setSelectedImage(imgUrl);
          
          // Cria 3 miniaturas iguais para simular a galeria (funcionalidade visual)
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

  if (loading) {
    return <div className="text-center mt-5"><h3>Carregando detalhes do produto...</h3></div>;
  }

  if (!product) {
    return (
        <div className="text-center mt-5">
            <h3>Produto não encontrado.</h3>
            <button onClick={() => navigate("/")}>Voltar</button>
        </div>
    );
  }

  return (
    <div className="container-compras">
      <Toast ref={toast} />
      
      <div className="grade-compras">
        
        {/* Coluna Esquerda: Imagens */}
        <div className="image">
            {/* Lista de Miniaturas */}
            <div className="miniaturas">
                {[product.url_image ?? "/assets/images/utfpr-logo.png", product.url_image ?? "/assets/images/utfpr-logo.png", product.url_image ?? "/assets/images/utfpr-logo.png"].map((imgSrc, index) => (
                    <img 
                        key={index}
                        src={imgSrc} 
                        alt={`Miniatura ${index + 1}`}
                        className={selectedImage === imgSrc ? 'selected' : ''} // Classe para borda vermelha
                        onClick={() => setSelectedImage(imgSrc)} // Troca a imagem principal ao clicar
                    />
                ))}
            </div>

            {/* Imagem Principal Grande */}
            <div className="main-image">
                <img src={selectedImage} alt={product.name} />
            </div>
        </div>

        {/* Coluna Direita: Informações e Botões */}
        <div className="compra">
            <div>
                <h2>{product.name}</h2>
                <div style={{ height: '2px', width: '50px', backgroundColor: '#800000', marginBottom: '15px' }}></div>
                
                {/* Caixa de Informações Técnicas */}
                <div className="informacao">
                    <p><strong>Categoria:</strong> {product.category?.name || 'Geral'}</p>
                    {mockData.informacao.map((info, i) => (
                        <p key={i}>{info}</p>
                    ))}
                </div>

                {/* Preço e Parcelamento */}
                <div className="preco-container">
                    <div className="preco">
                        {product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </div>
                    <div className="texto-parcelamento">{mockData.parcelamento}</div>
                </div>
            </div>

            {/* Ações: Quantidade e Botões */}
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

                <button className="botao-carrinho" onClick={handleAddToCart}>
                    <i className="pi pi-shopping-cart"></i>
                    ADICIONAR AO CARRINHO
                </button>

                <button className="botao-voltar" onClick={() => navigate("/")}>
                    Voltar para a Loja
                </button>
            </div>
        </div>
      </div>

      {/* Seção Inferior: Descrição */}
      <div className="descricao">
        <h2>Descrição do Produto</h2>
        <p>{product.description}</p>
      </div>

    </div>
  );
};