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
  .tab-inner {
    height: 900px;
  }

  .tab-inner h1 {
    text-align: center;
    font-weight: normal;
  }

  input[name="tabmenu"] {
    display: none;
  }

  .tabs {
    width: 400px;
    height: 700px;
    position: relative;
    overflow: hidden;
  }

  .items {
    width: 1200px;
    height: 500px;
    position: absolute;
    top: 0;
    left: 0;
    transition: 0.5s;    
  }

  .items div {
    width: 400px;
    height: 500px;
    float: left;
    box-sizing: border-box;
    text-align: center;
    padding: 50px;
    position: relative;
  }

  .btn {
    text-align: center;
  }

  .btn label {
    width: 15px;
    height: 15px;
    background-color: lightgray;
    display: inline-block;
    cursor: pointer;
    transition: 0.5s;
    margin-right: 5px;
  }

  .items div img {
    position: absolute;
    width: 50%;
    height: 50%;
    left: 0;
    top: 90px;
  }

  .items div p b {
    display: block;
  }

  .items div p {
    text-align: right;
    padding: 20px;    
  }

  .tab-inner input[id="about-tab1"]:checked ~ .tabs .items {
    left: 0;
  }

  .tab-inner input[id="about-tab2"]:checked ~ .tabs .items {
    left: -400px;
  }

  .tab-inner input[id="about-tab3"]:checked ~ .tabs .items {
    left: -800px;
  }

  .tab-inner input[id="about-tab1"]:checked ~ .btn label[for="about-tab1"],
  .tab-inner input[id="about-tab2"]:checked ~ .btn label[for="about-tab2"],
  .tab-inner input[id="about-tab3"]:checked ~ .btn label[for="about-tab3"] {
    background-color: red;
    border-radius: 50%;
  }
`;
