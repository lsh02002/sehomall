import React, { useEffect, useMemo, useState } from "react";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import NoticeTable from "../components/NoticeTable";
import { useSearchParams } from "react-router-dom";
import { GetAllNotices } from "../api/sehomallApi";
import Paging from "../components/pagination/Paging";

const NoticePage = () => {
  const [notices, setNotices] = useState([]);
  const [total, setTotal] = useState(0);

  const [searchParams] = useSearchParams();
  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page"))
    : 1;
  const size = searchParams.get("size")
    ? parseInt(searchParams.get("size"))
    : 5;

  useEffect(() => {
    GetAllNotices(page, size)
      .then((res) => {
        console.log(res);
        setNotices(res.data.content);
        setTotal(res.data.totalElements);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [page, size]);

  const columns = useMemo(
    () => [
      {
        accessor: "no",
        Header: "번호",
      },
      {
        accessor: "title",
        Header: "제목",
      },
      {
        accessor: "content",
        Header: "내용",
      },
      {
        accessor: "nickname",
        Header: "작성자",
      },
      {
        accessor: "date",
        Header: "작성일",
      },
    ],
    []
  );

  const data = useMemo(
    () =>
      notices.map((notice) => ({
        no: notice.id,
        title: notice.title,
        content: notice.content,
        nickname: notice.nickname,
        date: notice.modifyAt,
      })),
    [notices]
  );

  return (
    <Layout>
      <Container>
        <h1>공지사항</h1>
        <NoticeTable columns={columns} data={data} />
        <Paging to={"/notice"} total={total} size={size} page={page} />
      </Container>
    </Layout>
  );
};

export default NoticePage;

const Container = styled.div`
  margin-top: 50px;
  text-align: center;
`;
