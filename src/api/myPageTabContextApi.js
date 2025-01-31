import { createContext, useState } from "react";

const MyPageTabContext = createContext({});

const MyPageTabProvider = ({ children }) => {
  const [reviewPage, setReviewPage] = useState(1);
  const [heartPage, setHeartPage] = useState(1);
  const [orderPage, setOrderPage] = useState(1);

  return (
    <MyPageTabContext.Provider value={{ reviewPage, setReviewPage, heartPage, setHeartPage, orderPage, setOrderPage }}>
      {children}
    </MyPageTabContext.Provider>
  );
};

export { MyPageTabContext, MyPageTabProvider };
