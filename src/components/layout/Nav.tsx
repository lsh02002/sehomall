import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useLogin } from "../../api/loginContextApi";
import { useCart } from "../../api/cartContextApi";
import SimpleCartCard from "../card/SimpleCartCard";
import { useMyPage } from "../../api/myPageTabContextApi";
import { itemCartType } from "../../types/type";
import { cartData } from "../data/cartData";

import Category from "../../assets/category.svg";
import Review from "../../assets/review.svg";
import MyPage from "../../assets/my-page.svg";
import Cart from "../../assets/cart.svg";

const Nav = () => {
  const { isLogin, setIsLogin } = useLogin();
  const { reviewPage } = useMyPage();
  const { cartCount, setCartCount, cartItems, setCartItems } = useCart();

  const [isModal, setIsModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setCartItems(cartData?.content);
    setCartCount(cartData?.content.length);
  }, [setCartCount, setCartItems]);

  const OnLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
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
        <IconLink to="/category">
          <div>
            <img src={Category} alt="" />
          </div>
          <div>CATEGORIES</div>
        </IconLink>
        <IconLink to={`/reviews?page=1&size=5`}>
          <div>
            <img src={Review} alt="" />
          </div>
          <div>REVIEWS</div>
        </IconLink>
        <IconLink to={`/mypage/REVIEWS?page=${reviewPage}&size=4`}>
            <div>
              <img src={MyPage} alt="" />
            </div>
            <div>MYPAGE</div>
          </IconLink>
        {/* {!isLogin ? (
          <>            
            <IconLink to="/login">
              <div>
                <img src={Login} alt="" />
              </div>
              <div>LOGIN</div>
            </IconLink>
          </>
        ) : (
          <>
            <IconLink onClick={OnLogout} to={""}>
              <div>
                <img src={Logout} alt="" />
              </div>
              <div>LOGOUT</div>
            </IconLink>
          </>
        )} */}
        <>          
          {/* <Link to="/pay">PAY</Link> */}
          <IconLink
            to="/cart"
            onMouseEnter={() => setIsModal(true)}
            onMouseLeave={() => setIsModal(false)}
          >
            <div>
              <img src={Cart} alt="" />
              <span>{cartCount}</span>
            </div>
            <div>
              CART
            </div>
          </IconLink>
          {isModal && (
            <Modal
              onMouseEnter={() => setIsModal(true)}
              onMouseLeave={() => setIsModal(false)}
            >
              {cartItems.length > 0 ? (
                cartItems.map((item: itemCartType, index) => (
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

export default Nav;

const Container = styled.nav`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  width: 100vw;
  box-sizing: border-box;  
  opacity: 1;
  z-index: 20;
  border-top: 1px solid lightgray;
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100vw;
  height: 100%;
  font-size: 14px;
  background-color: rgba(255, 255, 255, 1);
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
    position: absolute;    
  }
`;

const IconLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 2rem;
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
  bottom: 50px;
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
