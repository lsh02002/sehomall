import { useNavigate, useLocation } from "react-router-dom";

export function BackwardButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    const from = location.state?.from;

    // 이전 경로가 현재 경로와 같으면 replace
    if (from && from === location.pathname) {
      navigate("/", { replace: true }); // 원하는 fallback 경로
    } else {
      navigate(-1);
    }
  };

  return (
    <span
      role="button"
      onClick={handleClick}
      className="bg-lightgray position-fixed border rounded-5 start-0 m-2 d-inline-block px-3"
      style={{ cursor: "pointer", fontSize: "32px", zIndex: 300 }}
      aria-label="뒤로가기"
    >
      ←
    </span>
  );
}
