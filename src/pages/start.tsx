import React from "react";
import Button from "@/components/button";
import logo from "@/assets/logo.svg";
import styles from "@/styles/pages/Start.module.scss";
import { useNavigate } from "react-router-dom";

const Start = () => {
  const navigate = useNavigate();

  const toLogin = () => {
    navigate("/login");
  };

  const toRegist = () => {
    navigate("/regist");
  };

  return (
    <div className={styles.container}>
      <img src={logo} alt="logo" width="600px" />
      <Button
        type="button"
        color="primary"
        variant="contained"
        rounded
        onClick={toLogin}
      >
        Get Started
      </Button>
      <Button
        type="button"
        color="transparent"
        variant="filled"
        onClick={toRegist}
      >
        Sign In &gt;
      </Button>
    </div>
  );
};

export default Start;
