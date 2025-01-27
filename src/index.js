import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LoginProvider } from "./api/loginContextApi";
import { CartProvider } from "./api/cartContextApi";
import { CookiesProvider } from "react-cookie";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CookiesProvider>
    <LoginProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </LoginProvider>
  </CookiesProvider>
);
