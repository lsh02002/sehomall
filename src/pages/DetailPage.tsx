import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { useLogin } from "../api/loginContextApi";
import HeartCount from "../components/HeartCount";
import ReviewCard from "../components/card/ReviewCard";
import ReviewEnroll from "../components/modal/ReviewEnroll";
import { itemCartType, itemType, reviewType } from "../types/type";
import { useCart } from "../api/cartContextApi";
import { itemData } from "../components/data/itemData";
import { reviewData } from "../components/data/reviewData";

const DetailPage = () => {
  const { isLogin } = useLogin();
  const { cartItems, setCartItems, isEditing, setIsEditing } = useCart();
  const [item, setItem] = useState<itemType | null>(null);
  const { id } = useParams();
  const [reviews, setReviews] = useState<reviewType[]>([]);
  const [isReview, setIsReview] = useState(false);
  const [isReviewUpdated, setIsReviewUpdated] = useState(false);
  const [itemCount, setItemCount] = useState(1);

  const navigate = useNavigate();

  const itemId = parseInt(id ? id : "0");

  useEffect(() => {
    setItem(itemData?.content?.find((i: itemType) => i.id === itemId) ?? null);
  }, [itemId]);

  useEffect(() => {
    setReviews(
      reviewData?.content?.filter((i: reviewType) => i?.itemId === itemId)
    );
  }, [itemId]);

  const OnAddToCartClick = () => {
    if (!isLogin) {
      alert("장바구니 기능은 로그인 하셔야 합니다.");
      return;
    }

    const tempItem: itemCartType = {
      itemId: item?.id ?? 0,
      itemCount,
      itemName: item?.name ?? "",
      price: item?.price ?? 0,
      fileUrl: item?.files[0].fileUrl ?? "",
      checked: true,
      heartCount: item?.heartCount ?? 0,
    };

    console.log("카트 내용", tempItem);

    setCartItems([...cartItems, tempItem]);
    setIsEditing(!isEditing);
  };

  const OnOrderClick = () => {
    if (!isLogin) {
      alert("지금 구매하기 기능은 로그인 하셔야 합니다.");
      return;
    }
    navigate(
      `/pay?isFromCart=false&itemId=${id}&itemName=${item?.name}&price=${
        item?.price
      }&fileUrl=${item?.files[0].fileUrl}&heartCount=${
        item?.heartCount
      }&itemCount=${itemCount}&isCheckedItem=${true}`
    );
  };

  return (
    <Layout>
      <Main>
        <Image>{item && <img src={item.files[0].fileUrl} alt="" />}</Image>
        <Info>
          {item && (
            <>
              <h1>{item.name}</h1>
              <div>
                <span>Price</span>
                <em style={{color: "red"}}>{item.price.toLocaleString()} 원</em>
              </div>
              <div>
                <span>적립금</span>
                <em>{0} 원</em>
              </div>
              <div>
                <span>설명</span>
                <em>{item.description}</em>
              </div>
              <div>
                <span>Size</span>
                <em>{item.size}</em>
              </div>
              <div>
                <span>Care Guide</span>
                <em>{item.careGuide}</em>
              </div>
              <HeartCount id={item.id} heartCount={item.heartCount} />
              <CountButton>
                <button onClick={() => setItemCount(itemCount + 1)}>+</button>
                수량: {itemCount}
                <button
                  onClick={() =>
                    setItemCount(itemCount > 1 ? itemCount - 1 : 1)
                  }
                >
                  -
                </button>
              </CountButton>
            </>
          )}
          <BuyNow onClick={OnOrderClick}>지금 구매하기</BuyNow>
          <AddToCartButton onClick={OnAddToCartClick}>
            Add To Cart
          </AddToCartButton>
        </Info>
      </Main>
      <ReviewTitle>
        <span>상품 구매 후기({item && item.reviewCount})</span>
        <button onClick={() => setIsReview(true)}>후기 등록</button>
      </ReviewTitle>
      {isReview && (
        <Review>
          <ReviewEnroll
            item={item}
            setIsReview={setIsReview}
            isReviewUpdated={isReviewUpdated}
            setIsReviewUpdated={setIsReviewUpdated}
          />
        </Review>
      )}
      <ReviewBody>
        {reviews.length > 0 &&
          reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
      </ReviewBody>
    </Layout>
  );
};

export default DetailPage;

const Main = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 870px;
  margin: 40px 0 0 10px;
  position: relative;
`;

const Image = styled.div`
  width: 400px;
  height: 400px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Info = styled.div`
  width: 100%;
  max-width: 435px;
  margin-left: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: left;
  h1 {
    width: 100%;
    margin: 0;
    padding: 10px 0;
    box-sizing: border-box;
    font-size: var(--main-h1-size);
  }

  div {
    width: 100%;
    font-size: 1em;
    display: flex;
    justify-content: space-between;
    
    & > span {
      width: 100%;
    }
  }

  em {
    display: flex;
    width: 100%;
  }
`;

const CountButton = styled.span`
  width: 100%;
  button {
    text-align: right;
    border: none;
    padding: 5px 10px;
    color: white;
    background-color: gray;
    transition: 0.2s;
    cursor: pointer;
    font-size: var(--button-font-size);
    &:hover {
      background-color: lightgray;
    }
  }
`;

const BuyNow = styled.button`
  margin-top: 30px;
  border: none;
  padding: 10px;
  color: white;
  background-color: gray;
  transition: 0.2s;
  cursor: pointer;
  width: 100%;
  font-size: var(--button-font-size);
  &:hover {
    background-color: lightgray;
  }
`;

const AddToCartButton = styled.button`
  margin-top: 10px;
  width: 100%;
  border: none;
  padding: 10px;
  background-color: #fff;
  cursor: pointer;
  border: 1px solid black;
  transition: 0.3s;
  font-size: var(--button-font-size);
  &:hover {
    color: gray;
  }
`;

const Review = styled.div`
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 5;
`;

const ReviewTitle = styled.div`
  width: 100%;
  max-width: 870px;
  margin-top: 80px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;

  button {
    text-align: right;
    border: none;
    padding: 5px 10px;
    color: white;
    background-color: gray;
    transition: 0.2s;
    cursor: pointer;
    font-size: var(--button-font-size);
    &:hover {
      background-color: lightgray;
    }
  }
`;

const ReviewBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 870px;
`;
