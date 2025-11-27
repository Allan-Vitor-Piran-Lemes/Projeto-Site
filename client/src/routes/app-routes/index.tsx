// client/src/routes/app-routes/index.tsx
import { Route, Routes } from "react-router-dom";
import { Layout } from "@/components/layout";
import { LoginPage } from "@/pages/login";
import { RegisterPage } from "@/pages/register";
import { HomePage } from "@/pages/home-page"; 
import { RequireAuth } from "@/components/require-auth";
import { CategoryListPage } from "@/pages/category-list";
import { CategoryFormPage } from "@/pages/category-form";
import { ProductListPage } from "@/pages/product-list";
import { ProductFormPage } from "@/pages/product-form";
import { NotFound } from "@/pages/not-found";
import { ProductDetailPage } from "@/pages/product-detail-page"; 
import { CartPage } from "@/pages/cart-page";
import { PrivacyPolicyPage } from "@/pages/privacy-policy-page"; // ADIÇÃO: Importar a nova página

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        {/* ADIÇÃO: Rota da Política de Privacidade (Deve ser pública) */}
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} /> 

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/home" element={<HomePage />} />

          <Route path="/categories" element={<CategoryListPage />} />
          <Route path="/categories/new" element={<CategoryFormPage />} />
          <Route path="/categories/:id" element={<CategoryFormPage />} />

          <Route path="/products" element={<ProductListPage />} />
          <Route path="/products/new" element={<ProductFormPage />} />
          <Route path="/products/:id" element={<ProductFormPage />} />
          <Route path="/products/show" element={<HomePage />} />
          
          <Route path="/product/:id" element={<ProductDetailPage />} /> 

          <Route path="/cart" element={<CartPage />} /> 

          {/* Rotas futuras de Checkout, Pedido e Endereços aqui */}

          {/* catch all */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
}