import React from "react";
import { useAuthUser } from "@/atoms/useAuthUser";
import { usePage } from "@/hooks/usePage";
import styles from "@/styles/pages/Home.module.scss";
import { useFlashMessage } from "@/hooks/useFlashMessage";

import Card from "@/components/card";
import FlashMessage from "@/components/flashMessage";
import PrivateIcon from "@/Icons/privateIcon";
import GroupIcon from "@/Icons/groupIcon";

const Home = () => {
  const authUser = useAuthUser();
  const { toPrivate, toGroup } = usePage();
  const { messageState, flashState } = useFlashMessage(5000);

  return (
    <>
      {flashState && <FlashMessage {...messageState!} />}
      <div className={styles.cardContainer}>
        <Card
          onClick={() => toPrivate(authUser?.uid!)}
          startIcon={<PrivateIcon title />}
        >
          Private Chat
        </Card>
        <Card
          onClick={() => toGroup(authUser?.uid!)}
          startIcon={<GroupIcon title />}
        >
          Group Chat
        </Card>
      </div>
    </>
  );
};

export default Home;
