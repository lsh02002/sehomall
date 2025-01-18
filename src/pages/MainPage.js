import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CategoryItems, NewItems, PopularItems } from "../api/ItemApi";
import Layout from "../components/Layout";
import Banner from "../components/BannerSlider";
import ItemSlider from "../components/ItemSlider";
import CategoryTab from "../components/CategoryTab";
import Intro from "../components/Intro";

const MainPage = () => {
  const [newItems, setNewItems] = useState([]);
  const [popularItems, setPopularItems] = useState([]);
  const [cateItems, setCateItems] = useState([]);
  const [cate, setCate] = useState("ALL");

  useEffect(() => {    
    NewItems()
      .then((res) => {
        console.log(res);
        setNewItems(res.data.content);
      })
      .catch((err) => {
        console.log(err);        
      });
    PopularItems()
      .then((res) => {
        console.log(res);
        setPopularItems(res.data.content);
      })
      .catch((err) => {
        console.log(err);        
      });
      CategoryItems(cate)
      .then((res) => {        
        setCateItems(res.data.content);
      })
      .catch((err) => {
        console.log(err);        
      });
  }, [cate]);

  return (
    <Layout>
      <Banner />      
      <Title>인기있는 아이템</Title>
      <Main>
        <ItemSlider items={popularItems} />
      </Main>      
      <Title>새로운 아이템</Title>
      <Main>
        <ItemSlider items={newItems} />
      </Main>
      <Intro />
      <Title>전체 상품</Title>
      <Main>
        <CategoryTab cate={cate} setCate={setCate} cateItems={cateItems} />
      </Main>
    </Layout>
  );
};

export default MainPage;

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  // flex-wrap: wrap;
  box-sizing: border-box;  
`;

const Title = styled.div`
  width: 100%;
  max-width: 1400px;
  font-size: 1.4em;
  margin: 80px 0 10px 0;
`;
