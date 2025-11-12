import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";
import { OrderProvider } from "./contexts/OrderContext.jsx";
import { ProductProvider } from "./contexts/ProductContext.jsx";
import { UserProvider } from "./contexts/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <UserProvider>
        <CartProvider>
          <ProductProvider>
            <OrderProvider>
              <App />
            </OrderProvider>
          </ProductProvider>
        </CartProvider>
      </UserProvider>
    </AuthProvider>
  </StrictMode>
);
