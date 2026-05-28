import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import ReviewCard from "../components/card/ReviewCard";
import ReviewEnroll from "../components/modal/ReviewEnroll";
import Paging from "../components/pagination/Paging";
import { useSearchParams } from "react-router-dom";
import { useReview } from "../api/reviewContextApi";
import { layout } from "../them/them";

const ReviewPage = () => {
  const { reviews, isReviewUpdated, setIsReviewUpdated } = useReview();

  const [searchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page") ?? "1");
  const size = parseInt(searchParams.get("size") ?? "5");

  const [isReview, setIsReview] = useState(false);

  return (
    <Layout>
      <div
        className="w-100 mx-auto"
        style={{
          maxWidth: layout.maxWidth,
          minHeight: "calc(100vh - 220px)",
          boxSizing: "border-box",
        }}
      >
        <h1
          className="text-center"
          style={{
            fontSize: "var(--main-h1-size)",
          }}
        >
          리뷰 전체 ({reviews.length})
        </h1>

        <div className="d-flex justify-content-end w-100">
          <button
            onClick={() => setIsReview(true)}
            className="btn btn-light border rounded-4 fw-semibold"
            style={{
              minWidth: "90px",
              height: "40px",
              marginRight: "20px",
              fontSize: "var(--button-font-size)",
            }}
          >
            후기 등록
          </button>
        </div>

        <div className="p-3">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))
          ) : (
            <div className="text-center text-secondary py-5">
              등록된 리뷰가 없습니다.
            </div>
          )}

          <Paging
            to="/reviews"
            total={reviews.length}
            size={size}
            page={page}
          />
        </div>
      </div>

      {isReview && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{
            backgroundColor: "rgba(0,0,0,0.4)",
            zIndex: 50,
          }}
        >
          <ReviewEnroll
            item={null}
            setIsReview={setIsReview}
            isReviewUpdated={isReviewUpdated}
            setIsReviewUpdated={setIsReviewUpdated}
          />
        </div>
      )}
    </Layout>
  );
};

export default ReviewPage;
