import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { usePage } from "./usePage";

export function useSignUp() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const { toLogin } = usePage();

  const addUserList = (uid: string, data: any) => {
    const ref = doc(db, "users", uid);
    setDoc(ref, { ...data });
  };

  // eslint-disable-next-line max-len
  const signUp = async (email: string, password: string) => {
    setLoading(true);
    return await createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log("signed up!");
        const {
          user: { uid, email },
        } = res;
        addUserList(uid, { uid, email });
      })
      .then(toLogin)
      .catch((e) => {
        setError(e instanceof Error ? e : Error("unecpected error!"));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    signUp,
    loading,
    error,
  };
}
