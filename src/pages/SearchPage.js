import React from "react";
import Layout from "../components/Layout";
import styled from "styled-components";

const SearchPage = () => {
  return (
    <Layout>
      <Container>검색 페이지입니다.</Container>
    </Layout>
  );
};

export default SearchPage;

const Container = styled.div`
  margin-top: 50px;
`;
