import React from "react";
import Card from "@/components/card";
import styles from "@/styles/pages/Group.module.scss";

const Group = () => {
  return (
    <>
      <div className={styles.cardContainer}>
        <Card>Join a already exists group</Card>
        <Card>Create a new group</Card>
      </div>
    </>
  );
};

export default Group;
