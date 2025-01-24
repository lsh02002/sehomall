import React from "react";
import Layout from "../components/Layout";
import styled from "styled-components";

const InstagramPage = () => {
  return (
    <Layout>
      <Container>Instagram 페이지입니다.</Container>
    </Layout>
  );
};

export default InstagramPage;

const Container = styled.div`
  margin-top: 50px;
`;
