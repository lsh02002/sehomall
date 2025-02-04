import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ShoppingCart from "../../assets/shopping-cart.svg";
import { AddToCart } from "../../api/sehomallApi";
import { CartContext } from "../../api/cartContextApi";
import { LoginContext } from "../../api/loginContextApi";
import HeartCount from "../HeartCount";

const CardOne = ({ item }) => {
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
      <Link to={`/detail/${item.id}`}>
        <ItemInfo>
          <div>{item.name}</div>
          <span>{item.price.toLocaleString()}원</span>
          <div>조회수: {item.views}</div>
          <div>등록날짜: {item.createAt}</div>
          <div>등록자: {item.userNickname}</div>
          <div>Review 수: {item.reviewCount}</div>
          {item.quantity < 1 ? (
            <span>품절됨</span>
          ) : (
            <div>재고 수량: {item.quantity}</div>
          )}
        </ItemInfo>
      </Link>
    </Container>
  );
};

export default CardOne;

const Container = styled.article`
  width: 240px;
  height: 330px;
  img {
    margin: 2px;
    object-fit: cover;
  }
  box-sizing: border-box;
  margin: 20px;
  position: relative;
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
  right: 10px;
  bottom: 35px;
  width: 75px;
  height: 24px;
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

const ItemInfo = styled.div`
  position: absolute;
  width: calc(100% + 20px);
  height: calc(100% + 20px);
  top: -10px;
  left: -10px;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.7);
  transition: 0.5s;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &:hover {
    opacity: 1;
  }
  div {
    color: white;
    padding-bottom: 5px;
  }
  span {
    color: red;
  }
`;
