import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import styled from "styled-components";
import ReviewCard from "../components/ReviewCard";
import { GetAllReviews } from "../api/ItemApi";
import ReviewEnroll from "../components/ReviewEnroll";

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);

  const [isReview, setIsReview] = useState(false);
  const [isReviewUpdated, setIsReviewUpdated] = useState(false);

  useEffect(() => {
    GetAllReviews()
      .then((res) => {
        console.log(res.data.content);
        setReviews(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isReviewUpdated, setIsReviewUpdated]);

  return (
    <Layout>
      <Container>
        <h1>리뷰 전체 ({reviews.length})</h1>
        <span>
          <button onClick={() => setIsReview(true)}>리뷰 작성하기</button>
        </span>
        <ReviewBody>
          {reviews.length > 0 &&
            reviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
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
  margin-top: 100px;
  width: 100%;
  max-width: 870px;
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
  & > div {
    border-bottom: 1px solid lightgray;
  }

  & > div:last-child {
    border-bottom: none;
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
