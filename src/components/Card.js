import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ShoppingCart from "../assets/shopping-cart.svg";
import { AddToCart } from "../api/ItemApi";
import { CartContext } from "../api/cartContextApi";
import { LoginContext } from "../api/loginContextApi";
import HeartCount from "./HeartCount";

const Card = ({ id, image, name, price, heartCount }) => {
  const { setCartCount } = useContext(CartContext);
  const { isLogin } = useContext(LoginContext);

  const OnAddToCartClick = () => {
    if (!isLogin) {
      alert("장바구니 기능은 로그인 하셔야 합니다.");
      return;
    }

    AddToCart(id, setCartCount);
  };

  return (
    <Container>
      <Link to={`/detail/${id}`}>
        <img width="230px" height="230px" src={image} alt="" />
        <Title>{name}</Title>
        <Price>{price.toLocaleString()}원</Price>
      </Link>
      <CartImage>
        <HeartCount id={id} heartCount={heartCount} />
        <img src={ShoppingCart} alt="" onClick={OnAddToCartClick} />
      </CartImage>
    </Container>
  );
};

export default Card;

const Container = styled.article`
  width: 250px;
  height: 330px;
  overflow: hidden;
  img {
    padding: 0px 10px;
    object-fit: cover;
    transition: 0.3s;
    &:hover {
      transform: scale(1.09);
    }
  }
  box-sizing: border-box;
  margin: 20px;
  border: 1px solid lightgray;
  position: relative;
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
  width: 100px;  
  height: 24px;
  right: 10px;
  bottom: 35px;
  cursor: pointer;
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
