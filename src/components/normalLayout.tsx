import React, { useEffect } from "react";
import { useAuthUser } from "@/atoms/useAuthUser";
import { usePage } from "@/hooks/usePage";
import { Outlet } from "react-router-dom";

const NormalLayout = () => {
  const authUser = useAuthUser();
  const { toStart, toHome } = usePage();
  useEffect(() => {
    if (authUser?.uid) {
      toHome(authUser.uid);
    } else {
      toStart();
    }
  }, []);
  return (
    <>
      <Outlet />
    </>
  );
};

export default NormalLayout;
