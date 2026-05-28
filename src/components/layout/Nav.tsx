import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import { useLogin } from "../../api/loginContextApi";
import { useCart } from "../../api/cartContextApi";
import { useMyPage } from "../../api/myPageTabContextApi";
import { cartData } from "../data/cartData";

import Category from "../../assets/category.svg";
import Review from "../../assets/review.svg";
import MyPage from "../../assets/my-page.svg";
import Cart from "../../assets/cart.svg";
import { layout } from "../../them/them";

const Nav = () => {
  // const { isLogin, setIsLogin } = useLogin();
  const { reviewPage } = useMyPage();
  const { cartCount, setCartCount, setCartItems } = useCart();

  useEffect(() => {
    setCartItems(cartData?.content);
    setCartCount(cartData?.content.length);
  }, [setCartCount, setCartItems]);

  // const OnLogout = () => {
  //   if (window.confirm("로그아웃 하시겠습니까?")) {
  //     setCartCount(0);
  //     setCartItems([]);
  //     setIsLogin(true);
  //   }
  // };

  return (
    <Container>
      <Menu>
        <IconLink to="/category">
          <div>
            <img src={Category} alt="" />
          </div>
          <div>카테고리</div>
        </IconLink>
        <IconLink to={`/reviews?page=1&size=5`}>
          <div>
            <img src={Review} alt="" />
          </div>
          <div>전체리뷰</div>
        </IconLink>
        <IconLink to={`/mypage/REVIEWS?page=${reviewPage}&size=4`}>
          <div>
            <img src={MyPage} alt="" />
          </div>
          <div>마이페이지</div>
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
          <IconLink to="/cart">
            <div>
              <img src={Cart} alt="" />
              <span>{cartCount}</span>
            </div>
            <div>장바구니</div>
          </IconLink>
        </>
      </Menu>
    </Container>
  );
};

export default Nav;

const Container = styled.nav`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  width: 100%;
  height: 72px;

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 200;

  background: rgba(255, 255, 255, 0.94);

  backdrop-filter: blur(14px);

  border-top: 1px solid rgba(0, 0, 0, 0.06);

  box-shadow:
    0 -6px 20px rgba(0, 0, 0, 0.04),
    0 -2px 6px rgba(0, 0, 0, 0.03);

  box-sizing: border-box;

  padding-bottom: env(safe-area-inset-bottom);
`;

const Menu = styled.div`
  width: 100%;
  max-width: ${layout.maxWidth};

  height: 100%;

  display: flex;
  justify-content: space-evenly;
  align-items: center;

  background: transparent;

  font-size: 13px;

  box-sizing: border-box;

  a {
    text-decoration: none;
    color: #444;
  }
`;

const IconLink = styled(Link)`
  position: relative;

  width: 72px;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 4px;

  border-radius: 18px;

  transition:
    background 0.2s,
    transform 0.2s,
    color 0.2s;

  color: #666 !important;

  &:hover {
    background: rgba(0, 0, 0, 0.04);

    transform: translateY(-1px);

    color: #111 !important;
  }

  img {
    width: 1.8rem;
    height: 1.8rem;

    object-fit: contain;

    transition: transform 0.2s;
  }

  &:hover img {
    transform: scale(1.06);
  }

  span {
    position: absolute;

    top: 10px;
    right: 14px;

    min-width: 18px;
    height: 18px;

    padding: 0 5px;

    border-radius: 999px;

    background: #111;

    color: white;

    font-size: 11px;
    font-weight: 700;

    display: flex;
    justify-content: center;
    align-items: center;

    box-sizing: border-box;

    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
  }
`;
