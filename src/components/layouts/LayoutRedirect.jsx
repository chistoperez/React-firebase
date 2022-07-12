import React from "react";
import { Outlet } from "react-router-dom";

const LayoutRedirect = () => {
  return (
    <div className="mx-auto container">
      <Outlet />
    </div>
  );
};

export default LayoutRedirect;
