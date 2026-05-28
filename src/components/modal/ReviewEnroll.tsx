import React, { useState } from "react";
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

  const OnSelectChangeField = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setErrMessage("");

    setState({
      ...state,
      [e.target.name]: parseInt(e.target.value),
    });
  };

  const OnTextAreaChangeField = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setErrMessage("");

    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
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
    <div
      className="
      position-fixed top-0 start-0
      w-100 h-100
      d-flex justify-content-center align-items-center
    "
      style={{
        backgroundColor: "rgba(0,0,0,0.4)",
        zIndex: 999,
      }}
      onClick={() => setIsReview(false)}
    >
      <div
        className="
        position-absolute top-50 start-50
        translate-middle
        d-flex flex-column gap-4
        bg-white bg-opacity-100
        p-4 rounded-5 shadow-lg
      "
        style={{
          width: "320px",
          zIndex: 10,
          backdropFilter: "blur(12px)",
          maxHeight: "calc(100vh - 200px)",
          overflowY: "auto",
        }}
      >
        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center">
          <div
            className="fw-bold"
            style={{
              fontSize: "20px",
            }}
          >
            후기 등록
          </div>

          <button
            onClick={() => setIsReview(false)}
            className="btn border-0 bg-transparent"
          >
            X
          </button>
        </div>

        {/* ITEM INFO */}
        {item ? (
          <>
            <div className="border rounded-4 bg-light p-3">
              상품명: {item.name}
            </div>

            <div className="border rounded-4 bg-light p-3">
              작성자: {nickname}
            </div>
          </>
        ) : (
          <>
            <div className="border rounded-4 bg-light p-3">
              구매완료 상품명:
              <select
                className="form-select mt-2"
                value={state.unReviewedItemId}
                name="unReviewedItemId"
                onChange={OnSelectChangeField}
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
            </div>

            <div className="border rounded-4 bg-light p-3">
              작성자: {nickname}
            </div>
          </>
        )}

        {/* FILE */}
        <input
          type="file"
          id="review-file"
          hidden
          onChange={encodeFileToBase64}
        />

        <div className="border rounded-4 bg-light p-3">
          <div className="d-flex align-items-center gap-3">
            <span>후기 사진:</span>

            <label
              htmlFor="review-file"
              className="
              d-flex justify-content-center align-items-center
              rounded-4
            "
              style={{
                width: "42px",
                height: "42px",
                background: "#f0f0f0",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: "18px",
              }}
            >
              {image ? (
                <img
                  width={40}
                  height={40}
                  src={imagePreview}
                  alt=""
                  className="rounded-3"
                />
              ) : (
                "+"
              )}
            </label>
          </div>
        </div>

        {/* TEXTAREA */}
        <textarea
          placeholder="내용을 입력하세요"
          name="content"
          value={state.content}
          onChange={OnTextAreaChangeField}
          className="form-control rounded-4"
          rows={4}
          style={{ flexShrink: 0 }}
        />

        {/* RATING */}
        <div className="border rounded-4 bg-light p-3">
          평점 선택:
          <select
            className="form-select mt-2"
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
        </div>

        {/* ERROR */}
        <div
          className="text-danger fw-semibold"
          style={{
            fontSize: "13px",
          }}
        >
          {errMessage}
        </div>

        {/* BUTTON */}
        <div className="d-flex">
          <button
            onClick={OnReviewRegister}
            className="
            btn btn-light
            w-100 rounded-4 fw-bold
          "
            style={{
              height: "48px",
            }}
          >
            리뷰 등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewEnroll;
