import React, { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import { FindCartItems } from "../api/ItemApi";
import CartCard from "../components/CartCard";
import styled from "styled-components";
import { CartContext } from "../api/cartContextApi";

const CartPage = () => {
  const { totalPrice, setTotalPrice, items, setItems, isDeleting, isEditing } =
    useContext(CartContext);

  useEffect(() => {    
    FindCartItems()
      .then((res) => {
        console.log(res);
        setItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setItems, isDeleting, isEditing]);

  useEffect(() => {
    let total = 0;
    items.map((item) => item.checked && (total += item.price * item.count));
    setTotalPrice(total);
  }, [items, items.length, setTotalPrice, isEditing]);

  return (
    <Layout>
      <Main>
        {items.length > 0 ? (
          items.map((item) => <CartCard item={item} />)
        ) : (
          <NoItems>카트에 상품이 없습니다.</NoItems>
        )}
        <TotalSum>
          총 합계 : <span>{totalPrice.toLocaleString()}원</span>
        </TotalSum>
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
