import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import CartCard from "../components/card/CartCard";
import { useCart } from "../api/cartContextApi";
import { useNavigate } from "react-router-dom";
import { itemCartType } from "../types/type";
import { layout } from "../theme/theme";

const CartPage = () => {
  const { totalPrice, setTotalPrice, cartItems, isEditing } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    let total = 0;

    cartItems.forEach((item: itemCartType) => {
      if (item.checked) {
        total += item.price * item.itemCount;
      }
    });

    setTotalPrice(total);
  }, [cartItems, setTotalPrice, isEditing]);

  const OnOrderClick = async () => {
    if (cartItems.length <= 0) {
      alert("카트가 비어있습니다.");
      return;
    }

    navigate("/pay?isFromCart=true");
  };

  return (
    <Layout>
      <main
        className="
          w-100
          d-flex flex-column
          justify-content-center align-items-center
          px-3
        "
        style={{
          boxSizing: "border-box",
        }}
      >
        <h1 className="mb-4">장바구니</h1>

        {cartItems.length > 0 ? (
          cartItems.map((item, index) => <CartCard key={index} item={item} />)
        ) : (
          <h3
            className="fw-normal text-secondary py-5"
            style={{
              fontSize: "var(--main-h3-size)",
            }}
          >
            카트에 상품이 없습니다.
          </h3>
        )}

        <div
          className="w-100 text-end mt-3"
          style={{
            maxWidth: layout.maxWidth,
            fontSize: "20px",
          }}
        >
          총 합계 :{" "}
          <span className="text-danger fw-bold">
            {totalPrice.toLocaleString()}원
          </span>
        </div>

        <div
          className="w-100 d-flex justify-content-end mt-4"
          style={{
            maxWidth: layout.maxWidth,
          }}
        >
          <button
            onClick={OnOrderClick}
            className="btn btn-light border rounded-4 fw-semibold shadow-sm"
            style={{
              minWidth: "90px",
              height: "42px",
              padding: "0 18px",
            }}
          >
            선택한 상품 주문
          </button>
        </div>
      </main>
    </Layout>
  );
};

export default CartPage;
