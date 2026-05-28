import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Layout from "../components/layout/Layout";
import HeartCount from "../components/HeartCount";
import ReviewCard from "../components/card/ReviewCard";
import ReviewEnroll from "../components/modal/ReviewEnroll";

import { useLogin } from "../api/loginContextApi";
import { useCart } from "../api/cartContextApi";
import { useReview } from "../api/reviewContextApi";

import { itemData } from "../components/data/itemData";

import { itemCartType, itemType, reviewType } from "../types/type";

import { layout } from "../them/them";

const DetailPage = () => {
  const { isLogin } = useLogin();

  const { setCartCount, cartItems, setCartItems, isEditing, setIsEditing } =
    useCart();

  const { reviews, isReviewUpdated, setIsReviewUpdated } = useReview();

  const { id } = useParams();

  const navigate = useNavigate();

  const [item, setItem] = useState<itemType | null>(null);

  const [isReview, setIsReview] = useState(false);

  const [itemCount, setItemCount] = useState(1);

  const itemId = parseInt(id ?? "0");

  useEffect(() => {
    const foundItem = itemData?.content?.find((i: itemType) => i.id === itemId);

    if (!foundItem) {
      alert("해당 상품을 찾을 수 없습니다.");

      navigate(-1);

      return;
    }

    setItem(foundItem);
  }, [itemId, navigate]);

  const itemReviews = useMemo(() => {
    return reviews?.filter((review: reviewType) => review?.itemId === itemId);
  }, [reviews, itemId]);

  const OnAddToCartClick = () => {
    if (!isLogin) {
      alert("장바구니 기능은 로그인 하셔야 합니다.");

      return;
    }

    if (cartItems?.find((it) => it.itemId === item?.id)) {
      alert("이미 이 상품이 장바구니에 있습니다.");

      return;
    }

    const tempItem: itemCartType = {
      itemId: item?.id ?? 0,
      itemCount,
      itemName: item?.name ?? "",
      price: item?.price ?? 0,
      fileUrl: item?.files?.[0]?.fileUrl ?? "",
      checked: true,
      heartCount: item?.heartCount ?? 0,
    };

    setCartItems([...cartItems, tempItem]);

    setCartCount(cartItems.length + 1);

    setIsEditing(!isEditing);
  };

  const OnOrderClick = () => {
    if (!isLogin) {
      alert("지금 구매하기 기능은 로그인 하셔야 합니다.");

      return;
    }

    navigate(
      `/pay?isFromCart=false&itemId=${id}&itemName=${item?.name}&price=${item?.price}&fileUrl=${item?.files?.[0]?.fileUrl}&heartCount=${item?.heartCount}&itemCount=${itemCount}&isCheckedItem=${true}`,
    );
  };

  return (
    <Layout>
      {/* MAIN */}
      <div
        className="
          w-100
          mx-auto mt-5
          px-3
        "
        style={{
          maxWidth: layout.maxWidth,
        }}
      >
        <div className="row g-5">
          {/* IMAGE */}
          <div className="col-12 col-lg-7">
            <div
              className="
                overflow-hidden
                rounded-5
                shadow-lg
                bg-light
                position-sticky
              "
              style={{
                aspectRatio: "1 / 1",
                top: "100px",
              }}
            >
              {item && (
                <img
                  src={item.files[0].fileUrl}
                  alt={item.name}
                  className="w-100 h-100"
                  style={{
                    objectFit: "cover",
                    transition: "transform 0.5s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.03)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />
              )}
            </div>
          </div>

          {/* INFO */}
          <div className="col-12 col-lg-5">
            <div className="d-flex flex-column">
              {item && (
                <>
                  <h1
                    className="fw-bold mb-4"
                    style={{
                      fontSize: "clamp(32px,5vw,48px)",
                      lineHeight: 1.1,
                    }}
                  >
                    {item.name}
                  </h1>

                  <InfoRow
                    title="Price"
                    value={
                      <span className="text-danger fw-bold">
                        {item.price.toLocaleString()}원
                      </span>
                    }
                  />

                  <InfoRow title="적립금" value={<span>0 원</span>} />

                  <InfoRow
                    title="설명"
                    value={<span>{item.description}</span>}
                  />

                  <InfoRow title="Size" value={<span>{item.size}</span>} />

                  <InfoRow
                    title="Care Guide"
                    value={<span>{item.careGuide}</span>}
                  />

                  <div className="py-3 border-bottom">
                    <HeartCount id={item.id} heartCount={item.heartCount} />
                  </div>

                  {/* COUNT */}
                  <div
                    className="
                      d-flex justify-content-between align-items-center
                      rounded-5 bg-light
                      mt-4 p-3
                    "
                  >
                    <button
                      onClick={() => setItemCount(itemCount + 1)}
                      className="
                        btn btn-light
                        rounded-circle
                        shadow-sm
                      "
                      style={{
                        width: "42px",
                        height: "42px",
                      }}
                    >
                      +
                    </button>

                    <span className="fw-bold">수량: {itemCount}</span>

                    <button
                      onClick={() =>
                        setItemCount(itemCount > 1 ? itemCount - 1 : 1)
                      }
                      className="
                        btn btn-light
                        rounded-circle
                        shadow-sm
                      "
                      style={{
                        width: "42px",
                        height: "42px",
                      }}
                    >
                      -
                    </button>
                  </div>
                </>
              )}

              {/* BUY */}
              <button
                onClick={OnOrderClick}
                className="
                  btn btn-dark
                  rounded-5 fw-bold
                  mt-4 py-3
                  shadow-lg
                "
                style={{
                  fontSize: "17px",
                }}
              >
                지금 구매하기
              </button>

              {/* CART */}
              <button
                onClick={OnAddToCartClick}
                className="
                  btn btn-light
                  border rounded-5 fw-bold
                  mt-3 py-3
                "
                style={{
                  fontSize: "16px",
                }}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* REVIEW TITLE */}
      <div
        className="
          w-100
          d-flex justify-content-between align-items-center
          mx-auto mt-5 mb-4
          px-3
        "
        style={{
          maxWidth: layout.maxWidth,
        }}
      >
        <span
          className="fw-bold"
          style={{
            fontSize: "28px",
          }}
        >
          상품 구매 후기(
          {item && item.reviewCount})
        </span>

        <button
          onClick={() => setIsReview(true)}
          className="
            btn btn-light
            border rounded-pill
            fw-bold shadow-sm
            px-4
          "
          style={{
            height: "48px",
          }}
        >
          후기 등록
        </button>
      </div>

      {/* REVIEW MODAL */}
      {isReview && (
        <div
          className="
            position-fixed
            top-0 start-0
            w-100 h-100
          "
          style={{
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(4px)",
            zIndex: 100,
          }}
        >
          <ReviewEnroll
            item={item}
            setIsReview={setIsReview}
            isReviewUpdated={isReviewUpdated}
            setIsReviewUpdated={setIsReviewUpdated}
          />
        </div>
      )}

      {/* REVIEW BODY */}
      <div
        className="
          w-100
          d-flex flex-column
          gap-4
          mx-auto mb-5
          px-3
        "
        style={{
          maxWidth: layout.maxWidth,
        }}
      >
        {itemReviews.length > 0 &&
          itemReviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
      </div>
    </Layout>
  );
};

export default DetailPage;

type InfoRowProps = {
  title: string;
  value: React.ReactNode;
};

const InfoRow = ({ title, value }: InfoRowProps) => {
  return (
    <div
      className="
        d-flex justify-content-between align-items-start
        gap-3
        py-3
        border-bottom
      "
    >
      <span
        className="fw-semibold text-secondary"
        style={{
          minWidth: "120px",
          fontSize: "15px",
        }}
      >
        {title}
      </span>

      <div
        className="text-end"
        style={{
          lineHeight: 1.6,
        }}
      >
        {value}
      </div>
    </div>
  );
};
