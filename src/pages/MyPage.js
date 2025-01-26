import React from "react";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import MyPageTab from "../components/tab/MyPageTab";
import { useSearchParams } from "react-router-dom";

const MyPage = () => {
  //   const [myOrderItems, setMyOrderItems] = useState([]);
  const [searchParams] = useSearchParams();
  const cate = searchParams.get("cate");

  return (
    <Layout>
      <Container>
        <MyPageTab cate={cate} />
      </Container>
    </Layout>
  );
};

export default MyPage;

const Container = styled.div`
  margin-top: 50px;
`;
