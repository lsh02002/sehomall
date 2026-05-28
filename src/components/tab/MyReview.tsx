import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ReviewCard from "../card/ReviewCard";
import Paging from "../pagination/Paging";
import { useMyPage } from "../../api/myPageTabContextApi";
import ReviewEnroll from "../modal/ReviewEnroll";
import styled from "styled-components";
import { useReview } from "../../api/reviewContextApi";
import { layout } from "../../them/them";

const MyReview = () => {
  const { setReviewPage } = useMyPage();

  const [isReview, setIsReview] = useState(false);
  const { isReviewUpdated, setIsReviewUpdated } = useReview();

  const { reviews } = useReview();

  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "1");
  const size = parseInt(searchParams.get("size") ?? "4");

  const myReviews = reviews?.filter((review) => review.nickname === "lsh02002");

  useEffect(() => {
    setReviewPage(page);
  }, [page, setReviewPage]);

  return (
    <Container>
      <ReviewContainer>
        <ReviewButtonWrapper>
          <button onClick={() => setIsReview(true)}>후기 등록</button>
        </ReviewButtonWrapper>
        {myReviews?.length > 0 ? (
          myReviews?.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))
        ) : (
          <div>내가 작성한 후기가 없습니다.</div>
        )}
      </ReviewContainer>
      <Paging
        to={`/mypage/REVIEWS`}
        total={myReviews.length}
        size={size}
        page={page}
      />
      {isReview && (
        <Review>
          <ReviewEnroll
            item={null}
            setIsReview={setIsReview}
            isReviewUpdated={isReviewUpdated}
            setIsReviewUpdated={setIsReviewUpdated}
          />
        </Review>
      )}
    </Container>
  );
};

export default MyReview;

const Container = styled.div`
  width: 100%;
  max-width: ${layout.maxWidth};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ReviewButtonWrapper = styled.div`
  width: 100%;
  text-align: right;

  button {
    min-width: 90px;
    height: 40px;

    padding: 0 16px;

    border: 1px solid #e5e5e5;
    border-radius: 12px;

    background: #fafafa;

    color: #333;

    font-size: var(--button-font-size);
    font-weight: 600;

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
`;

const ReviewContainer = styled.div`
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
`;

const Review = styled.div`
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 5;
`;
