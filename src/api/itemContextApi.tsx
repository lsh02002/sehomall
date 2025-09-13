import React, {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
  type ReactNode,
  useContext,
} from "react";
import { itemType, orderResponseType, reviewType } from "../types/type";

export type ItemContextValue = {
  items: itemType[];
  setItems: Dispatch<SetStateAction<itemType[]>>;
  reviews: reviewType[];
  setReviews: Dispatch<SetStateAction<reviewType[]>>;
  reviewId: number;
  setReviewId: Dispatch<SetStateAction<number>>;
  myHearts: itemType[];
  setMyHearts: Dispatch<SetStateAction<itemType[]>>;
  myOrders: orderResponseType[];
  setMyOrders: Dispatch<SetStateAction<orderResponseType[]>>;
  isHeartUpdated: boolean;
  setIsHeartUpdated: Dispatch<SetStateAction<boolean>>;
};

const ItemContext = createContext<ItemContextValue | undefined>(undefined);

const ItemProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<itemType[]>([]);
  const [reviews, setReviews] = useState<reviewType[]>([]);
  const [reviewId, setReviewId] = useState(0);
  const [myHearts, setMyHearts] = useState<itemType[]>([]);
  const [myOrders, setMyOrders] = useState<orderResponseType[]>([]);
  const [isHeartUpdated, setIsHeartUpdated] = useState(false);

  const value: ItemContextValue = {
    items,
    setItems,
    reviews,
    setReviews,
    reviewId,
    setReviewId,
    myHearts,
    setMyHearts,
    myOrders,
    setMyOrders,
    isHeartUpdated,
    setIsHeartUpdated,
  };

  return (
    <ItemContext.Provider value={value}>{children}</ItemContext.Provider>
  );
};

export { ItemContext, ItemProvider };

export function useItem() {
  const ctx = useContext(ItemContext);

  if (!ctx) throw new Error("useLogin must be used within <ItemProvider>");
  return ctx;
}
