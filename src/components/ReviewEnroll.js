import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { EnrollReview, GetUnReviewedItemNames } from "../api/ItemApi";

const ReviewEnroll = ({
  item,
  setIsReview,
  isReviewEdited,
  setIsReviewEdited,
}) => {
  const nickname = localStorage.getItem("nickname");

  const [imagePreview, setImagePreview] = useState("");
  const [image, setImage] = useState("");
  const [state, setState] = useState({
    content: "",
    rating: 5,
    unReviewedItemId: -1,
  });

  const [unReviewedItems, setUnReviewedItems] = useState([]);

  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    GetUnReviewedItemNames()
      .then((res) => {
        console.log(res);
        setUnReviewedItems(res.data);
        /* 매우 중요!!! */
        setState({ ...state, unReviewedItemId: res.data[0].id });
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const OnChangeField = (e) => {
    setErrMessage("");
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const OnReviewRegister = () => {
    if(!unReviewedItems.find(reviewed=>reviewed.id === item?.id)){
      setErrMessage("해당 상품을 구매하신적이 없으십니다.");
      return;
    }

    const itemId = item !== null ? item?.id : state.unReviewedItemId;
    const data = {
      content: state.content,
      rating: state.rating,
      itemId,
    };
    const formDataToSend = new FormData();
    formDataToSend.append(
      "reviewRequest",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    console.log(state.image);

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
        if (err.response) {
          setErrMessage(err.response.data.detailMessage);
        }
      });
  };

  const encodeFileToBase64 = (fileBlob) => {
    setErrMessage("");    
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
      {item ? (
        <>
          <span>상품명: {item.name}</span>
          <span>작성자: {nickname}</span>
        </>
      ) : (
        <span>
          구매완료 상품명:
          <select
            style={{ marginLeft: "20px", width: "70%", height: "40px" }}
            value={state.unReviewedItemId}
            onChange={OnChangeField}
          >
            {unReviewedItems.length > 0 ? (
              unReviewedItems.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))
            ) : (
              <option value={-1} disabled>
                구매완료하신 상품이 없습니다.
              </option>
            )}
          </select>
        </span>
      )}
      <input
        type="file"
        id="review-file"
        onChange={(e) => encodeFileToBase64(e.target.files[0])}
      />
      <div className="btn">
        <span>
          <em>후기 사진</em>
          <label htmlFor="review-file">
            {image ? (
              <img width={40} height={40} src={imagePreview} alt="" />
            ) : (
              "+"
            )}
          </label>
        </span>
      </div>
      <textarea
        placeholder="내용을 입력하세요"
        name="content"
        value={state.content}
        onChange={OnChangeField}
      />
      <span>
        <em>평점 선택:</em>
        <select name="rating" value={state.rating} onChange={OnChangeField}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </span>
      <TextMessage>{errMessage}</TextMessage>
      <div className="add-button">
        {item === null ? (
          <button
            onClick={OnReviewRegister}
            disabled={state.unReviewedItemId === -1}
          >
            리뷰 등록
          </button>
        ) : (
          <button onClick={OnReviewRegister}>리뷰 등록</button>
        )}
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
  width: 500px;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 30px;
  z-index: 10;

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

const TextMessage = styled.div`
  color: red;
`;
