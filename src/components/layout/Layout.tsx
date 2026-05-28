import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="
        w-100 min-vh-100
        d-flex flex-column
        align-items-center
        justify-content-start
        position-relative
        overflow-x-hidden
      "
      style={{
        paddingBottom: "110px",
        boxSizing: "border-box",
      }}
    >
      <main
        className="
          w-100 min-vh-100
          d-flex flex-column
          align-items-center
          justify-content-start
        "
        style={{
          paddingBottom: "110px",
          boxSizing: "border-box",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
