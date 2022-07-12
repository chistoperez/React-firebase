import React from "react";
import { Outlet, useParams } from "react-router-dom";

const LayoutContainerForm = () => {
  const { nanoid } = useParams();

  return (
    <div className="w-96 mx-auto mt-10">
      <Outlet />
    </div>
  );
};

export default LayoutContainerForm;
