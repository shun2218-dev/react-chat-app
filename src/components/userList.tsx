import React, { useState } from "react";
import styles from "@/styles/components/UserList.module.scss";
import { useEffect } from "react";
import {
  collection,
  DocumentData,
  QueryDocumentSnapshot,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useAuthUser } from "@/atoms/useAuthUser";
import { usePage } from "@/hooks/usePage";
import { useParams } from "react-router-dom";
import { memo } from "react";
import Button from "./button";

const UserList = memo(({ group = false }: { group?: boolean }) => {
  const authUser = useAuthUser();
  const { toPrivateRoom } = usePage();
  const [users, setUsers] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  const [ids, setIds] = useState<string[]>([]);
  const { partnerid, groupid } = useParams();

  useEffect(() => {
    const userRef = collection(db, "users");
    if (group && groupid) {
      const groupRef = collection(db, "groups", groupid, "members");
      const unSub = onSnapshot(groupRef, (snapshot) => {
        setUsers([...snapshot.docs.map((doc) => doc)]);
      });
      return () => {
        unSub();
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
              <img src={user.data().photoURL} alt="" className={styles.image} />
              <p>{user.data().displayName}</p>
            </li>
          ))
        ) : (
          <div>...loading</div>
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
              >
                Invite New Members
              </Button>
              <Button type="button" color="error" variant="outlined" fullWidth>
                Exit This Room
              </Button>
            </div>
          </>
        )}
      </ul>
    </div>
  );
});

export default UserList;
