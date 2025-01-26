import React, { useState } from "react";
import Layout from "../components/Layout";
import styled from "styled-components";
import CardOne from "../components/CardOne";
import { SearchItemsByKeyword } from "../api/ItemApi";

const SearchPage = () => {
  const [searchItems, setSearchItems] = useState([]);
  
  const OnSearchKeyDown = (e) => {
    SearchItemsByKeyword(e.target.value)
    .then(res=>{
      console.log(res);
      setSearchItems(res.data.content);
    }).catch(err=>{
      console.error(err);
    })
  }

  return (
    <Layout>
      <Container>
        <ItemsInner>
          <Title>
            상품 검색
          </Title>
          <input type="text" placeholder="키워드를 입력하시면 자동으로 조회됩니다." onChange={OnSearchKeyDown} />
          <Items>            
            {searchItems.length > 0 ? (
              searchItems.map((item, index) => <CardOne key={index} item={item} />)
            ) : (
              <div>상품이 없습니다.</div>
            )}
          </Items>
        </ItemsInner>
      </Container>
    </Layout>
  );
};

export default SearchPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  width: 100%;
  margin: 10px;
  margin-top: 50px;
`;

const Title = styled.h1`
  margin: 10px 0 0 10px;
  span {
    font-size: 0.8em;
  }
`;

const ItemsInner = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  input[type="text"] {
    width: 300px;
    padding: 5px;
    margin: 20px;    
  }
`;

const Items = styled.div`
  max-width: 1280px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  & > div {
  width: 100%;
  text-align: center;
  margin-top: 50px;  
  }
`;
