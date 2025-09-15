import React from "react";
import styled from "styled-components";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";

type TablePropsType<TData extends object> = {
  columns: ColumnDef<TData, any>[];
  data: TData[];
};

function NoticeTable<TData extends object>({ columns, data }: TablePropsType<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Container>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}

export default NoticeTable;

const Container = styled.div`
max-width: 100%;
overflow-x: auto;
  table {
    width: 100%;
    max-width: 870px;
    border-collapse: collapse;    
  }
  table th {
    background-color: lightgray;
    border: 1px solid white;
  }
  table td {
    border: 1px solid lightgray;
    padding: 5px;
  }
`;
