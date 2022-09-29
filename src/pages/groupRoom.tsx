import React, { FormEvent, useState } from "react";
import MessageInput from "@/components/messageInput";
import UserList from "@/components/userList";

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
