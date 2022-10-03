import React, { useEffect } from "react";
import { useAuthUser } from "@/atoms/useAuthUser";
import { usePage } from "@/hooks/usePage";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./header";

const Layout = () => {
  const { pathname } = useLocation();
  const authUser = useAuthUser();
  const { toHome, toLogin, toProfile } = usePage();
  useEffect(() => {
    if (authUser?.uid) {
      if (!authUser?.photoURL || !authUser.displayName) {
        toProfile(authUser?.uid);
        document.body.classList.remove("home");
      } else {
        toHome(authUser.uid);
      }
    } else {
      toLogin();
    }
  }, [authUser?.uid]);

  return (
    <>
      {pathname !== "/start" && <Header />}
      <Outlet />
    </>
  );
};

export default Layout;
