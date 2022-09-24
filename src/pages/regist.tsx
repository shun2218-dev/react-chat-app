import React, { FormEvent } from "react";
import Button from "@/components/button";
import Form from "@/components/form";
import Header from "@/components/header";
import Input from "@/components/input";
import styles from "@/styles/pages/Regist.module.scss";
import { usePage } from "@/hooks/usePage";

const Regist = () => {
  const { toLogin } = usePage();
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <>
      <Header />
      <Form title="Sign Up" onSubmit={onSubmit}>
        <Input label="Name" placeholder="Your Name" />
        <Input label="Email" type="email" placeholder="Your Email" />
        <Input label="Password" type="password" placeholder="Password" />
        <Input
          label="Password Confirmation"
          type="password"
          placeholder="Password Confirmation"
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          height="52px"
          margin="30px 0 0"
        >
          Sign Up
        </Button>
        <div className={styles.buttonGroup}>
          <Button type="button" color="transparent" onClick={toLogin}>
            Sign In
          </Button>
        </div>
      </Form>
    </>
  );
};

export default Regist;
