import React, { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import { FindCartItems } from "../api/ItemApi";
import CartCard from "../components/CartCard";
import styled from "styled-components";
import { CartContext } from "../api/cartContextApi";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const {
    totalPrice,
    setTotalPrice,
    cartItems,
    setCartItems,
    isDeleting,
    isEditing,
  } = useContext(CartContext);

  const navigate = useNavigate();

  useEffect(() => {
    FindCartItems()
      .then((res) => {
        console.log(res);
        setCartItems(res.data.cartAllSearchResponses);
      })
      .catch((err) => {
        console.error(err);
        if (err.response) {
          alert(err.response.data.detailMessage);
        }
      });
  }, [setCartItems, isDeleting, isEditing]);

  useEffect(() => {
    let total = 0;
    cartItems.map((item) => item.checked && (total += item.price * item.count));
    setTotalPrice(total);
  }, [cartItems, cartItems.length, setTotalPrice, isEditing]);

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
  margin-top: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const NoItems = styled.h3`
  font-weight: normal;
`;

const TotalSum = styled.div`
  font-size: 20px;
  text-align: right;
  width: 100%;
  max-width: 500px;
  span {
    color: crimson;
  }
`;

const Order = styled.div`
  width: 100%;
  max-width: 600px;
  text-align: right;
  margin-top: 40px;
  button {
    text-align: right;
    border: none;
    padding: 8px;
    color: white;
    background-color: gray;
    font-size: 1.2em;
    transition: 0.3s;
    cursor: pointer;
    &:hover {
      background-color: lightgray;
    }
  }
`;
