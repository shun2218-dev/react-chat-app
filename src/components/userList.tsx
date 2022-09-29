import React, { useCallback, useState } from "react";
import styles from "@/styles/components/UserList.module.scss";
import { useEffect } from "react";
import {
  collection,
  DocumentData,
  QueryDocumentSnapshot,
  onSnapshot,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useAuthUser } from "@/atoms/useAuthUser";
import { usePage } from "@/hooks/usePage";
import { useParams } from "react-router-dom";
import { memo } from "react";
import Button from "./button";
import Modal from "./modal";
import { getUserInfo } from "@/lib/getUserInfo";
import { NavigationState } from "@/types/NavigationState";

const UserList = memo(({ group = false }: { group?: boolean }) => {
  const authUser = useAuthUser();
  const { toPrivateRoom, toJoin, toHome } = usePage();
  const [users, setUsers] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  const [inviteUsers, setInviteUsers] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([]);
  const { uid, partnerid, groupid } = useParams();
  const [inviteOpen, setInviteOpen] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);

  const modalToggle = (target: string) => {
    if (target === "invite") {
      setInviteOpen(!inviteOpen);
    } else if (target === "exit") {
      setExitOpen(!exitOpen);
    } else if (target === "join") {
      setJoinOpen(!joinOpen);
    }
  };

  const joinGroup = async (groupid: string, uid: string) => {
    const membersRef = doc(db, "groups", groupid, "members", uid);
    await getUserInfo(uid).then(async (member) => {
      await setDoc(membersRef, member).then(() => modalToggle("join"));
    });
  };

  const exitGroup = async (groupid: string, uid: string) => {
    const flashMessage = {
      title: "Success",
      status: "success",
      text: "Exit group.",
    } as NavigationState;
    await deleteDoc(doc(db, "groups", groupid, "members", uid)).then(() =>
      toHome(uid!, flashMessage)
    );
  };

  const isNotMember = useCallback(
    (doc: QueryDocumentSnapshot<DocumentData>) => doc.id !== authUser?.uid,
    []
  );

  useEffect(() => {
    const userRef = collection(db, "users");
    if (group && groupid) {
      const groupRef = collection(db, "groups", groupid, "members");
      const unSub = onSnapshot(groupRef, (snapshot) => {
        if (snapshot.docs.every(isNotMember)) {
          setJoinOpen(true);
        } else {
          setJoinOpen(false);
        }
        setUsers([...snapshot.docs.map((doc) => doc)]);
      });
      const unSubUser = onSnapshot(userRef, (snapshot) => {
        setInviteUsers([
          ...snapshot.docs.filter((doc) => doc.id !== authUser?.uid!),
        ]);
      });
      return () => {
        unSub();
        unSubUser();
      };
    } else {
      const unSub = onSnapshot(userRef, (snapshot) => {
        setUsers([...snapshot.docs.filter((doc) => doc.id !== authUser?.uid!)]);
      });
      return () => {
        unSub();
      };
    }
  }, []);

  return (
    <>
      <Modal title="Join this group?" open={joinOpen}>
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
      <Modal title="Select the member to invite" open={inviteOpen}>
        <ul className={`${styles.userList} ${styles.invite}`}>
          {inviteUsers.length ? (
            inviteUsers.map((user) => (
              <label key={user.id} className={styles.label}>
                <li
                  className={`${styles.user} ${styles.passive} `}
                  onClick={() => {}}
                >
                  <input type="checkbox" name="" id="" />
                  <img
                    src={user.data().photoURL}
                    alt=""
                    className={styles.image}
                  />
                  <p>{user.data().displayName}</p>
                </li>
              </label>
            ))
          ) : (
            <div>...loading</div>
          )}
        </ul>
        <div className={`${styles.modalButton}`}>
          <Button
            type="button"
            color="primary"
            variant="contained"
            fullWidth
            onClick={() => modalToggle("invite")}
          >
            Invite New Members
          </Button>
          <Button
            type="button"
            color="transparent"
            variant="filled"
            fullWidth
            onClick={() => modalToggle("invite")}
          >
            Cancel
          </Button>
        </div>
      </Modal>
      <Modal title="Exit this group?" open={exitOpen}>
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
      <div className={styles.container}>
        <ul className={`${styles.userList} ${styles.group}`}>
          <li className={styles.listTitle}>
            {group ? "Members List" : "User List"}
          </li>
          {users.length ? (
            users.map((user) => (
              <li
                key={user.id}
                className={`${styles.user} ${
                  partnerid === user.id ? styles.active : styles.passive
                } ${group && styles.active}`}
                onClick={() => {
                  !group && toPrivateRoom(authUser?.uid!, user.id);
                }}
              >
                <img
                  src={user.data().photoURL}
                  alt=""
                  className={styles.image}
                />
                <p>{user.data().displayName}</p>
              </li>
            ))
          ) : (
            <div className={styles.loading}>...loading</div>
          )}

          {group && (
            <>
              <ul className={styles.userList}>
                <li className={styles.listTitle}>{"Invitation List"}</li>
              </ul>
              <div className={styles.buttonGroup}>
                <Button
                  type="button"
                  color="success"
                  variant="outlined"
                  fullWidth
                  onClick={() => modalToggle("invite")}
                >
                  Invite New Members
                </Button>
                <Button
                  type="button"
                  color="error"
                  variant="outlined"
                  fullWidth
                  onClick={() => modalToggle("exit")}
                >
                  Exit This Room
                </Button>
              </div>
            </>
          )}
        </ul>
      </div>
    </>
  );
});

export default UserList;
