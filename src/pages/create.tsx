import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import Form from "@/components/form";
import Input from "@/components/input";
import TextArea from "@/components/textArea";
import Button from "@/components/button";
import { useParams } from "react-router-dom";
import { useFlashMessage } from "@/hooks/useFlashMessage";
import { useCreateGroup } from "@/hooks/useCreateGroup";
import FlashMessage from "@/components/flashMessage";
import { usePage } from "@/hooks/usePage";

const Create = () => {
  const [desc, setDesc] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const { uid } = useParams();
  const createGroup = useCreateGroup();
  const { messageState, flashState, reset } = useFlashMessage(3000);
  const { toHome } = usePage();

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(e.target.value);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    if (name && desc) {
      const data = { groupName: name, description: desc, owner: uid };
      await createGroup(data);
    }
  };

  return (
    <>
      {flashState && <FlashMessage {...messageState!} />}
      <Form title="Create a new group" onSubmit={async (e) => onSubmit(e)}>
        <Input
          label="Group name"
          placeholder="Group name"
          required
          ref={nameRef}
        />
        <TextArea
          value={desc}
          onChange={onChange}
          label="Description"
          placeholder="Description about this group"
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          margin="20px 0 0"
        >
          Next
        </Button>
        <Button
          type="button"
          color="transparent"
          variant="filled"
          onClick={() => toHome(uid!)}
        >
          Cancel
        </Button>
      </Form>
    </>
  );
};

export default Create;
