import React, { useContext, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { LoginContext } from "../api/loginContextApi";
import { useNavigate } from "react-router-dom";
import { EnrollReview } from "../api/ItemApi";

const ReviewEnroll = ({ itemId, itemName, setIsReview, isReviewEdited, setIsReviewEdited }) => {
  const { isLogin } = useContext(LoginContext);
  const nickname = localStorage.getItem("nickname");
  const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);

  useLayoutEffect(() => {
    if (!isLogin) {
      setIsReview(false);
      alert("로그인 하지 않으셨습니다.");
    }
  }, [isLogin, navigate, setIsReview]);

  const OnReviewRegister = () => {
    const data = {
      content,
      rating,
      itemId,
    };
    const formDataToSend = new FormData();
    formDataToSend.append(
      "reviewRequest",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    if (image) {
      formDataToSend.append("files", image);
    }

    console.log(data);

    EnrollReview(formDataToSend)
      .then((res) => {
        console.log(res);
        setIsReviewEdited(!isReviewEdited);
        setIsReview(false);
      })
      .catch((err) => {
        console.log(err);
        if(err.response){
          alert(err.response.data.detailMessage);
        }
      });
  };

  const encodeFileToBase64 = (fileBlob) => {
    setImage(fileBlob);
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImagePreview(reader.result);
        resolve();
      };
    });
  };

  return (
    <Enroll>
      <h3>후기 등록</h3>
      <span>상품명: {itemName}</span>
      <span>작성자: {nickname}</span>
      <input
        type="file"
        id="review-file"        
        onChange={(e) => encodeFileToBase64(e.target.files[0])}
      />
      <div className="btn">
        <span>
          <em>후기 사진</em>
          <label htmlFor="review-file">
            {image ? <img width={40} height={40} src={imagePreview} alt="" /> : "+"}
          </label>
        </span>
      </div>
      <textarea
        placeholder="내용을 입력하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <span>
        <em>평점 선택:</em>
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </span>
      <div className="add-button">
        <button onClick={OnReviewRegister}>리뷰 등록</button>
        <button onClick={() => setIsReview(false)}>등록창 닫기기</button>
      </div>
    </Enroll>
  );
};

export default ReviewEnroll;

const Enroll = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 800px;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 30px;

  & > span {
    display: inline-block;
    width: 100%;
    margin: 20px 20px 0 0;
    padding: 5px;
    border: 1px solid lightgray;
    box-sizing: border-box;
  }

  input[type="file"] {
    display: none;
  }
  .btn {
    padding: 10px 0;
    width: 100%;
  }

  .btn span {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 5px;
    border: 1px solid lightgray;
    box-sizing: border-box;
  }

  .btn span em {
    padding-right: 20px;
  }

  .btn label {
    display: inline-block;
    width: 40px;
    height: 40px;
    background-color: lightgray;
    margin-right: 20px;
    cursor: pointer;
    text-align: center;
    line-height: 40px;
  }

  textarea {
    width: 100%;
    height: 170px;
  }

  .add-button {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-item: center;
    padding-top: 20px;
  }
`;
