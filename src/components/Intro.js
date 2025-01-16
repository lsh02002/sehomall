import styled from "styled-components";
import Intro01 from "../assets/intro-01.jpg";
import Intro02 from "../assets/intro-02.jpg";
import Intro03 from "../assets/intro-03.jpg";
import { Link } from "react-router-dom";

const Intro = () => {
  return (
    <>
      <Introduction>
        <Link to="/about">
          <div class="main__intro-container-img">
            <img class="main__intro-image" src={Intro01} alt="" />
            <div class="main__intro-text-container">
              <h2 class="main__intro-title">ABOUT</h2>
              <span class="main__intro-description">홈페이지 소개</span>
            </div>
          </div>
        </Link>
        <Link to="/notice">
          <div class="main__intro-container-img">
            <img class="main__intro-image" src={Intro02} alt="" />
            <div class="main__intro-text-container">
              <h2 class="main__intro-title">공지사항</h2>
              <span class="main__intro-description">알려드릴 소식</span>
            </div>
          </div>
        </Link>
        <Link to="https://github.com/lsh02002">
          <div class="main__intro-container">
            <h2 class="main__intro-title main__intro-title--black">
              개발자 깃허브
            </h2>
            <span class="main__intro-description main__intro-description--black">
              개발자의 웹 관련 소스들
            </span>
          </div>
        </Link>
        <Link to="/contact">
          <div class="main__intro-container-img">
            <img class="main__intro-image" src={Intro03} alt="" />
            <div class="main__intro-text-container">
              <h2 class="main__intro-title">연락처</h2>
              <span class="main__intro-description">연락처를 구하는 곳</span>
            </div>
          </div>
        </Link>
      </Introduction>
    </>
  );
};

export default Intro;

const Introduction = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;

  .main__intro-container-img,
  .main__intro-container {
    width: 350px;
    height: 350px;
    overflow: hidden;
    margin: 0 20px;
  }

  .main__intro-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ebe7de;
  }

  .main__intro-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.8);
  }

  .main__intro-container-img {
    position: relative;
  }

  .main__intro-text-container {
    position: absolute;
    bottom: 20px;
    left: 20px;
  }

  .main__intro-title {
    color: white;
    font-size: 35px;
    font-weight: 600;
    margin-bottom: 10px;
  }

  .main__intro-description {
    color: white;
  }

  .main__intro-title--black {
    color: black;
  }

  .main__intro-description--black {
    color: black;
  }
`;
