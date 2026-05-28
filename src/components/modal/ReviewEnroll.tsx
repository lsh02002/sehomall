import React, { useState } from "react";
import styled from "styled-components";
import { useReview } from "../../api/reviewContextApi";
import { fileType, itemType, reviewType } from "../../types/type";
import { itemData } from "../data/itemData";

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
  const { reviews, setReviews, reviewId } = useReview();

  const nickname = localStorage.getItem("nickname");

  const [imagePreview, setImagePreview] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [unReviewedItems] = useState(itemData?.content);

  const [state, setState] = useState({
    content: "",
    rating: 5,
    unReviewedItemId: unReviewedItems[0]?.id,
  });

  const [errMessage, setErrMessage] = useState("");

  // useEffect(() => {
  //   GetUnReviewedItems()
  //     .then((res) => {
  //       console.log(res);
  //       setUnReviewedItems(res.data);
  //       /* 매우 중요!!! */
  //       setState({ ...state, unReviewedItemId: res.data[0].id });

  //       if (res.headers?.accesstoken) {
  //         localStorage.setItem("accessToken", res.headers?.accesstoken);
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       if (err.response) {
  //         setErrMessage(err.response.data.detailMessage);
  //       }
  //     });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const OnSelectChangeField = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setErrMessage("");
    setState({ ...state, [e.target.name]: parseInt(e.target.value) });
  };

  const OnTextAreaChangeField = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setErrMessage("");
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const OnReviewRegister = () => {
    const itemId = item !== null ? item?.id : state.unReviewedItemId;
    const re = unReviewedItems?.find((it) => it?.id === itemId);

    const files: fileType[] = [];
    const review: reviewType = {
      id: reviewId,
      itemId,
      itemName: item?.name ?? re?.name ?? "",
      nickname: nickname ?? "",
      content: state?.content,
      rating: state?.rating,
      createAt: new Date().toLocaleString(),
      files,
    };

    setReviews([...reviews, review]);

    setIsReviewUpdated(!isReviewUpdated);
    setIsReview(false);
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
                unReviewedItems.map((item: itemType, index) => (
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

  width: 320px;

  transform: translate(-50%, -50%);

  padding: 24px;

  border-radius: 28px;

  background: rgba(255, 255, 255, 0.96);

  backdrop-filter: blur(12px);

  box-shadow:
    0 24px 50px rgba(0, 0, 0, 0.12),
    0 6px 14px rgba(0, 0, 0, 0.05);

  z-index: 10;

  box-sizing: border-box;

  display: flex;
  flex-direction: column;

  gap: 18px;

  div:nth-child(1) {
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;

    font-size: 20px;
    font-weight: 800;
    color: #111;

    button {
      border: none;
      background-color: transparent;

      font-size: var(--button-font-size);
      font-weight: 600;

      color: #666;

      cursor: pointer;

      transition:
        transform 0.2s,
        color 0.2s,
        opacity 0.2s;

      &:hover {
        transform: scale(0.96);
        color: #111;
        opacity: 0.8;
      }

      &:active {
        transform: scale(0.9);
      }

      &:disabled {
        opacity: 0.35;
        cursor: not-allowed;
      }
    }
  }

  & > span {
    width: 100%;

    padding: 14px 16px;

    border: 1px solid #ececec;
    border-radius: 16px;

    background: #fafafa;

    box-sizing: border-box;

    font-size: 14px;
    color: #444;
  }

  input[type="file"] {
    display: none;
  }

  .btn {
    width: 100%;

    display: flex;
    flex-direction: column;

    gap: 10px;
  }

  .btn span {
    width: 100%;

    display: flex;
    align-items: center;

    padding: 12px;

    border: 1px solid #ececec;
    border-radius: 18px;

    background: #fafafa;

    box-sizing: border-box;

    font-size: 14px;
    color: #444;
  }

  .btn label {
    width: 42px;
    height: 42px;

    margin-right: 14px;

    border-radius: 14px;

    background: #f0f0f0;

    display: flex;
    justify-content: center;
    align-items: center;

    color: #555;

    font-size: 18px;
    font-weight: 700;

    cursor: pointer;

    transition:
      background 0.2s,
      transform 0.2s,
      color 0.2s;

    &:hover {
      background: #111;
      color: white;
      transform: translateY(-1px);
    }
  }

  textarea {
    width: 100%;
    min-height: 180px;

    padding: 16px;

    border: 1px solid #e8e8e8;
    border-radius: 20px;

    background: #fafafa;

    box-sizing: border-box;

    resize: none;

    font-size: 14px;
    line-height: 1.7;

    transition:
      border 0.2s,
      background 0.2s,
      box-shadow 0.2s;

    &:focus {
      outline: none;

      background: white;

      border-color: #111;

      box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.04);
    }
  }

  .add-button {
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;

    gap: 12px;

    padding-top: 8px;

    button {
      flex: 1;

      height: 48px;

      border: 1px solid #e5e5e5;
      border-radius: 16px;

      background: #fafafa;

      color: #333;

      font-size: var(--button-font-size);
      font-weight: 700;

      display: flex;
      justify-content: center;
      align-items: center;

      cursor: pointer;

      box-shadow:
        0 4px 10px rgba(0, 0, 0, 0.04),
        0 1px 3px rgba(0, 0, 0, 0.03);

      transition:
        background 0.2s,
        transform 0.2s,
        box-shadow 0.25s,
        border-color 0.2s,
        color 0.2s;

      &:hover {
        background: white;

        border-color: #d0d0d0;

        transform: translateY(-1px);

        box-shadow:
          0 8px 18px rgba(0, 0, 0, 0.06),
          0 2px 6px rgba(0, 0, 0, 0.04);

        color: #111;
      }

      &:active {
        transform: scale(0.96);
      }

      &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
        box-shadow: none;
      }
    }
  }
`;

const TextMessage = styled.div`
  margin-top: -8px;

  padding-left: 4px;

  color: #e60023;

  font-size: 13px;
  font-weight: 600;
`;
