import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./header";

const Layout = () => {
  const { pathname } = useLocation();
  return (
    <>
      {pathname !== "/start" && <Header />}
      <Outlet />
    </>
  );
};

export default Layout;
