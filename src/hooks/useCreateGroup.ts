import { db } from "@/firebase";
import { NavigationState } from "@/types/NavigationState";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  getDocs,
  QueryDocumentSnapshot,
  setDoc,
} from "firebase/firestore";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { usePage } from "./usePage";

export const useCreateGroup = () => {
  const [loading, setLoading] = useState(false);
  const { toGroupRoom, toRedirect } = usePage();
  const { uid } = useParams();
  const [members, setMembers] = useState<DocumentData>();

  const getUserInfo = async (uid: string) => {
    const userRef = doc(db, "users", uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      const user = docSnap.data();
      return user;
    }
  };

  const createGroup = async (data: object) => {
    setLoading(true);
    const ref = collection(db, "groups");
    await addDoc(ref, data)
      .then(async ({ id }) => {
        const membersRef = doc(db, "groups", id, "members", uid!);
        await getUserInfo(uid!).then(async (member) => {
          await setDoc(membersRef, member);
        });
        return id;
      })
      .then((id) => {
        const navState = {
          title: "Success",
          status: "success",
          text: "Create group succeeded.",
        } as NavigationState;
        toGroupRoom(uid!, id, navState);
      })
      .catch((e) => {
        const navState = {
          title: "Error",
          status: "error",
          text: "Create group failed.",
        } as NavigationState;
        toRedirect(navState);
      })
      .finally(() => setLoading(true));
  };
  return createGroup;
};
