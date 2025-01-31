import React, { useContext, useEffect, useState } from "react";
import { GetMyReviews } from "../../api/ItemApi";
import { useSearchParams } from "react-router-dom";
import ReviewCard from "../card/ReviewCard";
import Paging from "../pagination/Paging";
import { MyPageTabContext } from "../../api/myPageTabContextApi";

const MyReview = () => {
  const { setReviewPage } = useContext(MyPageTabContext);
  const [myReviews, setMyReviews] = useState([]);
  const [reviewTotal, setReviewTotal] = useState(0);

  const [searchParams] = useSearchParams();
  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page"))
    : 1;
  const size = searchParams.get("size")
    ? parseInt(searchParams.get("size"))
    : 4;

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
  }, [page, size]);

  return (
    <>
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
    </>
  );
};

export default MyReview;
