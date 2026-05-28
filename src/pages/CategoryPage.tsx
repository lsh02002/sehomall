import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useItem } from "../api/itemContextApi";
import CardOne from "../components/card/CardOne";
import Layout from "../components/layout/Layout";
import { itemType } from "../types/type";
import { layout } from "../theme/theme";

const CategoryPage = () => {
  const { cate } = useParams();
  const { items } = useItem();

  const parseKoreanDate = (dateStr?: string): number => {
    if (!dateStr) return 0;

    const match = dateStr.match(/(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일/);

    if (!match) return 0;

    const [, year, month, day] = match;

    return new Date(Number(year), Number(month) - 1, Number(day)).getTime();
  };

  const newItems = useMemo(() => {
    return [...items]
      .sort((a, b) => {
        const aTime = parseKoreanDate(a?.createAt);
        const bTime = parseKoreanDate(b?.createAt);

        return bTime - aTime;
      })
      .slice(0, 5);
  }, [items]);

  const cateItems: itemType[] = useMemo(() => {
    if (cate === "ALL") return items;
    if (cate === "new") return newItems;

    return items.filter((item) => item?.category === cate);
  }, [cate, items, newItems]);

  return (
    <Layout>
      <div
        className="
          w-100 h-100
          d-flex flex-column
          justify-content-center align-items-center
          px-3
        "
        style={{
          maxWidth: layout.maxWidth,
          boxSizing: "border-box",
        }}
      >
        <h1>카테고리: {cate}</h1>

        <div
          className="
            d-flex justify-content-center align-items-center
            flex-wrap gap-3
            mt-5
          "
        >
          {cateItems.length > 0 ? (
            cateItems.map((item) => <CardOne key={item?.id} item={item} />)
          ) : (
            <div className="text-secondary py-5">해당 상품이 없습니다.</div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
