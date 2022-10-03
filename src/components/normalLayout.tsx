import React, { useEffect } from "react";
import { useAuthUser } from "@/atoms/useAuthUser";
import { usePage } from "@/hooks/usePage";
import { Outlet } from "react-router-dom";
import Header from "./header";

const NormalLayout = () => {
  const authUser = useAuthUser();
  const { toHome } = usePage();
  useEffect(() => {
    if (authUser?.uid) {
      toHome(authUser.uid);
    }
  }, []);
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default NormalLayout;
