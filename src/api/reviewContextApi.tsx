import React, {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
  type ReactNode,
  useContext,
} from "react";
import { reviewData } from "../components/data/reviewData";
import { reviewType } from "../types/type";

export type ReviewContextValue = {
  reviews: reviewType[];
  setReviews: Dispatch<SetStateAction<reviewType[]>>;  
  reviewId: number;
  setReviewId: Dispatch<SetStateAction<number>>;
  isReviewUpdated: boolean;
  setIsReviewUpdated: (b: boolean) => void;
};

const ReviewContext = createContext<ReviewContextValue | undefined>(undefined);

const ReviewProvider = ({ children }: { children: ReactNode }) => {
  const [reviews, setReviews] = useState<reviewType[]>(reviewData?.content);
  const [reviewId, setReviewId] = useState(0);
  const [isReviewUpdated, setIsReviewUpdated] = useState(false);

  const value: ReviewContextValue = {
    reviews,
    setReviews,
    reviewId,
    setReviewId,
    isReviewUpdated,
    setIsReviewUpdated,
  };

  return (
    <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>
  );
};

export { ReviewContext, ReviewProvider };

export function useReview() {
  const ctx = useContext(ReviewContext);

  if (!ctx) throw new Error("useReview must be used within <ReviewProvider>");
  return ctx;
}
