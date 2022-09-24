import React from "react";
import Card from "@/components/card";
import Header from "@/components/header";
import styles from "@/styles/pages/Group.module.scss";

const Group = () => {
  return (
    <>
      <Header />
      <div className={styles.cardContainer}>
        <Card>Join a already exists group</Card>
        <Card>Create a new group</Card>
      </div>
    </>
  );
};

export default Group;
