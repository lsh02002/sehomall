import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ReviewCard from "../card/ReviewCard";
import Paging from "../pagination/Paging";
import { useMyPage } from "../../api/myPageTabContextApi";
import ReviewEnroll from "../modal/ReviewEnroll";
import { useReview } from "../../api/reviewContextApi";
import { layout } from "../../them/them";

const MyReview = () => {
  const { setReviewPage } = useMyPage();

  const [isReview, setIsReview] = useState(false);
  const { reviews, isReviewUpdated, setIsReviewUpdated } = useReview();

  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "1");
  const size = parseInt(searchParams.get("size") ?? "4");

  const myReviews = reviews?.filter((review) => review.nickname === "lsh02002");

  useEffect(() => {
    setReviewPage(page);
  }, [page, setReviewPage]);

  return (
    <div
      className="
        w-100
        d-flex flex-column
        justify-content-center align-items-center
      "
      style={{
        maxWidth: layout.maxWidth,
      }}
    >
      <div
        className="w-100 px-3"
        style={{
          boxSizing: "border-box",
        }}
      >
        <div className="w-100 d-flex justify-content-end mb-3">
          <button
            onClick={() => setIsReview(true)}
            className="btn btn-light border rounded-4 fw-semibold shadow-sm"
            style={{
              minWidth: "90px",
              height: "40px",
            }}
          >
            후기 등록
          </button>
        </div>

        {myReviews?.length > 0 ? (
          myReviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))
        ) : (
          <div className="text-secondary text-center py-5">
            내가 작성한 후기가 없습니다.
          </div>
        )}
      </div>

      <Paging
        to="/mypage/REVIEWS"
        total={myReviews.length}
        size={size}
        page={page}
      />

      {isReview && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{
            backgroundColor: "rgba(0,0,0,0.4)",
            zIndex: 5,
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
    </div>
  );
};

export default MyReview;
