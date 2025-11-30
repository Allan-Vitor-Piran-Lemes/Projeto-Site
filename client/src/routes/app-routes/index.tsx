// client/src/routes/app-routes/index.tsx
import { Route, Routes } from "react-router-dom";
import { Layout } from "@/components/layout";
import { AuthPage } from "@/pages/auth-page";
import { HomePage } from "@/pages/home-page"; 
import { RequireAuth } from "@/components/require-auth";
import { CategoryListPage } from "@/pages/category-list";
import { CategoryFormPage } from "@/pages/category-form";
import { ProductListPage } from "@/pages/product-list-page"; 
import { ProductFormPage } from "@/pages/product-form";
import { NotFound } from "@/pages/not-found";
import { ProductDetailPage } from "@/pages/product-detail-page"; 
import { CartPage } from "@/pages/cart-page";
import { PrivacyPolicyPage } from "@/pages/privacy-policy-page";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* --- ROTAS PÚBLICAS (Acessíveis sem login) --- */}
        <Route path="login" element={<AuthPage />} />
        <Route path="register" element={<AuthPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} /> 
        
        {/* Agora Home, Produtos, Categorias e Carrinho são PÚBLICOS */}
        <Route path="/" element={<HomePage />} /> 
        <Route path="/home" element={<HomePage />} />
        
        <Route path="/categories" element={<CategoryListPage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} /> 
        <Route path="/cart" element={<CartPage />} /> 

        {/* --- ROTAS PROTEGIDAS (Apenas Logado) --- */}
        {/* Aqui ficam telas de Admin ou Checkout futuro */}
        <Route element={<RequireAuth />}>
          <Route path="/categories/new" element={<CategoryFormPage />} />
          <Route path="/categories/:id" element={<CategoryFormPage />} />
          <Route path="/products/new" element={<ProductFormPage />} />
          <Route path="/products/:id" element={<ProductFormPage />} />
          
          {/* Checkout será protegido futuramente */}
          <Route path="/checkout" element={<NotFound />} /> 
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}