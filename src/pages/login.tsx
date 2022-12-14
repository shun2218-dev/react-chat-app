import React, { FormEvent, useRef } from "react";
import Header from "@/components/header";
import Form from "@/components/form";
import Input from "@/components/input";
import Button from "@/components/button";
import styles from "@/styles/pages/Login.module.scss";
import { usePage } from "@/hooks/usePage";
import { useSignIn } from "@/hooks/useSignIn";
import { useFlashMessage } from "@/hooks/useFlashMessage";
import FlashMessage from "@/components/flashMessage";
import SignInIcon from "@/Icons/signInIcon";
import LockIcon from "@/Icons/lockIcon";

const Login = () => {
  const { toRegist, toReset } = usePage();
  const { signIn, loading, error } = useSignIn();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { messageState, flashState, reset } = useFlashMessage(10000);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    if (email && password) {
      signIn(email, password).finally(reset);
    }
  };

  return (
    <>
      {flashState && <FlashMessage {...messageState!} />}
      <Header />
      <Form title="Sign In" onSubmit={onSubmit} startIcon={<LockIcon title />}>
        <Input
          label="Email"
          type="email"
          placeholder="Your Email"
          required
          ref={emailRef}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Password"
          required
          ref={passwordRef}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          height="52px"
          margin="30px 0 0"
          startIcon={<SignInIcon />}
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
