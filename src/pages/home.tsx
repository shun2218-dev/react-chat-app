import React, { useEffect } from "react";
import { useAuthUser } from "@/atoms/useAuthUser";
import { usePage } from "@/hooks/usePage";
import Card from "@/components/card";
import styles from "@/styles/pages/Home.module.scss";
import FlashMessage from "@/components/flashMessage";
import { useFlashMessage } from "@/hooks/useFlashMessage";
import PrivateIcon from "@/Icons/privateIcon";
import GroupIcon from "@/Icons/groupIcon";

const Home = () => {
  const authUser = useAuthUser();
  const { toLogin, toPrivate, toGroup, toProfile } = usePage();
  const { messageState, flashState } = useFlashMessage(5000);

  useEffect(() => {
    if (!authUser) {
      toLogin();
    } else if (!authUser?.photoURL || !authUser.displayName) {
      toProfile(authUser.uid!);
    }
  }, [authUser?.uid]);

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
