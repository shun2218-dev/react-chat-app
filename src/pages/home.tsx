import React, { useEffect } from "react";
import { useAuthUser } from "@/atoms/useAuthUser";
import { usePage } from "@/hooks/usePage";
import Card from "@/components/card";
import Header from "@/components/header";
import styles from "@/styles/pages/Home.module.scss";

const Home = () => {
  const authUser = useAuthUser();
  const { toLogin, toPrivate, toGroup } = usePage();
  useEffect(() => {
    !authUser && toLogin();
  }, [authUser?.uid]);
  return (
    <>
      <Header />
      <div className={styles.cardContainer}>
        <Card onClick={() => toGroup(authUser?.uid!)}>Group Chat</Card>
        <Card onClick={() => toPrivate(authUser?.uid!)}>Private Chat</Card>
      </div>
    </>
  );
};

export default Home;
