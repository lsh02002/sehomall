import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LoginProvider } from "./api/loginContextApi";
import { CartProvider } from "./api/cartContextApi";
import { MyPageTabProvider } from "./api/myPageTabContextApi";
import { ItemProvider } from "./api/itemContextApi";

const root = document.getElementById("root");
if (!root) throw new Error("Root element with id 'root' not found");

ReactDOM.createRoot(root).render(
  <LoginProvider>
    <CartProvider>
      <MyPageTabProvider>
        <ItemProvider>
          <App />
        </ItemProvider>
      </MyPageTabProvider>
    </CartProvider>
  </LoginProvider>
);
