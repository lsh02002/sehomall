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
import { useReview } from "../api/reviewContextApi";
import { layout } from "../them/them";

const DetailPage = () => {
  const { isLogin } = useLogin();
  const { setCartCount, cartItems, setCartItems, isEditing, setIsEditing } =
    useCart();
  const [item, setItem] = useState<itemType | null>(null);
  const { id } = useParams();
  const { reviews } = useReview();
  const [isReview, setIsReview] = useState(false);
  const { isReviewUpdated, setIsReviewUpdated } = useReview();
  const [itemCount, setItemCount] = useState(1);

  const navigate = useNavigate();

  const itemId = parseInt(id ? id : "0");

  useEffect(() => {
    if (!itemData?.content?.find((i: itemType) => i.id === itemId)) {
      alert("해당 상품을 찾을 수 없습니다.");
      navigate(-1);
    }

    setItem(itemData?.content?.find((i: itemType) => i.id === itemId) ?? null);
  }, [itemId, navigate]);

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
      fileUrl: item?.files[0].fileUrl ?? "",
      checked: true,
      heartCount: item?.heartCount ?? 0,
    };

    console.log("카트 내용", tempItem);

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
      `/pay?isFromCart=false&itemId=${id}&itemName=${item?.name}&price=${
        item?.price
      }&fileUrl=${item?.files[0].fileUrl}&heartCount=${
        item?.heartCount
      }&itemCount=${itemCount}&isCheckedItem=${true}`,
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
                <em style={{ color: "red" }}>
                  {item.price.toLocaleString()} 원
                </em>
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
        {reviews?.filter((i: reviewType) => i?.itemId === itemId).length > 0 &&
          reviews
            ?.filter((i: reviewType) => i?.itemId === itemId)
            .map((review, index) => <ReviewCard key={index} review={review} />)}
      </ReviewBody>
    </Layout>
  );
};

export default DetailPage;

const Main = styled.div`
  width: 100%;
  max-width: ${layout.maxWidth};

  margin: 60px auto 0 auto;
  padding: 0 20px;

  display: grid;
  grid-template-columns: 1fr 480px;
  gap: 60px;

  box-sizing: border-box;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const Image = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;

  overflow: hidden;

  border-radius: 32px;

  background: #f7f7f7;

  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.08),
    0 4px 10px rgba(0, 0, 0, 0.04);

  position: sticky;
  top: 100px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;

    transition: transform 0.5s;
  }

  &:hover img {
    transform: scale(1.03);
  }

  @media (max-width: 980px) {
    position: relative;
    top: 0;
  }
`;

const Info = styled.div`
  width: 100%;

  padding: 10px 0;

  display: flex;
  flex-direction: column;

  h1 {
    margin: 0 0 30px 0;

    font-size: clamp(32px, 5vw, 48px);
    font-weight: 800;

    color: #111;

    line-height: 1.1;
  }

  div {
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    padding: 18px 0;

    border-bottom: 1px solid #efefef;

    gap: 20px;
  }

  span {
    min-width: 120px;

    color: #666;

    font-size: 15px;
    font-weight: 600;
  }

  em {
    flex: 1;

    font-style: normal;

    color: #111;

    line-height: 1.6;

    text-align: right;
  }
`;

const CountButton = styled.div`
  width: 100%;

  margin-top: 30px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 18px 20px;

  border-radius: 18px;

  background: #f8f8f8;

  font-weight: 700;

  box-sizing: border-box;

  button {
    width: 42px;
    height: 42px;

    border: 1px solid #e8e8e8;
    border-radius: 50%;

    background: #fafafa;

    color: #333;

    font-size: 18px;
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

      color: #111;

      transform: translateY(-1px) scale(1.04);

      box-shadow:
        0 8px 18px rgba(0, 0, 0, 0.06),
        0 2px 6px rgba(0, 0, 0, 0.04);
    }

    &:active {
      transform: scale(0.94);
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
      box-shadow: none;
    }
  }
`;

const BuyNow = styled.button`
  width: 100%;

  margin-top: 30px;

  padding: 20px;

  border: none;
  border-radius: 18px;

  background: linear-gradient(135deg, #111, #333);

  color: white;

  font-size: 17px;
  font-weight: 700;

  cursor: pointer;

  transition:
    transform 0.2s,
    opacity 0.2s,
    box-shadow 0.25s;

  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.18);

  &:hover {
    transform: translateY(-2px);

    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.22);
  }
`;

const AddToCartButton = styled.button`
  width: 100%;

  padding: 20px;

  margin-top: 14px;

  border-radius: 18px;

  border: 1px solid #ddd;

  background: white;

  color: #111;

  font-size: 16px;
  font-weight: 700;

  cursor: pointer;

  transition:
    background 0.2s,
    transform 0.2s,
    border 0.2s;

  &:hover {
    background: #f8f8f8;
    transform: translateY(-1px);
    border-color: #bbb;
  }
`;

const Review = styled.div`
  width: 100%;

  position: fixed;
  inset: 0;

  background: rgba(0, 0, 0, 0.45);

  backdrop-filter: blur(4px);

  z-index: 100;
`;

const ReviewTitle = styled.div`
  width: 100%;
  max-width: ${layout.maxWidth};

  margin: 100px auto 24px auto;
  padding: 0 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  box-sizing: border-box;

  span {
    font-size: 28px;
    font-weight: 800;
    color: #111;
  }

  button {
    height: 48px;

    padding: 0 24px;

    border: 1px solid #e5e5e5;
    border-radius: 999px;

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

      color: #111;

      transform: translateY(-1px);

      box-shadow:
        0 8px 18px rgba(0, 0, 0, 0.06),
        0 2px 6px rgba(0, 0, 0, 0.04);
    }

    &:active {
      transform: scale(0.97);
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
      box-shadow: none;
    }
  }
`;

const ReviewBody = styled.div`
  width: 100%;
  max-width: ${layout.maxWidth};

  margin: 0 auto 120px auto;
  padding: 0 20px;

  display: flex;
  flex-direction: column;
  gap: 20px;

  box-sizing: border-box;
`;
