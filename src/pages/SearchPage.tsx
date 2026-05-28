import React, { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";
import CardOne from "../components/card/CardOne";

import { itemData } from "../components/data/itemData";

import { itemType } from "../types/type";

import { layout } from "../theme/theme";

const SearchPage = () => {
  const [searchItems, setSearchItems] = useState<itemType[]>([]);

  const [searchResult, setSearchResult] = useState<itemType[]>([]);

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    setSearchItems(itemData?.content);
  }, []);

  const OnSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setKeyword(value);

    if (value.trim() === "") {
      setSearchResult([]);

      return;
    }

    setSearchResult(
      searchItems.filter((item) =>
        item?.name?.toLowerCase().includes(value.toLowerCase()),
      ),
    );
  };

  return (
    <Layout>
      <div
        className="
          d-flex flex-column
          justify-content-start align-items-center
          w-100
          mt-5 px-3
        "
      >
        <div
          className="
            w-100
            d-flex flex-column
            justify-content-center align-items-center
          "
        >
          {/* TITLE */}
          <h1
            className="mb-4"
            style={{
              fontSize: "var(--main-h1-size)",
            }}
          >
            상품 검색
          </h1>

          {/* SEARCH INPUT */}
          <input
            type="text"
            value={keyword}
            placeholder="키워드를 입력하시면 자동으로 조회됩니다."
            onChange={OnSearchChange}
            className="
              form-control
              rounded-4
              shadow-sm
            "
            style={{
              width: "100%",
              maxWidth: "360px",
              padding: "12px 16px",
            }}
          />

          {/* ITEMS */}
          <div
            className="
              d-flex flex-wrap
              justify-content-start align-items-center
              gap-3
              mt-5
              w-100
            "
            style={{
              maxWidth: layout.maxWidth,
            }}
          >
            {searchResult.length > 0 ? (
              searchResult.map((item, index) => (
                <CardOne key={index} item={item} />
              ))
            ) : (
              <div
                className="
                  w-100
                  text-center
                  text-secondary
                  py-5
                "
              >
                {keyword.trim() === ""
                  ? "상품명을 검색해 주세요."
                  : "상품이 없습니다."}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
