import React, { FormEvent, useRef } from "react";
import Button from "@/components/button";
import Form from "@/components/form";
import Header from "@/components/header";
import Input from "@/components/input";
import styles from "@/styles/pages/Regist.module.scss";
import { usePage } from "@/hooks/usePage";
import Avatar from "@/components/avatar";
import { useSignUp } from "@/hooks/useSignUp";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";

const Regist = () => {
  const { toLogin } = usePage();
  const { signUp, loading, error } = useSignUp();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmationRef = useRef<HTMLInputElement>(null);

  const passwordValidate = (password: string, passwordConfirmation: string) => {
    if (password === passwordConfirmation) {
      return true;
    } else {
      return false;
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const passwordConfirmation = passwordConfirmationRef.current?.value;
    if (name && email && password && passwordConfirmation) {
      if (passwordValidate(password, passwordConfirmation)) {
        signUp(email, password);
      }
    }
  };
  return (
    <>
      <Header />
      <Form title="Sign Up" onSubmit={onSubmit}>
        <Avatar size="80px" />
        <Input label="Name" placeholder="Your Name" required ref={nameRef} />
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
        <Input
          label="Password Confirmation"
          type="password"
          placeholder="Password Confirmation"
          required
          ref={passwordConfirmationRef}
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
