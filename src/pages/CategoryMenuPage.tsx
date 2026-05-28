import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { layout } from "../theme/theme";

const menuItems = [
  {
    to: "/cat/new",
    title: "NEW",
    desc: "새 상품",
  },
  {
    to: "/cat/BAGS",
    title: "BAGS",
    desc: "가방",
  },
  {
    to: "/cat/WALLETS",
    title: "WALLETS",
    desc: "지갑",
  },
  {
    to: "/cat/ACCESSORIES",
    title: "ACCESSORIES",
    desc: "악세서리",
  },
  {
    to: "/cat/SCARVES",
    title: "SCARVES",
    desc: "스카프",
  },
  {
    to: "/about",
    title: "ABOUT",
    desc: "쇼핑몰 소개",
  },
  {
    to: "/notice?page=1&size=5",
    title: "NOTICE",
    desc: "공지사항",
  },
  {
    to: "/contact",
    title: "CONTACT",
    desc: "연락처",
  },
  {
    to: "/instagram",
    title: "INSTAGRAM",
    desc: "인스타그램",
  },
];

const CategoryMenuPage = () => {
  return (
    <Layout>
      <div
        className="
          w-100 min-vh-100
          d-flex justify-content-center align-items-center
        "
        style={{
          maxWidth: layout.maxWidth,
          background: "transparent",
        }}
      >
        <div
          className="w-100"
          style={{
            margin: "20px",
            borderRadius: "32px",
            boxSizing: "border-box",
          }}
        >
          {/* TOP TEXT */}
          <div
            className="mb-3 text-secondary"
            style={{
              fontSize: "13px",
              letterSpacing: "4px",
            }}
          >
            SEHO SHOPPING
          </div>

          {/* TITLE */}
          <h1
            className="d-flex flex-column fw-bold"
            style={{
              margin: 0,
              fontSize: "clamp(36px, 6vw, 56px)",
              color: "#111",
            }}
          >
            카테고리
            <span
              className="fw-normal text-secondary mt-3"
              style={{
                fontSize: "16px",
              }}
            >
              세호쇼핑몰 클론코딩
            </span>
          </h1>

          {/* GRID */}
          <div
            className="mt-5"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
            }}
          >
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className="
                  text-decoration-none
                  d-flex flex-column justify-content-between
                  rounded-5
                "
                style={{
                  height: "100px",
                  padding: "20px",
                  background: "#fafafa",
                  border: "1px solid #f0f0f0",
                  transition:
                    "transform 0.25s, box-shadow 0.25s, background 0.25s",
                  boxSizing: "border-box",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";

                  e.currentTarget.style.background = "white";

                  e.currentTarget.style.boxShadow =
                    "0 16px 30px rgba(0,0,0,0.08), 0 4px 10px rgba(0,0,0,0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";

                  e.currentTarget.style.background = "#fafafa";

                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <strong
                  style={{
                    fontSize: "20px",
                    color: "#111",
                    letterSpacing: "1px",
                  }}
                >
                  {item.title}
                </strong>

                <span
                  style={{
                    fontSize: "15px",
                    color: "#666",
                  }}
                >
                  {item.desc}
                </span>
              </Link>
            ))}
          </div>

          {/* HOME LINK */}
          <Link
            to="/"
            className="
              mt-5
              d-inline-flex align-items-center
              text-decoration-none
              fw-semibold
            "
            style={{
              color: "#111",
              transition: "0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateX(4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateX(0)";
            }}
          >
            세호쇼핑몰 메인으로 이동 →
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryMenuPage;
