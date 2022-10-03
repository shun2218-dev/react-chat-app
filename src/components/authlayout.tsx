import React, { useEffect } from "react";
import { useAuthUser } from "@/atoms/useAuthUser";
import { usePage } from "@/hooks/usePage";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  const authUser = useAuthUser();
  const { toLogin, toProfile } = usePage();
  useEffect(() => {
    if (!authUser) {
      toLogin();
    } else if (!authUser?.photoURL || !authUser.displayName) {
      toProfile(authUser.uid!);
      document.body.classList.remove("home");
    }
  }, [authUser?.uid]);
  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthLayout;
