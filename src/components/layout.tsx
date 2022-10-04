import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuthUser } from "@/atoms/useAuthUser";
import { usePage } from "@/hooks/usePage";

const Layout = () => {
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
      <Outlet />
    </>
  );
};

export default Layout;
