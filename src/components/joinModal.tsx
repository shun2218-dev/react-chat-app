import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { usePage } from "@/hooks/usePage";
import Modal from "./modal";
import Button from "./button";
import styles from "@/styles/components/Modal.module.scss";
import { db } from "@/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { getUserInfo } from "@/lib/getUserInfo";
import { useAuthUser } from "@/atoms/useAuthUser";
import { CustomModal } from "@/types/CustomModal";
import { informationMessage } from "@/lib/infomationMessage";

const JoinModal: FC<CustomModal> = ({ open, modalToggle }) => {
  const authUser = useAuthUser();
  const { uid, groupid } = useParams();
  const { toJoin } = usePage();

  const invitationCheck = async (uid: string, groupid: string) => {
    const inviteRef = collection(db, "groups", groupid, "invitations");
    await getDocs(inviteRef).then(async (snapshot) => {
      const ids = snapshot.docs.map((doc) => doc.id);
      if (ids.includes(uid)) {
        const targetRef = doc(db, "groups", groupid, "invitations", uid);
        await deleteDoc(targetRef);
      }
    });
  };
  const joinGroup = async (groupid: string, uid: string) => {
    const membersRef = doc(db, "groups", groupid, "members", uid);
    await getUserInfo(uid).then(async (member) => {
      await setDoc(membersRef, member)
        .then(() => modalToggle("join"))
        .then(async () => {
          await informationMessage(uid, groupid, "joined");
        })
        .then(async () => {
          await invitationCheck(uid!, groupid!);
        });
    });
  };
  return (
    <Modal title="Join this group?" open={open}>
      <div className={`${styles.modalButton} ${styles.row}`}>
        <Button
          type="button"
          color="primary"
          variant="contained"
          onClick={() => joinGroup(groupid!, uid!)}
          fullWidth
        >
          Yes
        </Button>
        <Button
          type="button"
          color="transparent"
          variant="outlined"
          onClick={() => toJoin(uid!)}
          fullWidth
        >
          No
        </Button>
      </div>
    </Modal>
  );
};

export default JoinModal;
