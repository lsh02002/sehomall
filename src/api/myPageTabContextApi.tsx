import React, {
  createContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  useContext,
} from "react";

type MyPageTabContextValue = {
  reviewPage: number;
  setReviewPage: Dispatch<SetStateAction<number>>;
  heartPage: number;
  setHeartPage: Dispatch<SetStateAction<number>>;
  orderPage: number;
  setOrderPage: Dispatch<SetStateAction<number>>;
};

const MyPageTabContext = createContext<MyPageTabContextValue | undefined>(
  undefined
);

const MyPageTabProvider = ({ children }: { children: ReactNode }) => {
  const [reviewPage, setReviewPage] = useState(1);
  const [heartPage, setHeartPage] = useState(1);
  const [orderPage, setOrderPage] = useState(1);

  const value: MyPageTabContextValue = {
    reviewPage,
    setReviewPage,
    heartPage,
    setHeartPage,
    orderPage,
    setOrderPage,
  };

  return (
    <MyPageTabContext.Provider value={value}>
      {children}
    </MyPageTabContext.Provider>
  );
};

export { MyPageTabContext, MyPageTabProvider };

export function useMyPage() {
  const ctx = useContext(MyPageTabContext);

  if (!ctx) throw new Error("useLogin must be used within <MyPageProvider>");
  return ctx;
}
