import React, { useMemo, useState } from "react";
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

  const parseKoreanDate = (dateStr?: string): number => {
    if (!dateStr) return 0;
    const match = dateStr.match(/(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일/);
    if (!match) return 0;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, year, month, day] = match;
    return new Date(
      Number(year),
      Number(month) - 1, // JS Date에서 month는 0~11
      Number(day)
    ).getTime();
  };

  const newItems = [...items].sort((a, b) => {
    const aTime = parseKoreanDate(a?.createAt);
    const bTime = parseKoreanDate(b?.createAt);
    return bTime - aTime; // 최신순
  });

  const popularItems = [...items].sort((a, b) => {    
    return (b?.views ?? 0) - (a?.views ?? 0);
  });

  const cateItems: itemType[] = useMemo(() => {
    if (cate === "ALL") return items;
    return items.filter((item) => item?.category === cate);
  }, [items, cate]);

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
