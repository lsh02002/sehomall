import React, { useEffect, useMemo, useState } from "react";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import NoticeTable from "../components/NoticeTable";
import { Link } from "react-router-dom";
import { GetAllNotices } from "../api/ItemApi";

const NoticePage = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    GetAllNotices()
      .then((res) => {
        console.log(res);
        setNotices(res.data.content);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

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
        title: <Link>{notice.title}</Link>,
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
      </Container>
    </Layout>
  );
};

export default NoticePage;

const Container = styled.div`
  margin-top: 50px;
  text-align: center;  
`;
