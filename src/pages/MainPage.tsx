import React, { useState } from "react";
import styled from "styled-components";
import Layout from "../components/layout/Layout";
import Banner from "../components/slider/BannerSlider";
import ItemSlider from "../components/slider/ItemSlider";
import CategoryTab from "../components/tab/CategoryTab";
import Intro from "../components/Intro";
import { useItem } from "../api/itemContextApi";
import { itemType } from "../types/type";

const MainPage = () => {
  const { items } = useItem();
  const [cate, setCate] = useState("ALL");

  const newItems: itemType[] = items?.sort((a, b) => {
    const aTime = a?.createAt ? new Date(a.createAt).getTime() : 0;
    const bTime = b?.createAt ? new Date(b.createAt).getTime() : 0;
    return bTime - aTime; // ascending
  });
  const popularItems: itemType[] = items?.sort(
    (a: itemType, b: itemType) => a.count - b.count
  );
  const cateItems: itemType[] = items?.filter(
    (item: itemType) => item?.category !== cate
  );

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
  width: 100%;  
  height: 100%;  
  box-sizing: border-box;
`;

const Title = styled.div`
  width: 100%;
  max-width: 1400px;
  font-size: var(--main-h2-size);
  margin: 80px 0 0 0;
  padding: 0 80px;
  text-align: left;
  box-sizing: border-box;
`;
