import React, { FC, useCallback } from "react";
import { CustomModal } from "@/types/CustomModal";
import Modal from "./modal";
import styles from "@/styles/components/Modal.module.scss";
import { useParams } from "react-router-dom";
import Button from "./button";
import { NavigationState } from "@/types/NavigationState";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";
import { usePage } from "@/hooks/usePage";
import { informationMessage } from "@/lib/infomationMessage";

const ExitModal: FC<CustomModal> = ({ open, modalToggle }) => {
  const { uid, groupid } = useParams();
  const { toHome } = usePage();

  const exitGroup = useCallback(async (groupid: string, uid: string) => {
    const flashMessage = {
      title: "Success",
      status: "success",
      text: "Exit group.",
    } as NavigationState;
    await deleteDoc(doc(db, "groups", groupid, "members", uid))
      .then(() => toHome(uid!, flashMessage))
      .then(async () => {
        await informationMessage(uid, groupid, "existed");
      });
  }, []);

  return (
    <Modal title="Exit this group?" open={open}>
      <div className={`${styles.modalButton} ${styles.row}`}>
        <Button
          type="button"
          color="primary"
          variant="contained"
          onClick={() => exitGroup(groupid!, uid!)}
          fullWidth
        >
          Yes
        </Button>
        <Button
          type="button"
          color="transparent"
          variant="outlined"
          onClick={() => modalToggle("exit")}
          fullWidth
        >
          No
        </Button>
      </div>
    </Modal>
  );
};

export default ExitModal;
