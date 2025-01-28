import React from "react";
import { useTable } from "react-table";
import styled from "styled-components";

function NoticeTable({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <Container>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Container>
  );
}

export default NoticeTable;

const Container = styled.div`
  table {
    width: 100vw;
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
