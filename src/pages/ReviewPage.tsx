import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import ReviewCard from "../components/card/ReviewCard";
import ReviewEnroll from "../components/modal/ReviewEnroll";
import Paging from "../components/pagination/Paging";
import { useSearchParams } from "react-router-dom";
import { useReview } from "../api/reviewContextApi";

const ReviewPage = () => {
  const {reviews} = useReview();  

  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "1");
  const size = parseInt(searchParams.get("size") ?? "5");

  const [isReview, setIsReview] = useState(false);
  const {isReviewUpdated, setIsReviewUpdated} = useReview();

  // useEffect(() => {
  //   setReviews(reviewData?.content);
  //   setTotal(reviewData?.totalElements);
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <Layout>
      <Container>
        <h1>리뷰 전체 ({reviews.length})</h1>
        <span>
          <button onClick={() => setIsReview(true)}>후기 등록</button>
        </span>
        <ReviewBody>
          {reviews.length > 0 &&
            reviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          <Paging to={"/reviews"} total={reviews.length} size={size} page={page} />
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
  width: 100%;
  max-width: 870px;  
  padding: 0 20px;
  //잃어 버리지 말자!!!
  box-sizing: border-box;

  h1 {
    text-align: center;
    font-size: var(--main-h1-size);
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
    font-size: var(--button-font-size);
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
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 50;
`;
