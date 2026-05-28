import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { itemType } from "../../types/type";
import CardTwo from "../card/CardTwo";
import { layout } from "../../them/them";

type CategoryTabPropsType = {
  cate: string;
  setCate: Dispatch<SetStateAction<string>>;
  cateItems: itemType[];
};

const CategoryTab = ({ cate, setCate, cateItems }: CategoryTabPropsType) => {
  const OnTabClick = (cat: string) => {
    setCate(cat);
  };
  return (
    <TabInner>
      <ul className="btn">
        <li
          className={`${cate === "ALL" ? "active" : ""}`}
          onClick={() => OnTabClick("ALL")}
        >
          전체
        </li>
        <li
          className={`${cate === "BAGS" ? "active" : ""}`}
          onClick={() => OnTabClick("BAGS")}
        >
          BAGS
        </li>
        <li
          className={`${cate === "WALLETS" ? "active" : ""}`}
          onClick={() => OnTabClick("WALLETS")}
        >
          WALLETS
        </li>
        <li
          className={`${cate === "ACCESSORIES" ? "active" : ""}`}
          onClick={() => OnTabClick("ACCESSORIES")}
        >
          ACCESSORIES
        </li>
        <li
          className={`${cate === "SCARVES" ? "active" : ""}`}
          onClick={() => OnTabClick("SCARVES")}
        >
          SCARVES
        </li>
      </ul>
      <div className="tabs">
        {cate === "ALL" && (
          <div id="tab1">
            <Items>
              {cateItems.length > 0 ? (
                cateItems.map((item) => <CardTwo key={item.id} item={item} />)
              ) : (
                <em>상품이 없습니다.</em>
              )}
            </Items>
          </div>
        )}
        {cate === "BAGS" && (
          <div id="tab2">
            <Items>
              {cateItems.length > 0 ? (
                cateItems.map((item) => <CardTwo key={item.id} item={item} />)
              ) : (
                <em>상품이 없습니다.</em>
              )}
            </Items>
          </div>
        )}
        {cate === "WALLETS" && (
          <div id="tab3">
            <Items>
              {cateItems.length > 0 ? (
                cateItems.map((item) => <CardTwo key={item.id} item={item} />)
              ) : (
                <em>상품이 없습니다.</em>
              )}
            </Items>
          </div>
        )}
        {cate === "ACCESSORIES" && (
          <div id="tab4">
            <Items>
              {cateItems.length > 0 ? (
                cateItems.map((item) => <CardTwo key={item.id} item={item} />)
              ) : (
                <em>상품이 없습니다.</em>
              )}
            </Items>
          </div>
        )}
        {cate === "SCARVES" && (
          <div id="tab5">
            <Items>
              {cateItems.length > 0 ? (
                cateItems.map((item) => <CardTwo key={item.id} item={item} />)
              ) : (
                <em>상품이 없습니다.</em>
              )}
            </Items>
          </div>
        )}
      </div>
    </TabInner>
  );
};

export default CategoryTab;

const TabInner = styled.div`
  margin-top: 30px;
  width: 100%;
  height: 100%;
  max-width: ${layout.maxWidth};  

  .btn {
    list-style: none;
    padding: 6px;
    margin: 0 0 24px 0;

    display: inline-flex;
    align-items: center;
    gap: 8px;

    background: #f5f5f5;
    border-radius: 999px;

    box-shadow:
      inset 0 1px 2px rgba(0, 0, 0, 0.05),
      0 4px 12px rgba(0, 0, 0, 0.04);
  }

  .btn li {
    min-width: 140px;
    height: 48px;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0 20px;

    border-radius: 999px;

    cursor: pointer;

    font-size: var(--button-font-size);
    font-weight: 600;

    color: #666;
    background: transparent;

    transition:
      background 0.25s,
      color 0.25s,
      transform 0.2s,
      box-shadow 0.25s;

    user-select: none;
  }

  .btn li:hover {
    background: rgba(255, 255, 255, 0.8);
    color: #111;
    transform: translateY(-1px);
  }

  .btn li.active {
    background: white;
    color: #e60023;

    box-shadow:
      0 6px 18px rgba(230, 0, 35, 0.15),
      0 2px 6px rgba(0, 0, 0, 0.06);

    transform: translateY(-1px);
  }

  .tabs > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: ${layout.maxWidth}) {
    .btn {
      width: 100%;
      overflow-x: auto;
      scrollbar-width: none;
    }

    .btn::-webkit-scrollbar {
      display: none;
    }

    .btn li {
      min-width: 120px;
      flex-shrink: 0;
      font-size: 14px;
    }
  }
`;

const Items = styled.div`
  border: 1px solid #efefef;
  border-radius: 24px;

  background: white;
  
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  min-height: 600px;

  flex-wrap: wrap;

  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.04),
    0 2px 8px rgba(0, 0, 0, 0.03);

  em {
    display: inline-block;
    text-align: left;
    width: 100%;
    padding-left: 20px;
    color: #666;
    font-style: normal;
  }
`;
