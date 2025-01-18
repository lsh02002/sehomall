import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import styled from "styled-components";
import MyPageTab from "../components/MyPageTab";
import { GetMyHeartedItems, GetMyReviews } from "../api/ItemApi";
import { useSearchParams } from "react-router-dom";

const MyPage = () => {
  const [myReviews, setMyReviews] = useState([]);
  const [myHearts, setMyHearts] = useState([]);
  //   const [myOrderItems, setMyOrderItems] = useState([]);
  const [searchParams]  = useSearchParams();
  const cate = searchParams.get("cate");

  useEffect(() => {
    GetMyReviews()
      .then((res) => {
        console.log(res);
        setMyReviews(res.data.content);
      })
      .catch((err) => {
        console.error(err);
        if(err.response) {
            alert(err.response.data.detailMessage);
        }
      });

    GetMyHeartedItems()
      .then((res) => {
        console.log(res);
        setMyHearts(res.data.content);
      })
      .catch((err) => {
        console.error(err);
      });
      console.log(cate);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <Container>
        <MyPageTab cate={cate} myReviews={myReviews} myHearts={myHearts} />
      </Container>
    </Layout>
  );
};

export default MyPage;

const Container = styled.div`
  margin-top: 150px;
`;
