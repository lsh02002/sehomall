import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { itemType } from "../../types/type";
import CardTwo from "../card/CardTwo";

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
  max-width: 1400px;

  .btn {
    list-style: none;
    padding: 0;
    margin: 0;
    overflow: hidden;
    margin-left: 10px;
  }

  .btn li {
    float: left;
    width: 150px;
    text-align: center;
    cursor: pointer;
    background-color: #eee;
    border-right: 1px solid #ddd;
    padding: 10px;
    border-top: 2px solid transparent;
    font-size: var(--button-font-size);
  }

  .btn li:last-child {
    width: 180px;
    border-right: none;
  }

  .btn li:hover,
  .btn li.active {
    background-color: #fff;
    border-top: 2px solid red;
  }

  .tabs > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Items = styled.div`
  padding-top: 30px;
  max-width: 1400px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  em {
    display: inline-block;
    text-align: left;
    width: 100%;
    padding-left: 100px;
  }
`;
