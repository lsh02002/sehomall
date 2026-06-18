import React from "react";
import { BackwardButton } from "./BackwardButton";

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
        <BackwardButton />
        {children}
      </main>
    </div>
  );
};

export default Layout;
