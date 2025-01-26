import React from "react";
import Layout from "../components/layout/Layout";
import styled from "styled-components";

const NoticePage = () => {
  return (
    <Layout>
      <Container>공지사항 페이지입니다.</Container>
    </Layout>
  );
};

export default NoticePage;

const Container = styled.div`
  margin-top: 50px;
`;
