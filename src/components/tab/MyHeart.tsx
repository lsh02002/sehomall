import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useLogin } from "../../api/loginContextApi";
import Paging from "../pagination/Paging";
import CardOne from "../card/CardOne";
import { useMyPage } from "../../api/myPageTabContextApi";
import { useItem } from "../../api/itemContextApi";
import { heartData } from "../data/heartData";

const MyHeart = () => {
  const { isLogin } = useLogin();
  const { myHearts, setMyHearts, isHeartUpdated } = useItem();
  const { setHeartPage } = useMyPage();  
  const [heartTotal, setHeartTotal] = useState(0);

  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");    
  const size = parseInt(searchParams.get("size") || "6");

  useEffect(() => {
    setHeartPage(page);
  }, [page, setHeartPage]);

  useEffect(() => {
    setMyHearts(heartData?.content);
    setHeartTotal(heartData?.content?.length);
  }, [isHeartUpdated, size, page, setMyHearts]);

  return (
    <>
      {myHearts?.length > 0 ? (
        myHearts.map((item, index) => <CardOne key={index} item={item} />)
      ) : (
        <div>찜한 상품이 없습니다.</div>
      )}
      <Paging
        to={`/mypage/HEARTS`}
        total={heartTotal}
        size={size}
        page={page}
      />
    </>
  );
};

export default MyHeart;
