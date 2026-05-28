import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../api/cartContextApi";
import { useMyPage } from "../../api/myPageTabContextApi";
import { cartData } from "../data/cartData";

import Category from "../../assets/category.svg";
import Review from "../../assets/review.svg";
import MyPage from "../../assets/my-page.svg";
import Cart from "../../assets/cart.svg";
import { layout } from "../../them/them";

const Nav = () => {
  const { reviewPage } = useMyPage();
  const { cartCount, setCartCount, setCartItems } = useCart();

  useEffect(() => {
    setCartItems(cartData?.content);
    setCartCount(cartData?.content.length);
  }, [setCartCount, setCartItems]);

  return (
    <nav
      className="
        position-fixed start-0 end-0 bottom-0
        w-100 d-flex justify-content-center align-items-center
        bg-white border-top
      "
      style={{
        height: "72px",
        zIndex: 200,
        background: "rgba(255,255,255,0.94)",
        backdropFilter: "blur(14px)",
        boxShadow: "0 -6px 20px rgba(0,0,0,0.04), 0 -2px 6px rgba(0,0,0,0.03)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div
        className="
          w-100 h-100
          d-flex justify-content-evenly align-items-center
        "
        style={{
          maxWidth: layout.maxWidth,
          fontSize: "13px",
        }}
      >
        <IconMenu to="/category" icon={Category} label="카테고리" />

        <IconMenu to="/reviews?page=1&size=5" icon={Review} label="전체리뷰" />

        <IconMenu
          to={`/mypage/REVIEWS?page=${reviewPage}&size=4`}
          icon={MyPage}
          label="마이페이지"
        />

        <IconMenu to="/cart" icon={Cart} label="장바구니" count={cartCount} />
      </div>
    </nav>
  );
};

export default Nav;

type IconMenuProps = {
  to: string;
  icon: string;
  label: string;
  count?: number;
};

const IconMenu = ({ to, icon, label, count }: IconMenuProps) => {
  return (
    <Link
      to={to}
      className="
        position-relative
        h-100
        d-flex flex-column justify-content-center align-items-center
        gap-1
        text-decoration-none
      "
      style={{
        width: "72px",
        borderRadius: "18px",
        color: "#666",
        transition: "0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(0,0,0,0.04)";
        e.currentTarget.style.transform = "translateY(-1px)";
        e.currentTarget.style.color = "#111";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.color = "#666";
      }}
    >
      <div className="position-relative">
        <img
          src={icon}
          alt={label}
          style={{
            width: "1.8rem",
            height: "1.8rem",
            objectFit: "contain",
          }}
        />

        {count !== undefined && (
          <span
            className="
              position-absolute
              d-flex justify-content-center align-items-center
              rounded-pill
              text-white fw-bold
            "
            style={{
              top: "-8px",
              right: "-12px",
              minWidth: "18px",
              height: "18px",
              padding: "0 5px",
              background: "#111",
              fontSize: "11px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
            }}
          >
            {count}
          </span>
        )}
      </div>

      <div>{label}</div>
    </Link>
  );
};
