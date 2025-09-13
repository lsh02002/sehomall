import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { EnrollReview, GetUnReviewedItems } from "../../api/sehomallApi";
import { itemType, unReviewedItemType } from "../../types/type";

type ReviewEnrollPropsType = {
  item: itemType | null;
  setIsReview: (b: boolean) => void;
  isReviewUpdated: boolean;
  setIsReviewUpdated: (b: boolean) => void;
};

const ReviewEnroll = ({
  item,
  setIsReview,
  isReviewUpdated,
  setIsReviewUpdated,
}: ReviewEnrollPropsType) => {
  const nickname = localStorage.getItem("nickname");

  const [imagePreview, setImagePreview] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [state, setState] = useState({
    content: "",
    rating: 5,
    unReviewedItemId: -1,
  });

  const [unReviewedItems, setUnReviewedItems] = useState([]);

  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    GetUnReviewedItems()
      .then((res) => {
        console.log(res);
        setUnReviewedItems(res.data);
        /* 매우 중요!!! */
        setState({ ...state, unReviewedItemId: res.data[0].id });

        if (res.headers?.accesstoken) {
          localStorage.setItem("accessToken", res.headers?.accesstoken);
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.response) {
          setErrMessage(err.response.data.detailMessage);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const OnSelectChangeField = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setErrMessage("");
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const OnTextAreaChangeField = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setErrMessage("");
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const OnReviewRegister = () => {
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

    if (image) {
      formDataToSend.append("files", image);
    }

    EnrollReview(formDataToSend)
      .then((res) => {
        // console.log(res);

        if (res.headers?.accesstoken) {
          localStorage.setItem("accessToken", res.headers?.accesstoken);
        }
        setIsReviewUpdated(!isReviewUpdated);
        setIsReview(false);
      })
      .catch((err) => {
        console.error(err);
        if (err.response) {
          setErrMessage(err.response.data.detailMessage);
        }
      });
  };

  const encodeFileToBase64 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrMessage("");
    const file = e.target.files?.[0];
    if (!file) return;
    
    setImage(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise((resolve) => {
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImagePreview(reader.result);
          resolve(reader.result);
        }
      };
    });
  };

  return (
    <Enroll>
      <div>
        후기 등록<button onClick={() => setIsReview(false)}>X</button>
      </div>
      {item ? (
        <>
          <span>상품명: {item.name}</span>
          <span>작성자: {nickname}</span>
        </>
      ) : (
        <>
          <span>
            구매완료 상품명:
            <select
              style={{ marginLeft: "20px", width: "70%", height: "40px" }}
              value={state.unReviewedItemId}
              name="unReviewedItemId"
              onChange={(e) => OnSelectChangeField(e)}
            >
              {unReviewedItems.length > 0 ? (
                unReviewedItems.map((item: unReviewedItemType, index) => (
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
          <span>작성자: {nickname}</span>
        </>
      )}
      <input
        type="file"
        id="review-file"
        onChange={(e) => encodeFileToBase64(e)}
      />
      <div className="btn">
        <span>
          후기 사진:
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
        onChange={OnTextAreaChangeField}
      />
      <span>
        평점 선택:
        <select
          name="rating"
          value={state.rating}
          onChange={OnSelectChangeField}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </span>
      <TextMessage>{errMessage}</TextMessage>
      <div className="add-button">
        <button onClick={OnReviewRegister}>리뷰 등록</button>
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

  div:nth-child(1) {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      border: none;
      background-color: transparent;
      font-size: 1.2em;
      cursor: pointer;
      &:hover {
        transform: scale(0.9);
      }
    }
  }

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
    margin-bottom: 5px;
  }

  .btn span {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 5px;
    border: 1px solid lightgray;
    box-sizing: border-box;
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
    margin-left: 10px;
  }

  textarea {
    width: 100%;
    height: 170px;
    box-sizing: border-box;
    border: 1px solid gray;
  }

  .add-button {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-item: center;
    padding-top: 20px;

    button {
      border: none;
      padding: 5px 10px;
      color: white;
      background-color: gray;
      cursor: pointer;
      font-size: 1em;
      &:hover {
        background-color: lightgray;
      }
    }
  }
`;

const TextMessage = styled.div`
  color: red;
`;
