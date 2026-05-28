import { useNavigate } from "react-router-dom";

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
    <nav className="w-100 d-flex justify-content-center align-items-center gap-1 m-3">
      <button
        className="btn btn-light border rounded-4 fw-bold shadow-sm"
        style={{
          minWidth: "42px",
          height: "42px",
        }}
        onClick={() => navigate(`${to}?page=${page - 1}&size=${size}`)}
        disabled={page === 1}
      >
        &lt;
      </button>

      {Array(numPages)
        .fill(null)
        .map((_, i) => {
          const currentPage = i + 1;
          const isActive = page === currentPage;

          return (
            <button
              key={currentPage}
              className={`btn border rounded-4 fw-bold ${
                isActive ? "btn-dark" : "btn-light"
              }`}
              style={{
                minWidth: "42px",
                height: "42px",
                padding: "0 16px",
              }}
              onClick={() => navigate(`${to}?page=${currentPage}&size=${size}`)}
              aria-current={isActive ? "page" : undefined}
            >
              {currentPage}
            </button>
          );
        })}

      <button
        className="btn btn-light border rounded-4 fw-bold shadow-sm"
        style={{
          minWidth: "42px",
          height: "42px",
        }}
        onClick={() => navigate(`${to}?page=${page + 1}&size=${size}`)}
        disabled={page === numPages}
      >
        &gt;
      </button>
    </nav>
  );
}

export default Paging;
