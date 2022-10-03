import React, { FC, memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "@/firebase";
import { deleteDoc, doc, DocumentData } from "firebase/firestore";
import { CustomModal } from "@/types/CustomModal";
import Button from "./button";
import Modal from "./modal";
import styles from "@/styles/components/Modal.module.scss";
import { getUserInfo } from "@/lib/getUserInfo";
import Avatar from "./avatar";
import { informationMessage } from "@/lib/infomationMessage";

const CancelModal: FC<CustomModal> = memo(
  ({ open, modalToggle, cancelId, setCancelId }) => {
    const { uid, groupid } = useParams();
    const [user, setUser] = useState<DocumentData>();

    const onSubmit = async () => {
      if (cancelId && setCancelId) {
        const inviteRef = doc(db, "groups", groupid!, "invitations", cancelId);
        await deleteDoc(inviteRef)
          .then(onClose)
          .then(
            async () =>
              await informationMessage(uid!, groupid!, "canceled", cancelId)
          );
      }
    };

    const onClose = () => {
      if (setCancelId) {
        modalToggle("cancel");
        setCancelId("");
        setUser(undefined);
      }
    };

    useEffect(() => {
      if (cancelId) {
        getUserInfo(cancelId).then((userInfo) => {
          setUser(userInfo);
        });
      }
    }, [cancelId]);

    return (
      <Modal title="Cancel this invitation?" open={open}>
        {user && (
          <div>
            <Avatar size={40} storageRef={user.photoURL} chat />
            <p>{user.displayName}</p>
          </div>
        )}
        <div className={`${styles.modalButton} ${styles.row}`}>
          <Button
            type="button"
            color="primary"
            variant="contained"
            onClick={onSubmit}
          >
            Yes
          </Button>
          <Button
            type="button"
            color="transparent"
            variant="outlined"
            onClick={onClose}
          >
            No
          </Button>
        </div>
      </Modal>
    );
  }
);

export default CancelModal;
