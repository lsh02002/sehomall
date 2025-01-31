import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LoginContext } from "../../api/loginContextApi";
import { GetMyHeartedItems } from "../../api/ItemApi";
import Paging from "../pagination/Paging";
import CardOne from "../card/CardOne";
import { MyPageTabContext } from "../../api/myPageTabContextApi";

const MyHeart = () => {
  const { isHeartUpdated } = useContext(LoginContext);
  const { setHeartPage } = useContext(MyPageTabContext);
  const [myHearts, setMyHearts] = useState([]);
  const [heartTotal, setHeartTotal] = useState(0);

  const [searchParams] = useSearchParams();
  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page"))
    : 1;
  const size = searchParams.get("size")
    ? parseInt(searchParams.get("size"))
    : 6;

    useEffect(()=>{
        setHeartPage(page);
    }, [page, setHeartPage])

  useEffect(() => {
    GetMyHeartedItems(page, size)
      .then((res) => {
        console.log(res);
        setMyHearts(res.data.content);
        setHeartTotal(res.data.totalElements);        

        if (res.headers?.accesstoken) {
          localStorage.setItem("accessToken", res.headers?.accesstoken);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [isHeartUpdated, size, page]);

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
