import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import ReviewCard from "../components/card/ReviewCard";
import ReviewEnroll from "../components/modal/ReviewEnroll";
import Paging from "../components/pagination/Paging";
import { useSearchParams } from "react-router-dom";
import { reviewData } from "../components/data/reviewData";
import { reviewType } from "../types/type";

const ReviewPage = () => {
  const [reviews, setReviews] = useState<reviewType[]>([]);
  const [total, setTotal] = useState(0);

  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "1");
  const size = parseInt(searchParams.get("size") ?? "5");

  const [isReview, setIsReview] = useState(false);
  const [isReviewUpdated, setIsReviewUpdated] = useState(false);

  useEffect(() => {
    setReviews(reviewData?.content);
    setTotal(reviewData?.totalElements);
  }, [page, size, isReviewUpdated, setIsReviewUpdated]);

  useEffect(() => {
    if (isReview) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isReview]);

  return (
    <Layout>
      <Container>
        <h1>리뷰 전체 ({total})</h1>
        <span>
          <button onClick={() => setIsReview(true)}>후기 등록</button>
        </span>
        <ReviewBody>
          {reviews.length > 0 &&
            reviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          <Paging to={"/reviews"} total={total} size={size} page={page} />
        </ReviewBody>
      </Container>
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
    </Layout>
  );
};

export default ReviewPage;

const Container = styled.div`
  margin-top: 50px;
  width: 100%;
  max-width: 870px;
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px;
  box-sizing: border-box;

  h1 {
    text-align: center;
    font-size: 36px;
    font-weight: normal;
  }

  span {
    display: inline-block;
    width: 100%;
    text-align: right;
  }

  button {
    text-align: right;
    border: none;
    padding: 5px 10px;
    color: white;
    background-color: gray;
    transition: 0.2s;
    cursor: pointer;
    font-size: 1em;
    &:hover {
      background-color: lightgray;
    }
  }
`;

const ReviewBody = styled.div``;

const Review = styled.div`  
  position: fixed;
  width: 100%;  
  box-sizing: border-box;
  inset: 0;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 50;
`;
