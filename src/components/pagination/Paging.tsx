import { useNavigate } from "react-router-dom";
import styled from "styled-components";

type PagingPropsType = {
  to: string;
  total: number;
  size: number;
  page: number;
};

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
  min-width: 42px;
  height: 42px;

  padding: 0 16px;
  margin: 0;

  border: 1px solid #e5e5e5;
  border-radius: 14px;

  background: #fafafa;

  color: #333;

  font-size: var(--button-font-size);
  font-weight: 700;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  box-shadow:
    0 4px 10px rgba(0, 0, 0, 0.04),
    0 1px 3px rgba(0, 0, 0, 0.03);

  transition:
    background 0.2s,
    transform 0.2s,
    box-shadow 0.25s,
    border-color 0.2s,
    color 0.2s;

  user-select: none;

  &:hover {
    background: white;

    border-color: #d0d0d0;

    transform: translateY(-1px);

    box-shadow:
      0 8px 18px rgba(0, 0, 0, 0.06),
      0 2px 6px rgba(0, 0, 0, 0.04);

    color: #111;
  }

  &:active {
    transform: scale(0.96);
  }

  &[disabled] {
    opacity: 0.4;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }

  &[aria-current] {
    background: #f5f5f5;

    color: #111;

    border-color: #d9d9d9;

    font-weight: 800;

    box-shadow:
      inset 0 1px 2px rgba(0, 0, 0, 0.04),
      0 4px 10px rgba(0, 0, 0, 0.04);

    cursor: default;
  }

  &[aria-current]:hover {
    background: #f5f5f5;

    color: #111;

    transform: none;
  }
`;
