import Button from "@/components/button";
import Form from "@/components/form";
import Header from "@/components/header";
import Input from "@/components/input";
import { usePage } from "@/hooks/usePage";
import React, { FormEvent } from "react";

const Reset = () => {
  const { toLogin } = usePage();
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <>
      <Header />
      <Form
        title="Enter your Email address to reset your password"
        onSubmit={onSubmit}
      >
        <Input label="Email" type="email" placeholder="Your Email" />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          height="52px"
          margin="30px 0 0"
        >
          Reset Password
        </Button>
        <Button type="button" color="transparent" onClick={toLogin}>
          Cancel
        </Button>
      </Form>
    </>
  );
};

export default Reset;
