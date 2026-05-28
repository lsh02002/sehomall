import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import SkillPicture from "../assets/success-2081167_640.webp";

const AboutPage = () => {
  const [tab, setTab] = useState(0);

  const tabContents = [
    {
      content: (
        <>
          <p>
            안녕하세요? SEHOMALL(clone coding)의 개발자입니다.
            <br />
            제가 이번에 웹 개발자 포트폴리오 용으로 쇼핑몰을 제작하게
            되었습니다.
            <br />
            <br />
            부트캠프(풀스택 과정)을 수료하고 개인적으로는 처음 만드는
            쇼핑몰이라서 기대도 되고 걱정도 많이 되는 것 같습니다.
            <br />
            <br />
            쇼핑몰이 웹프로젝트를 개발할 때 기능이 가장 많이 들어가고 제작하기가
            가장 난이도가 높기 때문에 실력을 쌓기 좋아서 쇼핑몰을 선택하게
            되었습니다.
            <br />
            <br />
            제 웹 사이트를 구경해주시고 혹시 오류나 기능 추가하라고 피드백 주실
            내용이 있으시면 저에게 알려 주시면 너무나 도움이 많이 될것 같습니다.
            <br />
            <br />
            감사합니다.
          </p>

          <p className="fw-bold mt-4">개발자: 이세호</p>
        </>
      ),
    },

    {
      content: (
        <>
          <p>
            이메일: lsh02002@hanmail.net
            <br />
            <br />
            블로그: https://blog.naver.com/lsh02002
            <br />
            <br />
            깃허브: https://github.com/lsh02002
            <br />
            <br />
            대학교: 학점은행제 대학교
            <br />
            기계설계전공(학점: 3.7)
            <br />
            컴퓨터공학전공(복수전공, 학점: 4.21)
            <br />
            <br />
            자격증:
            <br />
            기계설계산업기사
            <br />
            전산응용기계제도기능사
            <br />
            정보처리산업기사
            <br />
            네트워크관리사2급
            <br />
            워드프로세서3급
            <br />
            TCT(한국번역가협회 준회원)
            <br />
            슈퍼코딩 부트캠프 (풀스택 과정) 수료
            <span>(2023.09~2024.10)</span>
          </p>

          <p className="fw-bold mt-4">개발자: 이세호</p>
        </>
      ),
    },

    {
      content: (
        <>
          <img
            src={SkillPicture}
            alt=""
            className="img-fluid rounded-5 shadow mb-4"
            style={{
              width: "260px",
              height: "260px",
              objectFit: "cover",
            }}
          />

          <p>
            쇼핑몰 구현에 사용된 기술:
            <br />
            프론트엔드 - REACT
            <br />
            백엔드 - SPRING BOOT
            <br />
            <br />
            그밖에 관심있는 분야:
            <br />
            인공지능 딥러닝 자연어 처리
            <br />
            Transfomer
            <br />
            (순전히 개인적인 관심분야)
          </p>

          <p className="fw-bold mt-4">개발자: 이세호</p>
        </>
      ),
    },
  ];

  return (
    <Layout>
      <div
        className="
          w-100 min-vh-100
          d-flex justify-content-center
          px-3 py-5
        "
        style={{
          background: "radial-gradient(circle at top, #f7f7f7, #ececec)",
        }}
      >
        <div
          className="w-100"
          style={{
            maxWidth: "1100px",
          }}
        >
          {/* TITLE */}
          <h1
            className="
              text-center fw-black mb-5
            "
            style={{
              fontSize: "clamp(38px, 6vw, 62px)",
              letterSpacing: "-2px",
              color: "#111",
              fontWeight: 900,
            }}
          >
            쇼핑몰 소개
          </h1>

          {/* CONTENT */}
          <div className="overflow-hidden">
            <div
              className="d-flex"
              style={{
                width: "300%",
                transform: `translateX(-${tab * 33.3333}%)`,
                transition: "0.5s ease",
              }}
            >
              {tabContents.map((item, index) => (
                <div
                  key={index}
                  className="
                    d-flex flex-column justify-content-center
                    bg-white bg-opacity-75
                    rounded-5 shadow-lg
                  "
                  style={{
                    width: "100%",
                    minHeight: "620px",
                    padding: "50px",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div
                    style={{
                      color: "#333",
                      lineHeight: "1.9",
                      fontSize: "16px",
                    }}
                  >
                    {item.content}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BUTTONS */}
          <div className="d-flex justify-content-center gap-3 mt-4">
            {[0, 1, 2].map((idx) => (
              <button
                key={idx}
                onClick={() => setTab(idx)}
                className="border-0 rounded-circle"
                style={{
                  width: "16px",
                  height: "16px",
                  transition: "0.25s",
                  background:
                    tab === idx
                      ? "linear-gradient(135deg,#ff4d4f,#ff1f5a)"
                      : "#d9d9d9",
                  transform: tab === idx ? "scale(1.3)" : "scale(1)",
                  boxShadow:
                    tab === idx ? "0 8px 20px rgba(255,31,90,0.35)" : "none",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
