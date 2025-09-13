import React, { useEffect, useState } from "react";
import { GetMyReviews } from "../../api/sehomallApi";
import { useSearchParams } from "react-router-dom";
import ReviewCard from "../card/ReviewCard";
import Paging from "../pagination/Paging";
import { useMyPage } from "../../api/myPageTabContextApi";
import ReviewEnroll from "../modal/ReviewEnroll";
import styled from "styled-components";

const MyReview = () => {
  const { setReviewPage } = useMyPage();
  
  const [isReview, setIsReview] = useState(false);
  const [isReviewUpdated, setIsReviewUpdated] = useState(false);
  
  const [myReviews, setMyReviews] = useState([]);
  const [reviewTotal, setReviewTotal] = useState(0);

  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "1");
  const size = parseInt(searchParams.get("size") ?? "4");    

  useEffect(() => {
    setReviewPage(page);
  }, [page, setReviewPage]);

  useEffect(() => {
    GetMyReviews(page, size)
      .then((res) => {
        console.log(res);
        setMyReviews(res.data.content);
        setReviewTotal(res.data.totalElements);

        if (res.headers?.accesstoken) {
          localStorage.setItem("accessToken", res.headers?.accesstoken);
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.response) {
          alert(err.response.data.detailMessage);
        }
      });
  }, [page, size, isReviewUpdated, setIsReviewUpdated]);

  return (
    <>
      <ReviewButtonWrapper>
        <button onClick={() => setIsReview(true)}>후기 등록</button>
      </ReviewButtonWrapper>
      {myReviews?.length > 0 ? (
        myReviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))
      ) : (
        <div>내가 작성한 후기가 없습니다.</div>
      )}
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
    </>
  );
};

export default MyReview;

const ReviewButtonWrapper = styled.span`
  width: 100%;
  text-align: right;
  margin: 0 35px;
    
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