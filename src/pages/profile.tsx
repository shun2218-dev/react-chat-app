import React, { FormEvent, useRef, useState } from "react";
import Avatar from "@/components/avatar";
import Button from "@/components/button";
import Form from "@/components/form";
import Header from "@/components/header";
import Input from "@/components/input";
import { usePage } from "@/hooks/usePage";
import { auth, db, storage } from "@/firebase";
import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useParams } from "react-router-dom";
import { useAuthUser, useSetAuthUser } from "@/atoms/useAuthUser";
import { doc, updateDoc } from "firebase/firestore";

const Profile = () => {
  const { toHome } = usePage();
  const authUser = useAuthUser();
  const setAuthUser = useSetAuthUser();
  const { uid } = useParams();
  const [image, setImage] = useState<File | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const updateUserProfile = async (
    uid: string,
    displayName: string,
    photoURL: string
  ) => {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, { displayName, photoURL }).then(() =>
      console.log("Updated user info")
    );
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    const { uid, email } = authUser!;
    if (image && name && uid && email) {
      const imageRef = ref(storage, `avaters/${uid}_${image.name}`);
      await uploadBytes(imageRef, image).then(() =>
        console.log("Uploaded a file")
      );
      await getDownloadURL(imageRef).then(async (url) => {
        await updateProfile(auth.currentUser!, {
          displayName: name,
          photoURL: url,
        })
          .then(() => {
            setAuthUser({ displayName: name, photoURL: url, email, uid });
          })
          .then(async () => await updateUserProfile(uid, name, url))
          .then(() => console.log("Updated profile"))
          .then(() => toHome(uid));
      });
    } else {
      alert(
        "User name and Profile image is a required contents to start chatting"
      );
    }
  };

  return (
    <>
      <Header />
      <Form title="Setting Profile" onSubmit={onSubmit}>
        {authUser?.photoURL ? (
          <Avatar
            size="80px"
            state={image}
            setState={setImage}
            header={false}
          />
        ) : (
          <Avatar
            size="80px"
            state={image}
            setState={setImage}
            header={false}
          />
        )}
        {authUser?.displayName ? (
          <Input
            label="Name"
            placeholder="Your Name"
            required
            ref={nameRef}
            defaultValue={authUser.displayName}
          />
        ) : (
          <Input label="Name" placeholder="Your Name" required ref={nameRef} />
        )}
        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          height="52px"
          margin="30px 0 0"
        >
          Start Chat
        </Button>
      </Form>
    </>
  );
};

export default Profile;
