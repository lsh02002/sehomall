import React from "react";

const PageLoading = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center gap-2"
      style={{
        minHeight: "100px",
      }}
    >
      <span
        className="rounded-circle loading-dot"
        style={{
          width: "15px",
          height: "15px",
          backgroundColor: "red",
          animationDelay: "0s",
        }}
      />

      <span
        className="rounded-circle loading-dot"
        style={{
          width: "15px",
          height: "15px",
          backgroundColor: "dodgerblue",
          animationDelay: "0.2s",
        }}
      />

      <span
        className="rounded-circle loading-dot"
        style={{
          width: "15px",
          height: "15px",
          backgroundColor: "royalblue",
          animationDelay: "0.4s",
        }}
      />
    </div>
  );
};

export default PageLoading;
