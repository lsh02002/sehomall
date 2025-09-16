import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LoginProvider } from "./api/loginContextApi";
import { CartProvider } from "./api/cartContextApi";
import { MyPageTabProvider } from "./api/myPageTabContextApi";
import { ItemProvider } from "./api/itemContextApi";
import { ReviewProvider } from "./api/reviewContextApi";

const root = document.getElementById("root");
if (!root) throw new Error("Root element with id 'root' not found");

ReactDOM.createRoot(root).render(
  <LoginProvider>
    <CartProvider>
      <MyPageTabProvider>
        <ItemProvider>
          <ReviewProvider>
            <App />
          </ReviewProvider>
        </ItemProvider>
      </MyPageTabProvider>
    </CartProvider>
  </LoginProvider>
);
