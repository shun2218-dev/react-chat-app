import MessageInput from "@/components/messageInput";
import UserList from "@/components/userList";
import React, { FormEvent, useState } from "react";

const GroupRoom = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <>
      <UserList group />
      <MessageInput
        onSubmit={onSubmit}
        loading={loading}
        state={message}
        setState={setMessage}
      />
    </>
  );
};

export default GroupRoom;
