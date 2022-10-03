import React from "react";
import { Outlet } from "react-router-dom";

const NormalLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default NormalLayout;
