import React from "react";
import Card from "@/components/card";
import styles from "@/styles/pages/Group.module.scss";
import { usePage } from "@/hooks/usePage";
import { useParams } from "react-router-dom";

const Group = () => {
  const { toJoin } = usePage();
  const { uid } = useParams();
  return (
    <>
      <div className={styles.cardContainer}>
        <Card onClick={() => toJoin(uid!)}>Join a already exists group</Card>
        <Card>Create a new group</Card>
      </div>
    </>
  );
};

export default Group;
