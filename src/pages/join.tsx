import Form from "@/components/form";
import { db } from "@/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";

type Groups = {
  id: string;
  groupName: string;
  owner: string;
  photoURL: string;
};

const Join = () => {
  const [groups, setGroups] = useState<Groups[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    setLoading(true);
    const ref = collection(db, "group");
    const unSub = onSnapshot(ref, (snapshot) => {
      setGroups(
        snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() } as Groups;
        })
      );
      setLoading(false);
    });
    return () => {
      unSub();
    };
  }, []);

  return (
    <Form title="Group List">
      {groups.length ? (
        groups.map((group) => <div>{group.groupName}</div>)
      ) : loading ? (
        <div>...loading</div>
      ) : (
        <div>Not Found</div>
      )}
    </Form>
  );
};

export default Join;
