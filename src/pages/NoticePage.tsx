import React, { useEffect, useMemo, useState } from "react";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import NoticeTable from "../components/NoticeTable";
import { useSearchParams } from "react-router-dom";
import Paging from "../components/pagination/Paging";
import { noticeType } from "../types/type";
import { ColumnDef } from "@tanstack/react-table";
import { noticeData } from "../components/data/noticeData";

const NoticePage = () => {
  const [notices, setNotices] = useState<noticeType[]>([]);
  const [total, setTotal] = useState(0);

  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "1");
  const size = parseInt(searchParams.get("size") ?? "5");

  useEffect(() => {
    setNotices(noticeData?.content);
    setTotal(noticeData?.totalElements);
  }, [page, size]);

  const columns: ColumnDef<noticeType>[] = [
    { header: "ID", accessorKey: "id" },
    { header: "제목", accessorKey: "title" },
    { header: "내용", accessorKey: "content" },
    { header: "작성자", accessorKey: "nickname" },
    { header: "수정일", accessorKey: "modifyAt" },
  ];

  const data = useMemo(
    () =>
      notices.map((notice: noticeType) => ({
        id: notice?.id,
        title: notice?.title,
        content: notice?.content,
        nickname: notice?.nickname,
        modifyAt: notice?.modifyAt,
      })),
    [notices]
  );

  return (
    <Layout>
      <Container>
        <h1>공지사항</h1>
        <NoticeTable<noticeType> columns={columns} data={data} />
        <Paging to={"/notice"} total={total} size={size} page={page} />
      </Container>
    </Layout>
  );
};

export default NoticePage;

const Container = styled.div`
  overflow-y: hidden;
`;
