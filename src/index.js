import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LoginProvider } from "./api/loginContextApi";
import { CartProvider } from "./api/cartContextApi";
import { MyPageTabProvider } from "./api/myPageTabContextApi";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LoginProvider>
    <CartProvider>
      <MyPageTabProvider>
        <App />
      </MyPageTabProvider>
    </CartProvider>
  </LoginProvider>
);
