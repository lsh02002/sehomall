import { Link } from "react-router-dom";
import NoImage from "../../assets/no-image.jpg";
import { reviewType } from "../../types/type";
import StarRating from "../StarRating";
import { layout } from "../../theme/theme";

const ReviewCard = ({ review }: { review: reviewType | null }) => {
  return (
    <div
      className="
        border rounded-5 bg-white p-4 my-3 mx-auto
        shadow-sm
      "
      style={{
        maxWidth: layout.maxWidth,
        transition: "0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* TOP */}
      <div
        className="
          d-flex justify-content-between align-items-start
          gap-4 flex-column flex-sm-row
        "
      >
        {/* LEFT */}
        <div className="d-flex align-items-center gap-3 min-w-0">
          <Link to={`/detail/${review?.itemId}`}>
            <img
              src={review?.files?.[0] ? review.files[0].fileUrl : NoImage}
              alt={review?.itemName ?? "review image"}
              className="rounded-4 d-block"
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
                background: "#f5f5f5",
              }}
            />
          </Link>

          <div className="min-w-0">
            <Link
              to={`/detail/${review?.itemId}`}
              className="text-decoration-none text-dark"
            >
              <div
                className="fw-bold text-truncate mb-2"
                style={{
                  fontSize: "20px",
                }}
              >
                {review?.itemName}
              </div>

              <div
                className="text-secondary mb-1"
                style={{
                  fontSize: "13px",
                }}
              >
                상품 아이디: {review?.itemId}
              </div>

              <div
                className="fw-semibold"
                style={{
                  fontSize: "14px",
                  color: "#555",
                }}
              >
                작성자: {review?.nickname}
              </div>
            </Link>
          </div>
        </div>

        {/* STAR */}
        <div
          className="
            d-flex justify-content-start justify-content-sm-end
          "
          style={{
            minWidth: "120px",
          }}
        >
          <StarRating totalStars={review?.rating ?? null} />
        </div>
      </div>

      {/* CONTENT */}
      <div
        className="rounded-4 p-4 mt-4"
        style={{
          background: "#fafafa",
        }}
      >
        <div
          className="fw-bold text-danger"
          style={{
            fontSize: "12px",
            letterSpacing: "1px",
          }}
        >
          REVIEW
        </div>

        <p
          className="mb-0 mt-3"
          style={{
            color: "#333",
            lineHeight: "1.7",
          }}
        >
          {review?.content}
        </p>
      </div>

      {/* DATE */}
      <div
        className="text-end mt-3 text-secondary"
        style={{
          fontSize: "13px",
        }}
      >
        등록: {review?.createAt}
      </div>
    </div>
  );
};

export default ReviewCard;
