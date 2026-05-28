import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import CartCard from "../components/card/CartCard";
import styled from "styled-components";
import { useCart } from "../api/cartContextApi";
import { useNavigate } from "react-router-dom";
import { itemCartType } from "../types/type";
import { layout } from "../them/them";

const CartPage = () => {
  const { totalPrice, setTotalPrice, cartItems, isEditing } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    let total = 0;
    cartItems.map(
      (item: itemCartType) =>
        item.checked && (total += item.price * item.itemCount),
    );
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
      <Main>
        <h1>장바구니</h1>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => <CartCard key={index} item={item} />)
        ) : (
          <NoItems>카트에 상품이 없습니다.</NoItems>
        )}
        <TotalSum>
          총 합계 : <span>{totalPrice.toLocaleString()}원</span>
        </TotalSum>
        <Order>
          <button onClick={OnOrderClick}>선택한 상품 주문</button>
        </Order>
      </Main>
    </Layout>
  );
};

export default CartPage;

const Main = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 20px;
  box-sizing: border-box;
`;

const NoItems = styled.h3`
  font-weight: normal;
  font-size: var(--main-h3-size);
`;

const TotalSum = styled.div`
  font-size: 20px;
  text-align: right;
  width: 100%;
  max-width: ${layout.maxWidth};
  span {
    color: red;
  }
`;

const Order = styled.div`
  width: 100%;
  max-width: ${layout.maxWidth};
  text-align: right;
  margin-top: 40px;
  button {
    min-width: 90px;
    height: 42px;

    padding: 0 18px;

    border: 1px solid #e5e5e5;
    border-radius: 14px;

    background: #fafafa;

    color: #333;

    font-size: var(--button-font-size);
    font-weight: 600;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    box-shadow:
      0 4px 10px rgba(0, 0, 0, 0.04),
      0 1px 3px rgba(0, 0, 0, 0.03);

    transition:
      background 0.2s,
      transform 0.2s,
      box-shadow 0.25s,
      border-color 0.2s,
      color 0.2s;

    &:hover {
      background: white;

      border-color: #d0d0d0;

      transform: translateY(-1px);

      box-shadow:
        0 8px 18px rgba(0, 0, 0, 0.06),
        0 2px 6px rgba(0, 0, 0, 0.04);

      color: #111;
    }

    &:active {
      transform: scale(0.96);
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
      box-shadow: none;
    }
  }
`;
