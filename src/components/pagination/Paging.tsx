import { useNavigate } from "react-router-dom";
import styled from "styled-components";

type PagingPropsType = {
  to: string;
  total: number;
  size: number;
  page: number;
}

function Paging({ to, total, size, page }: PagingPropsType) {
  const numPages = Math.ceil(total / size);
  const navigate = useNavigate();

  return (
    <Nav>
      <Button
        onClick={() => navigate(`${to}?page=${page - 1}&size=${size}`)}
        disabled={page === 1}
      >
        &lt;
      </Button>
      {Array(numPages)
        .fill(null)
        .map((_, i) => (
          <Button
            key={i + 1}
            onClick={() => navigate(`${to}?page=${i + 1}&size=${size}`)}
            aria-current={page === i + 1 ? "page" : undefined}
          >
            {i + 1}
          </Button>
        ))}
      <Button
        onClick={() => navigate(`${to}?page=${page + 1}&size=${size}`)}
        disabled={page === numPages}
      >
        &gt;
      </Button>
    </Nav>
  );
}

export default Paging;

const Nav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button`
  border: none;
  padding: 8px;
  margin: 0;
  color: white;
  font-size: var(--button-font-size);
  background: gray;

  &:hover {
    background: lightgray;
    cursor: pointer;
  }

  &[disabled] {
    cursor: revert;
    // transform: revert;
  }

  &[aria-current] {
    background: red;
    font-weight: bold;
    cursor: revert;
    // transform: revert;
  }
  
  &[aria-current]:hover {
    background: lightgray;
  }
`;
