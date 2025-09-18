import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { useItem } from "../api/itemContextApi";
import CardOne from "../components/card/CardOne";
import Layout from "../components/layout/Layout";
import { itemType } from "../types/type";

const CategoryPage = () => {
  const { cate } = useParams();
  const { items } = useItem();

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
  }).slice(0, 5);

  const cateItems: itemType[] = useMemo(() => {
    if (cate === "ALL") return items;
    if (cate === "new") return newItems;
    return items.filter((item) => item?.category === cate);
  }, [cate, items, newItems]);

  return (
    <Layout>
      <Container>
        <h1>카테고리: {cate}</h1>
        <Main>
          {cateItems.length > 0 ? (
            cateItems.map((item) => <CardOne key={item?.id} item={item} />)
          ) : (
            <div>해당 상품이 없습니다.</div>
          )}
        </Main>
      </Container>
    </Layout>
  );
};

export default CategoryPage;

const Container = styled.div`  
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  max-width: 870px;
  padding: 0 20px;  
`;

const Main = styled.div`
    margin-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;    
`;