import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

export const getUserInfo = async (uid: string) => {
  const userRef = doc(db, "users", uid);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    const user = docSnap.data();
    return user;
  }
};
