import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ShoppingCart from "../assets/shopping-cart.svg";
import { AddToCart } from "../api/ItemApi";
import { CartContext } from "../api/cartContextApi";
import { LoginContext } from "../api/loginContextApi";
import HeartCount from "./HeartCount";

const CardTwo = ({ item }) => {
  const { setCartCount } = useContext(CartContext);
  const { isLogin } = useContext(LoginContext);

  const OnAddToCartClick = () => {
    if (!isLogin) {
      alert("장바구니 기능은 로그인 하셔야 합니다.");
      return;
    }

    AddToCart(item.id, setCartCount);
  };

  return (
    <Container>
      <Link to={`/detail/${item.id}`}>
        <img width="230px" height="230px" src={item.files[0].fileUrl} alt="" />
        <Title>{item.name}</Title>
        <Price>{item.price.toLocaleString()}원</Price>
      </Link>
      <CartImage>
        <HeartCount id={item.id} heartCount={item.heartCount} />
        <img
          style={{ cursor: "pointer" }}
          src={ShoppingCart}
          alt=""
          onClick={OnAddToCartClick}
        />
      </CartImage>
    </Container>
  );
};

export default CardTwo;

const Container = styled.article`
  width: 240px;
  height: 330px;
  box-sizing: border-box;  
  margin: 20px;
  position: relative;
  transition: 0.4s;
  img {
    margin: 2px;
    object-fit: cover;
    transition: 0.1s;
  }
  &:hover {
    transform: scale(1.05);
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
  }
  a {
    text-decoration: none;
    color: black;
  }
`;

const Title = styled.span`
  font-size: 16px;
  display: block;
  padding: 5px 5px;
  background-color: #fff;
`;

const Price = styled.span`
  color: crimson;
  display: block;
  background-color: #fff;
  padding: 0px 5px 0px 5px;
`;

const CartImage = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75px;
  height: 24px;
  right: 10px;
  bottom: 35px;
  z-index: 10;
  img {
    width: 24px;
    height: 24px;
    object-fit: cover;
  }
  span {
    color: red;
  }
`;
