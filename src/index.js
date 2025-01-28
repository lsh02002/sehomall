import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LoginProvider } from "./api/loginContextApi";
import { CartProvider } from "./api/cartContextApi";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(  
    <LoginProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </LoginProvider>  
);
