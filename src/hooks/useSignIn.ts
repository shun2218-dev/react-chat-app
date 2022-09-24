import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";

export function useSignIn() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  // eslint-disable-next-line max-len
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    return await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("signed in!");
      })
      .catch((e) => {
        setError(e instanceof Error ? e : Error("unecpected error!"));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    signIn,
    loading,
    error,
  };
}
