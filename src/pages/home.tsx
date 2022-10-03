import React, { lazy } from "react";
import { useAuthUser } from "@/atoms/useAuthUser";
import styles from "@/styles/pages/Home.module.scss";
import { usePage } from "@/hooks/usePage";
import { useFlashMessage } from "@/hooks/useFlashMessage";

const Card = lazy(() => import("@/components/card"));
const FlashMessage = lazy(() => import("@/components/flashMessage"));
const PrivateIcon = lazy(() => import("@/Icons/privateIcon"));
const GroupIcon = lazy(() => import("@/Icons/groupIcon"));

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
