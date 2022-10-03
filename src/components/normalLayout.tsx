import React, { useEffect } from "react";
import { useAuthUser } from "@/atoms/useAuthUser";
import { usePage } from "@/hooks/usePage";
import { Outlet } from "react-router-dom";

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
      <Outlet />
    </>
  );
};

export default NormalLayout;
