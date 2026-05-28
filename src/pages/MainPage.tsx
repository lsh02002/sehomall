import React, { useMemo, useState } from "react";

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

    const [, year, month, day] = match;

    return new Date(Number(year), Number(month) - 1, Number(day)).getTime();
  };

  // 최신 상품
  const newItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const aTime = parseKoreanDate(a?.createAt);

      const bTime = parseKoreanDate(b?.createAt);

      return bTime - aTime;
    });
  }, [items]);

  // 인기 상품
  const popularItems = useMemo(() => {
    return [...items].sort((a, b) => {
      return (b?.views ?? 0) - (a?.views ?? 0);
    });
  }, [items]);

  // 카테고리 상품
  const cateItems: itemType[] = useMemo(() => {
    if (cate === "ALL") return items;

    return items.filter((item) => item?.category === cate);
  }, [items, cate]);

  return (
    <Layout>
      <main
        className="
          w-100 min-vh-100
          d-flex flex-column align-items-center
        "
        style={{
          paddingBottom: "120px",
          boxSizing: "border-box",
          overflowX: "hidden",
        }}
      >
        {/* BANNER */}
        <Banner />

        {/* POPULAR */}
        <SectionTitle>인기있는 아이템</SectionTitle>

        <section
          className="
            w-100
            d-flex justify-content-center align-items-center
          "
          style={{
            maxWidth: layout.maxWidth,
          }}
        >
          <ItemSlider items={popularItems} />
        </section>

        {/* NEW */}
        <SectionTitle>새로운 아이템</SectionTitle>

        <section
          className="
            w-100
            d-flex justify-content-center align-items-center
          "
          style={{
            maxWidth: layout.maxWidth,
          }}
        >
          <ItemSlider items={newItems} />
        </section>

        {/* INTRO */}
        <Intro />

        {/* PRODUCTS */}
        <SectionTitle>전체 상품</SectionTitle>

        <section
          className="
            w-100
            d-flex justify-content-center align-items-center
          "
          style={{
            maxWidth: layout.maxWidth,
          }}
        >
          <CategoryTab cate={cate} setCate={setCate} cateItems={cateItems} />
        </section>
      </main>
    </Layout>
  );
};

export default MainPage;

type SectionTitleProps = {
  children: React.ReactNode;
};

const SectionTitle = ({ children }: SectionTitleProps) => {
  return (
    <h2
      className="w-100 fw-bold"
      style={{
        maxWidth: layout.maxWidth,
        margin: "80px auto 24px auto",
        padding: "0 20px",
        fontSize: "var(--main-h2-size)",
        textAlign: "left",
        boxSizing: "border-box",
      }}
    >
      {children}
    </h2>
  );
};
