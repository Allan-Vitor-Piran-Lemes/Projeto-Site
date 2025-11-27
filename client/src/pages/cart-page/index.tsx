// client/src/pages/cart-page/index.tsx
import { useCart } from "@/context/hooks/use-cart.ts";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputNumber } from "primereact/inputnumber";
import { useNavigate } from "react-router-dom";
import type { ICartItem } from "@/commons/types";

export const CartPage = () => {
    const navigate = useNavigate();
    const { cart, cartTotal, updateQuantity, removeItem, clearCart, cartCount } = useCart();
    
    // MUDANÇA: Frete fixo (como no seu JS original) para teste
    const SHIPPING_COST = 10.00; 
    const finalTotal = cartTotal + (cartTotal > 0 ? SHIPPING_COST : 0);
    
    // --- Templates para as colunas da tabela ---

    // Template de Imagem e Nome
    const productColumnTemplate = (item: ICartItem) => (
        <div className="flex align-items-center">
            {/* Usando a URL placeholder temporariamente */}
            <img 
                src="/assets/images/utfpr-logo.png" 
                alt={item.product.name} 
                style={{ width: '50px', height: '50px', objectFit: 'contain', marginRight: '10px' }}
            />
            <strong>{item.product.name}</strong>
        </div>
    );

    // Template de Preço Unitário
    const priceColumnTemplate = (item: ICartItem) => (
        <span className="cart-product-price">
            {item.product.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}
        </span>
    );
    
    // Template de Quantidade e Ação de Remoção
    const quantityColumnTemplate = (item: ICartItem) => (
        <div className="flex align-items-center gap-2">
            <InputNumber
                value={item.quantity}
                onValueChange={(e) => updateQuantity(item.product.id!, e.value ?? 1)}
                showButtons
                min={1}
                max={10}
                inputStyle={{ width: '4rem', textAlign: 'center' }}
            />
            <Button
                icon="pi pi-trash"
                className="p-button-danger p-button-sm p-button-text"
                onClick={() => removeItem(item.product.id!)}
                tooltip="Remove"
            />
        </div>
    );

    // --- Renderização Principal ---

    if (cartCount === 0) {
        return (
            <div className="container mx-auto px-4 pt-5 text-center" style={{ minHeight: '60vh' }}>
                <h2 className="text-3xl mt-6 mb-4" style={{ color: '#2e0000' }}>Your Cart is Empty</h2>
                <Button 
                    label="Continue Shopping" 
                    icon="pi pi-arrow-left" 
                    onClick={() => navigate("/products/show")} 
                    className="p-button-secondary"
                />
            </div>
        );
    }
    
    // MUDANÇA: Layout baseado na estrutura de tabela do seu HTML/CSS original
    return (
        <div className="container mx-auto px-4 pt-5" style={{ minHeight: '60vh' }}>
            <h2 className="text-3xl mb-4" style={{ color: '#2e0000' }}>Shopping Cart ({cartCount} item{cartCount > 1 ? 's' : ''})</h2>

            <div className="grid">
                
                {/* COLUNA ESQUERDA: TABELA DE PRODUTOS */}
                <div className="col-12 lg:col-8">
                    <DataTable 
                        value={cart} 
                        className="p-datatable-gridlines cart-table"
                        stripedRows
                    >
                        <Column 
                            header="Product" 
                            body={productColumnTemplate} 
                            style={{ width: '50%' }}
                        />
                        <Column 
                            header="Price" 
                            body={priceColumnTemplate} 
                            style={{ width: '20%' }}
                        />
                        <Column 
                            header="Quantity & Actions" 
                            body={quantityColumnTemplate} 
                            style={{ width: '30%' }}
                        />
                    </DataTable>
                    
                    <div className="flex justify-content-between mt-3">
                        <Button 
                            label="Continue Shopping" 
                            icon="pi pi-arrow-left" 
                            onClick={() => navigate("/products/show")} 
                            className="p-button-secondary p-button-sm"
                        />
                        <Button 
                            label="Clear Cart" 
                            icon="pi pi-times" 
                            onClick={clearCart} 
                            className="p-button-danger p-button-sm"
                        />
                    </div>
                </div>

                {/* COLUNA DIREITA: RESULTADO E CHECKOUT */}
                <div className="col-12 lg:col-4">
                    <div className="card p-4 shadow-2 bg-white" style={{ border: '1px solid #ddd' }}>
                        <h4 className="text-xl mb-3">Order Summary</h4>
                        
                        <div className="flex justify-content-between mb-2">
                            <span className="font-semibold">Subtotal (Items):</span>
                            <span>{cartTotal.toLocaleString("en-US", { style: "currency", currency: "USD" })}</span>
                        </div>
                        
                        <div className="flex justify-content-between mb-2">
                            <span className="font-semibold">Shipping Cost:</span>
                            <span>{SHIPPING_COST.toLocaleString("en-US", { style: "currency", currency: "USD" })}</span>
                        </div>

                        <div className="border-top-1 surface-border my-3"></div>

                        <div className="flex justify-content-between text-2xl font-bold mb-4">
                            <span>Total:</span>
                            <span style={{ color: '#2e0000' }}>{finalTotal.toLocaleString("en-US", { style: "currency", currency: "USD" })}</span>
                        </div>

                        <Button 
                            label="Proceed to Checkout" 
                            icon="pi pi-check-circle" 
                            // Esta rota será criada na próxima etapa (Finalizar Compra)
                            onClick={() => navigate("/checkout")} 
                            className="p-button-success p-button-lg w-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};