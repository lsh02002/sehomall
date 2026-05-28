import React from "react";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import SkillPicture from "../assets/success-2081167_640.webp";

const AboutPage = () => {
  const OnTabClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked = true;
  };
  return (
    <Layout>
      <Container>
        <div className="tab-inner">
          <input
            type="radio"
            name="tabmenu"
            id="about-tab1"
            onChange={(e) => OnTabClick(e)}
            defaultChecked
          />
          <input
            type="radio"
            name="tabmenu"
            id="about-tab2"
            onChange={(e) => OnTabClick(e)}
          />
          <input
            type="radio"
            name="tabmenu"
            id="about-tab3"
            onChange={(e) => OnTabClick(e)}
          />
          <h1>쇼핑몰 소개</h1>
          <div className="tabs">
            <div className="items">
              <div>
                <p>
                  안녕하세요? SEHOMALL(clone coding)의 개발자입니다. <br />
                  제가 이번에 웹 개발자 포트폴리오 용으로 쇼핑몰을 제작하게
                  되었습니다.
                  <br />
                  <br />
                  부트캠프(풀스택 과정)을 수료하고 개인적으로는 처음 만드는
                  쇼핑몰이라서
                  <br />
                  기대도 되고 걱정도 많이 되는 것 같습니다.
                  <br />
                  <br />
                  쇼핑몰이 웹프로젝트를 개발할 때 기능이 가장 많이 들어가고
                  제작하기가
                  <br />
                  가장 난이도가 높기 때문에 실력을 쌓기 좋아서 쇼핑몰을 선택하게
                  <br />
                  되었습니다.
                  <br />
                  <br />
                  제 웹 사이트를 구경해주시고 혹시 오류나 기능 추가하라고 피드백
                  주실
                  <br />
                  내용이 있으시면 저에게 알려 주시면 너무나 도움이 많이 될것
                  같습니다.
                  <br />
                  <br />
                  감사합니다.
                </p>
                <p>
                  <b>개발자: 이세호</b>
                </p>
              </div>
              <div>
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
                <p>
                  <b>개발자: 이세호</b>
                </p>
              </div>
              <div>
                <img src={SkillPicture} alt="" />
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
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                </p>
                <p>
                  <b>개발자: 이세호</b>
                </p>
              </div>
            </div>
          </div>
          <div className="btn">
            <label htmlFor="about-tab1"></label>
            <label htmlFor="about-tab2"></label>
            <label htmlFor="about-tab3"></label>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default AboutPage;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;

  padding: 60px 20px;

  display: flex;
  justify-content: center;

  background: radial-gradient(circle at top, #f7f7f7, #ececec);

  box-sizing: border-box;

  .tab-inner {
    width: 100%;
    max-width: 1100px;
  }

  .tab-inner h1 {
    margin-bottom: 50px;

    text-align: center;

    font-size: clamp(38px, 6vw, 62px);
    font-weight: 900;

    color: #111;
    letter-spacing: -2px;
  }

  input[name="tabmenu"] {
    display: none;
  }

  .tabs {
    width: 100%;
    overflow: hidden;
  }

  .items {
    width: 300%;
    display: flex;

    transition: transform 0.5s ease;
  }

  .items > div {
    width: 100%;
    min-height: 620px;

    padding: 50px;

    border-radius: 32px;

    background: rgba(255, 255, 255, 0.82);

    backdrop-filter: blur(10px);

    box-shadow:
      0 20px 50px rgba(0, 0, 0, 0.08),
      0 4px 10px rgba(0, 0, 0, 0.04);

    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    justify-content: center;

    position: relative;
  }

  .items div p {
    margin: 0;

    color: #333;

    line-height: 1.9;

    font-size: 16px;
  }

  .items div p b {
    margin-top: 30px;

    display: inline-block;

    font-size: 18px;
    color: #111;
  }

  .items div img {
    width: 260px;
    height: 260px;

    object-fit: cover;

    border-radius: 28px;

    margin: 0 auto 40px auto;

    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
  }

  .btn {
    margin-top: 30px;

    display: flex;
    justify-content: center;
    gap: 14px;
  }

  .btn label {
    width: 16px;
    height: 16px;

    border-radius: 50%;

    background: #d9d9d9;

    cursor: pointer;

    transition:
      transform 0.25s,
      background 0.25s;
  }

  .btn label:hover {
    transform: scale(1.2);
  }

  .tab-inner input[id="about-tab1"]:checked ~ .tabs .items {
    transform: translateX(0%);
  }

  .tab-inner input[id="about-tab2"]:checked ~ .tabs .items {
    transform: translateX(-33.3333%);
  }

  .tab-inner input[id="about-tab3"]:checked ~ .tabs .items {
    transform: translateX(-66.6666%);
  }

  .tab-inner input[id="about-tab1"]:checked ~ .btn label[for="about-tab1"],
  .tab-inner input[id="about-tab2"]:checked ~ .btn label[for="about-tab2"],
  .tab-inner input[id="about-tab3"]:checked ~ .btn label[for="about-tab3"] {
    background: linear-gradient(135deg, #ff4d4f, #ff1f5a);

    transform: scale(1.3);

    box-shadow: 0 8px 20px rgba(255, 31, 90, 0.35);
  }

  @media (max-width: 768px) {
    padding: 40px 16px;

    .items > div {
      padding: 32px 24px;
      min-height: auto;
    }

    .items div img {
      width: 180px;
      height: 180px;
    }

    .items div p {
      font-size: 14px;
    }
  }
`;
