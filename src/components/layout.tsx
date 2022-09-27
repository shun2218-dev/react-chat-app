import React, { useEffect } from "react";
import { useAuthUser } from "@/atoms/useAuthUser";
import { usePage } from "@/hooks/usePage";
import { Outlet } from "react-router-dom";
import Header from "./header";

const Layout = () => {
  const authUser = useAuthUser();
  const { toLogin, toProfile } = usePage();
  useEffect(() => {
    if (!authUser) {
      toLogin();
    } else if (!authUser?.photoURL || !authUser.displayName) {
      toProfile(authUser.uid!);
    }
  }, [authUser?.uid]);
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
