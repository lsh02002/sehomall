import Intro01 from "../assets/intro-01.jpg";
import Intro02 from "../assets/intro-02.jpg";
import { Link } from "react-router-dom";
import { layout } from "../theme/theme";

const introItems = [
  {
    to: "/about",
    image: Intro01,
    title: "ABOUT",
    description: "홈페이지 소개",
  },
  {
    to: "/notice",
    image: Intro02,
    title: "공지사항",
    description: "알려드릴 소식",
  },
  {
    to: "https://github.com/lsh02002",
    image: Intro01,
    title: (
      <>
        개발자
        <br />
        깃허브
      </>
    ),
    description: "개발자의 웹 관련 소스들",
    external: true,
  },
  {
    to: "/contact",
    image: Intro02,
    title: "연락처",
    description: "연락처를 구하는 곳",
  },
];

const Intro = () => {
  return (
    <section
      className="
        d-flex flex-wrap
        justify-content-start align-items-center
        border rounded-4
        mt-5 p-3
      "
      style={{
        width: "100%",
        maxWidth: layout.maxWidth,
        borderColor: "lightgray",
      }}
    >
      {introItems.map((item, index) => {
        const content = (
          <div
            className="
              position-relative
              overflow-hidden
              rounded-circle
              d-flex flex-column
              justify-content-center align-items-center
            "
            style={{
              width: "110px",
              height: "110px",
              margin: "15px",
              cursor: "pointer",
            }}
          >
            <img
              src={item.image}
              alt=""
              className="w-100 h-100"
              style={{
                objectFit: "cover",
                filter: "brightness(0.8)",
                transition: "transform 0.5s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            />

            <div
              className="
                position-absolute
                d-flex flex-column align-items-center
                text-center
              "
              style={{
                bottom: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "100%",
              }}
            >
              <h3
                className="text-white fw-semibold mb-2"
                style={{
                  fontSize: "var(--main-h3-size)",
                }}
              >
                {item.title}
              </h3>

              <span className="text-white small">{item.description}</span>
            </div>
          </div>
        );

        return item.external ? (
          <a
            key={index}
            href={item.to}
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none"
          >
            {content}
          </a>
        ) : (
          <Link key={index} to={item.to} className="text-decoration-none">
            {content}
          </Link>
        );
      })}
    </section>
  );
};

export default Intro;
