import React from "react";
import Button from "@/components/button";
import logo from "@/assets/logo.svg";
import styles from "@/styles/pages/Start.module.scss";
import { usePage } from "@/hooks/usePage";

const Start = () => {
  const { toLogin, toRegist } = usePage();
  return (
    <div className={styles.container}>
      <img src={logo} alt="logo" width="600px" />
      <Button
        type="button"
        color="primary"
        variant="contained"
        rounded
        onClick={toRegist}
      >
        Get Started
      </Button>
      <Button
        type="button"
        color="transparent"
        variant="filled"
        onClick={toLogin}
      >
        Sign In &gt;
      </Button>
    </div>
  );
};

export default Start;
