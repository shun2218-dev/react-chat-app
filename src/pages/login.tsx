import React, { FormEvent } from "react";
import Header from "@/components/header";
import Form from "@/components/form";
import Input from "@/components/input";
import Button from "@/components/button";
import styles from "@/styles/pages/Login.module.scss";
import { usePage } from "@/hooks/usePage";

const Login = () => {
  const { toRegist, toReset } = usePage();
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <>
      <Header />
      <Form title="Sign In" onSubmit={onSubmit}>
        {/* <Input label="Name" placeholder="your name" /> */}
        <Input label="Email" type="email" placeholder="Your Email" />
        <Input label="Password" type="password" placeholder="Password" />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          height="52px"
          margin="30px 0 0"
        >
          Sign In
        </Button>
        <div className={styles.buttonGroup}>
          <Button type="button" color="transparent" onClick={toReset}>
            Forgot Password
          </Button>
          <Button type="button" color="transparent" onClick={toRegist}>
            Create a New Account
          </Button>
        </div>
      </Form>
    </>
  );
};

export default Login;
