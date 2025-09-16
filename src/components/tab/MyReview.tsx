import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ReviewCard from "../card/ReviewCard";
import Paging from "../pagination/Paging";
import { useMyPage } from "../../api/myPageTabContextApi";
import ReviewEnroll from "../modal/ReviewEnroll";
import styled from "styled-components";
import { useReview } from "../../api/reviewContextApi";

const MyReview = () => {
  const { setReviewPage } = useMyPage();

  const [isReview, setIsReview] = useState(false);
  const {isReviewUpdated, setIsReviewUpdated} = useReview();

  const { reviews, setReviews } = useReview();
  const [reviewTotal, setReviewTotal] = useState(0);

  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "1");
  const size = parseInt(searchParams.get("size") ?? "4");

  useEffect(() => {
    setReviewPage(page);
  }, [page, setReviewPage]);

  useEffect(() => {
    setReviews(
      reviews?.filter((review) => review.nickname === "lsh02002")
    );
    setReviewTotal(reviews.length);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size, isReviewUpdated, setIsReviewUpdated, setReviews]);

  return (
    <Container>
      <ReviewContainer>
        <ReviewButtonWrapper>
          <button onClick={() => setIsReview(true)}>후기 등록</button>
        </ReviewButtonWrapper>
        {reviews?.length > 0 ? (
          reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))
        ) : (
          <div>내가 작성한 후기가 없습니다.</div>
        )}
      </ReviewContainer>
      <Paging
        to={`/mypage/REVIEWS`}
        total={reviewTotal}
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
  max-width: 870px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ReviewButtonWrapper = styled.div`
  width: 100%;
  text-align: right;

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
