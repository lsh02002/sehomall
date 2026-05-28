import React from "react";
import Layout from "../components/layout/Layout";
import MyPageTab from "../components/tab/MyPageTab";
import { useParams } from "react-router-dom";

const MyPage = () => {
  //   const [myOrderItems, setMyOrderItems] = useState([]);
  const { cate } = useParams();

  return (
    <Layout>
      <h1>마이 페이지</h1>
      <MyPageTab cate={cate} />
    </Layout>
  );
};

export default MyPage;
