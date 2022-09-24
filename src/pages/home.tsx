import { useAuthUser } from "@/atoms/useAuthUser";
import Header from "@/components/header";
import { usePage } from "@/hooks/usePage";
import React from "react";
import { useEffect } from "react";

const Home = () => {
  const authUser = useAuthUser();
  const { toLogin } = usePage();
  useEffect(() => {
    !authUser && toLogin();
  }, [authUser?.uid]);
  return (
    <>
      <Header />
      <div>Home</div>
    </>
  );
};

export default Home;
