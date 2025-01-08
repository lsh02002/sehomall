import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ShoppingCart from "../assets/shopping-cart.svg";
import Like from "../assets/heart.svg";
import LikeSolid from "../assets/heart-solid.svg";
import {
  AddToCart,
  CountHeart,
  DeleteHeart,
  InsertHeart,
  IsHearted,
} from "../api/ItemApi";
import { CartContext } from "../api/cartContextApi";
import { LoginContext } from "../api/loginContextApi";

const Card = ({ id, image, name, price }) => {
  const { setCartCount } = useContext(CartContext);
  const { isLogin } = useContext(LoginContext);
  const [isHearted, setIsHearted] = useState(false);
  const [countHeart, setCountHeart] = useState(0);

  useEffect(() => {
    if (isLogin) {
      IsHearted(id)
        .then((res) => {
          console.log(res.data);
          setIsHearted(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setIsHearted(false);
    }

    CountHeart(id)
      .then((res) => {
        console.log(res.data);
        setCountHeart(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id, isHearted, isLogin]);

  const OnLikeClick = () => {
    if (!isLogin) {
      alert("좋아요 기능은 로그인을 하셔야 합니다.");
      return;
    }
    if (!isHearted) {
      InsertHeart(id)
        .then((res) => {
          console.log(res);
          setIsHearted(true);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      DeleteHeart(id)
        .then((res) => {
          console.log(res);
          setIsHearted(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

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
        <img src={image} alt="" />
        <Title>{name}</Title>
        <Price>{price.toLocaleString()}원</Price>
      </Link>
      <CartImage>
        {!isHearted ? (
          <img src={Like} alt="" onClick={OnLikeClick} />
        ) : (
          <img src={LikeSolid} alt="" onClick={OnLikeClick} />
        )}
        <span>{countHeart}</span>
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
    width: 230px;
    height: 230px;
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
