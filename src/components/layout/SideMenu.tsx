import React from "react";
import { Link } from "react-router-dom";

const SideMenu = () => {
  return (
    <div
      className="
        position-fixed top-0 start-0
        d-flex flex-column align-items-center
        bg-white bg-opacity-75
      "
      style={{
        width: "200px",
        marginTop: "10px",
        padding: "30px 0",
        zIndex: 5,
        backdropFilter: "blur(8px)",
      }}
    >
      {/* TITLE */}
      <div
        className="w-100 text-center mb-4"
        style={{
          fontSize: "40px",
          color: "red",
          fontWeight: 700,
        }}
      >
        <Link
          to="/"
          className="text-decoration-none"
          style={{
            color: "inherit",
          }}
        >
          SEHOMALL{" "}
          <span
            style={{
              fontSize: "18px",
              fontWeight: 400,
            }}
          >
            (clone coding)
          </span>
        </Link>
      </div>

      {/* MENU */}
      <MenuLink to="/cat/new">NEW ARRIVAL</MenuLink>
      <MenuLink to="/cat/BAGS">BAGS</MenuLink>
      <MenuLink to="/cat/WALLETS">WALLETS</MenuLink>
      <MenuLink to="/cat/ACCESSORIES">ACCESSORIES</MenuLink>
      <MenuLink to="/cat/SCARVES">SCARVES</MenuLink>
      <MenuLink to="/about">ABOUT</MenuLink>
      <MenuLink to="/notice?page=1&size=5">NOTICE</MenuLink>
      <MenuLink to="/contact">CONTACT</MenuLink>
      <MenuLink to="/instagram">INSTAGRAM</MenuLink>

      {/* MESSAGE */}
      <div
        className="
          w-100 mt-4 p-3
          text-white
        "
        style={{
          fontSize: "14px",
          background: "gray",
          lineHeight: "1.6",
        }}
      >
        백엔드 비용이 발생하여 프론트엔드에서 가짜(더미)데이터를 사용하기로
        했습니다. 작업을 놓고 있었는데 디자인도 업데이트 노력하겠습니다.
      </div>
    </div>
  );
};

export default SideMenu;

type MenuLinkProps = {
  to: string;
  children: React.ReactNode;
};

const MenuLink = ({ to, children }: MenuLinkProps) => {
  return (
    <Link
      to={to}
      className="
        w-100 text-decoration-none text-dark
      "
      style={{
        padding: "10px 30px",
        transition: "0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(82,72,72,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
    >
      {children}
    </Link>
  );
};
