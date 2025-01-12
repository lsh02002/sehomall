import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { LoginContext } from "../api/loginContextApi";
import { CartContext } from "../api/cartContextApi";
import { CountCartItems } from "../api/ItemApi";

const Header = () => {
  const { isLogin, setIsLogin } = useContext(LoginContext);
  const { cartCount, setCartCount, isDeleting } = useContext(CartContext);

  useEffect(() => {
    if (isLogin) {
      CountCartItems()
        .then((res) => {
          console.log(res);
          setCartCount(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLogin, setCartCount, isDeleting]);

  const OnLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      localStorage.removeItem("token");
      setIsLogin(false);
    }
  };

  return (
    <Container>
      <Menu>
        <Link to="/search">SEARCH</Link>
        {!isLogin ? (
          <Link to="/login">LOGIN</Link>
        ) : (
          <>
            <Link to="/enroll">ENROLL</Link>
            <Link onClick={OnLogout}>LOGOUT</Link>
            <Link to="/mypage">MYPAGE</Link>
            <Link to="/cart">
              CART<span>{cartCount}</span>
            </Link>
          </>
        )}
      </Menu>
    </Container>
  );
};

export default Header;

const Container = styled.header`
  position: fixed;
  display: flex;
  justify-content: end;
  align-items: center;
  height: 70px;
  width: 100%;
  box-sizing: border-box;
  padding-right: 10px;
  opacity: 1;
  z-index: 10;
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 400px;
  font-size: 14px;
  background-color: rgba(255, 255, 255, 0.65);
  a {
    text-decoration: none;
    color: black;
  }
  span {
    display: inline-block;
    width: 15px;
    height: 15px;
    background-color: gray;
    color: white;
    border-radius: 50%;
    text-align: center;
    line-height: 14px;
    padding-left: 2px;
  }
`;
