import React, { useMemo, useState } from "react";
import styled from "styled-components";
import Layout from "../components/layout/Layout";
import Banner from "../components/slider/BannerSlider";
import ItemSlider from "../components/slider/ItemSlider";
import CategoryTab from "../components/tab/CategoryTab";
import Intro from "../components/Intro";
import { useItem } from "../api/itemContextApi";
import { itemType } from "../types/type";
import { layout } from "../them/them";

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
      Number(day),
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
      <Page>
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
      </Page>
    </Layout>
  );
};

export default MainPage;

const Page = styled.main`
  width: 100%;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding-bottom: 120px;

  box-sizing: border-box;

  overflow-x: hidden;
`;

const Main = styled.section`
  width: 100%;
  max-width: ${layout.maxWidth};

  display: flex;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;
`;

const Title = styled.h2`
  width: 100%;
  max-width: ${layout.maxWidth};

  margin: 80px auto 24px auto;
  padding: 0 20px;

  font-size: var(--main-h2-size);
  font-weight: 800;

  text-align: left;

  box-sizing: border-box;
`;
