import styled from "styled-components";
import Intro01 from "../assets/intro-01.jpg";
import Intro02 from "../assets/intro-02.jpg";
import { Link } from "react-router-dom";

const Intro = () => {
  return (
    <>
      <Introduction>
        <Link to="/about">
          <div className="main__intro-container-img">
            <img className="main__intro-image" src={Intro01} alt="" />
            <div className="main__intro-text-container">
              <h3 className="main__intro-title">ABOUT</h3>
              <span className="main__intro-description">홈페이지 소개</span>
            </div>
          </div>
        </Link>
        <Link to="/notice">
          <div className="main__intro-container-img">
            <img className="main__intro-image" src={Intro02} alt="" />
            <div className="main__intro-text-container">
              <h3 className="main__intro-title">공지사항</h3>
              <span className="main__intro-description">알려드릴 소식</span>
            </div>
          </div>
        </Link>
        <Link to="https://github.com/lsh02002">
          <div className="main__intro-container-img">
            <img className="main__intro-image" src={Intro01} alt="" />
            <div className="main__intro-text-container">
              <h3 className="main__intro-title">개발자<br/> 깃허브</h3>
              <span className="main__intro-description">
                개발자의 웹 관련 소스들
              </span>
            </div>
          </div>
        </Link>
        <Link to="/contact">
          <div className="main__intro-container-img">
            <img className="main__intro-image" src={Intro02} alt="" />
            <div className="main__intro-text-container">
              <h3 className="main__intro-title">연락처</h3>
              <span className="main__intro-description">
                연락처를 구하는 곳
              </span>
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
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  max-width: 1600px;
  height: 100%;
  flex-wrap: wrap;
  border: 1px solid lightgray;
  
  .main__intro-container-img {
    width: 135px;
    height: 135px;
    overflow: hidden;
    margin: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
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
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .main__intro-title {
    color: white;
    /* font-size: 35px; */
    font-weight: 600;
    margin-bottom: 10px;    
  }

  .main__intro-description {
    color: white;
  }
`;
