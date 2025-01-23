import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { AddToCart, DetailItem, GetItemReviews } from "../api/ItemApi";
import Layout from "../components/Layout";
import { CartContext } from "../api/cartContextApi";
import { LoginContext } from "../api/loginContextApi";
import HeartCount from "../components/HeartCount";
import ReviewCard from "../components/ReviewCard";
import ReviewEnroll from "../components/ReviewEnroll";

const DetailPage = () => {
  const { isLogin } = useContext(LoginContext);
  const [item, setItem] = useState(null);
  const { id } = useParams();
  const { setCartCount } = useContext(CartContext);
  const [reviews, setReviews] = useState([]);
  const [isReview, setIsReview] = useState(false);
  const [isReviewEdited, setIsReviewEdited] = useState(false);
  const [itemCount, setItemCount] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    DetailItem(id)
      .then((res) => {
        setItem(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          alert(err.response.data.detailMessage);
        }
      });
  }, [id]);

  useEffect(() => {
    GetItemReviews(id)
      .then((res) => {
        console.log(res.data.content);
        setReviews(res.data.content);
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          alert(err.response.data.detailMessage);
        }
      });
  }, [id, isReviewEdited, setIsReviewEdited]);



  const OnAddToCartClick = () => {
    if (!isLogin) {
      alert("장바구니 기능은 로그인 하셔야 합니다.");
      return;
    }

    AddToCart(id, setCartCount);
  };

  const OnOrderClick = () => {
    if (!isLogin) {
      alert("지금 구매하기 기능은 로그인 하셔야 합니다.");
      return;
    }
    navigate(
      `/pay?isFromCart=false&itemId=${id}&itemName=${item.name}&price=${
        item.price
      }&fileUrl=${item.files[0].fileUrl}&heartCount=${
        item.heartCount
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
              <h3>{item.name}</h3>
              <span>Price {item.price.toLocaleString()} 원</span>
              <span>적립금 {0} 원 </span>
              <span>{item.description}</span>
              <span>Size {item.size}</span>
              <span>Care Guide {item.careGuide}</span>
              <HeartCount id={item.id} heartCount={item.heartCount} isClicked />
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
            isReviewEdited={isReviewEdited}
            setIsReviewEdited={setIsReviewEdited}
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
  align-items: start;
  flex-direction: column;
  text-align: left;
  h3 {
    width: 100%;
    margin: 0;
    padding: 10px 0;
    box-sizing: border-box;
  }
  & > span {
    width: 100%;
    padding: 0px 0px;
    box-sizing: border-box;
    font-size: 1em;
  }
  & > div {
    width: 150px;
  }
`;

const CountButton = styled.span`
  width: 100%;
  button {
    display: inline-block;
    padding: 5px 10px;
    margin: 10px;
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
    padding: 5px;
    color: white;
    background-color: gray;
    transition: 0.2s;
    cursor: pointer;
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
  & > div {
    border-bottom: 1px solid lightgray;
  }

  & > div:last-child {
    border-bottom: none;
  }
`;
