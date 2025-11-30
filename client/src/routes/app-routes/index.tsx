// client/src/routes/app-routes/index.tsx
import { Route, Routes } from "react-router-dom";
import { Layout } from "@/components/layout";
import { AuthPage } from "@/pages/auth-page";
import { HomePage } from "@/pages/home-page"; 
import { RequireAuth } from "@/components/require-auth";
import { CategoryListPage } from "@/pages/category-list";
import { CategoryFormPage } from "@/pages/category-form";
// IMPORTANTE: Esta é a nova página de listagem (Catálogo para o cliente)
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
        {/* Rotas Públicas */}
        <Route path="login" element={<AuthPage />} />
        <Route path="register" element={<AuthPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} /> 

        {/* Rotas Protegidas */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/home" element={<HomePage />} />

          {/* Categorias */}
          <Route path="/categories" element={<CategoryListPage />} />
          <Route path="/categories/new" element={<CategoryFormPage />} />
          <Route path="/categories/:id" element={<CategoryFormPage />} />

          {/* Produtos - Catálogo do Cliente */}
          <Route path="/products" element={<ProductListPage />} />
          
          {/* Produtos - Admin (Se quiser manter a edição, use rotas diferentes ou renomeie o componente no futuro) */}
          <Route path="/products/new" element={<ProductFormPage />} />
          <Route path="/products/:id" element={<ProductFormPage />} />
          
          {/* Detalhes do Produto */}
          <Route path="/product/:id" element={<ProductDetailPage />} /> 

          {/* Carrinho */}
          <Route path="/cart" element={<CartPage />} /> 

          {/* Catch All */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
}