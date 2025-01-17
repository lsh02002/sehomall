import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import styled from "styled-components";
import ReviewCard from "../components/ReviewCard";
import { GetAllReviews } from "../api/ItemApi";

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    GetAllReviews()
      .then((res) => {
        console.log(res.data.content);
        setReviews(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Layout>
      <Container>
        <h1>리뷰 전체 ({reviews.length})</h1>
        <span>
          <button>리뷰 작성하기</button>
        </span>
        <ReviewBody>
          {reviews.length > 0 &&
            reviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
        </ReviewBody>
      </Container>
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
    padding: 5px 10px;
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
