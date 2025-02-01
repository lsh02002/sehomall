import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LoginContext } from "../../api/loginContextApi";
import { CartContext } from "../../api/cartContextApi";
import { FindCartItems, UserLogout } from "../../api/ItemApi";
import SimpleCartCard from "../card/SimpleCartCard";

const Header = () => {
  const { isLogin, setIsLogin } = useContext(LoginContext);
  const {
    cartCount,
    setCartCount,
    cartItems,
    setCartItems,
    isDeleting,
    isEditing,
  } = useContext(CartContext);

  const [isModal, setIsModal] = useState(false);
  const navigate = useNavigate();

  const findCartItemsData = useCallback(() => {
    FindCartItems()
      .then((res) => {
        console.log(res);
        setCartItems(res.data.cartAllSearchResponses);
        setCartCount(res.data.cartAllSearchResponses.length);

        if (res.headers?.accesstoken) {
          localStorage.setItem("accessToken", res.headers?.accesstoken);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [setCartCount, setCartItems]);

  useEffect(() => {
    if (isLogin) {
      findCartItemsData();
    }
  }, [
    findCartItemsData,
    isLogin,
    cartCount,
    setCartCount,
    setCartItems,
    isDeleting,
    isEditing,
  ]);

  const OnLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      UserLogout().catch((err) => {
        console.error("logout ", err);
      });
      localStorage.removeItem("nickname");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setCartCount(0);
      setCartItems([]);
      setIsLogin(false);
    }
  };

  const OnMoveToCart = () => {
    navigate("/cart");
  };

  return (
    <Container>
      <Menu>
        <Link to="/search">ITEMS-SEARCH</Link>
        <Link to="/reviews?page=1&size=5">REVIEWS</Link>
        <Link to="/enroll">ENROLL</Link>
        {!isLogin ? (
          <>
            <Link to="/signup">SIGNUP</Link>
            <Link to="/login">LOGIN</Link>
          </>
        ) : (
          <>
            <Link onClick={OnLogout}>LOGOUT</Link>
          </>
        )}
        <>
          <Link to="/mypage/REVIEWS?page=1&size=4">MYPAGE</Link>
          {/* <Link to="/pay">PAY</Link> */}
          <Link
            to="/cart"
            onMouseEnter={() => setIsModal(true)}
            onMouseLeave={() => setIsModal(false)}
          >
            CART<span>{cartCount}</span>
          </Link>
          {isModal && (
            <Modal
              onMouseEnter={() => setIsModal(true)}
              onMouseLeave={() => setIsModal(false)}
            >
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <SimpleCartCard key={index} item={item} />
                ))
              ) : (
                <div>카트가 비어있습니다.</div>
              )}
              <button onClick={OnMoveToCart}>카트로 이동</button>
            </Modal>
          )}
        </>
      </Menu>
    </Container>
  );
};

export default Header;

const Container = styled.header`
  display: flex;
  justify-content: end;
  align-items: center;
  height: 70px;
  width: 100%;
  box-sizing: border-box;
  padding-right: 10px;
  opacity: 1;
  z-index: 5;
`;

const Menu = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 600px;
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

const Modal = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  background-color: #fff;
  position: absolute;
  width: 250px;
  height: 500px;
  right: 10px;
  bottom: -500px;
  padding: 0 20px;
  box-sizing: border-box;
  z-index: 5;
  border: 1px solid lightgray;
  overflow-y: auto;
  box-sizing: border-box;

  button {
    border: none;
    padding: 5px 10px;
    color: white;
    background-color: gray;
    transition: 0.2s;
    cursor: pointer;
    font-size: 1em;
    margin-top: 20px;
    margin-left: 95px;
    &:hover {
      background-color: lightgray;
    }
  }
`;
