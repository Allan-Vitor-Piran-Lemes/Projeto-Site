// client/src/context/CartContext.tsx
import React, { createContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { IProduct, ICartItem } from '@/commons/types';

const CART_STORAGE_KEY = 'pw_shopping_cart';

// --- 1. Definir Tipos ---

interface CartContextType {
  cart: ICartItem[];
  cartCount: number;
  cartTotal: number;
  addItem: (product: IProduct, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

interface CartProviderProps {
  children: ReactNode;
}

// --- 2. Criar o Contexto ---
export const CartContext = createContext<CartContextType>({} as CartContextType);

// --- 3. Implementar o Provider (Lógica) ---

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<ICartItem[]>(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      return storedCart ? JSON.parse(storedCart) : [];
    } catch {
      return [];
    }
  });

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);


  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cart]);


  const addItem = useCallback((product: IProduct, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.product.id === product.id);

      if (existingItemIndex > -1) {
        // Item já existe: atualiza a quantidade
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      } else {
        // Item novo: adiciona ao carrinho
        return [...prevCart, { product, quantity }];
      }
    });
  }, []);

  const removeItem = useCallback((productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setCart(prevCart => prevCart.map(item => 
      item.product.id === productId 
        ? { ...item, quantity } 
        : item
    ));
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);


  const contextValue = {
    cart,
    cartCount,
    cartTotal,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};