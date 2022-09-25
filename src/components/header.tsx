import React from "react";
import logo from "@/assets/logo.svg";
import styles from "@/styles/components/Header.module.scss";
import { usePage } from "@/hooks/usePage";
import { useAuthUser } from "@/atoms/useAuthUser";
import Button from "./button";
import { useSignOut } from "@/hooks/useSignOut";
import { useLocation } from "react-router-dom";
import Avatar from "./avatar";

const Header = () => {
  const { toStart, toHome } = usePage();
  const authUser = useAuthUser();
  const { signOut, loading, error } = useSignOut();
  const { pathname } = useLocation();

  return (
    <header
      className={`${styles.header} ${
        authUser ? styles.login : styles.notLogin
      }`}
    >
      {/* after log in switch toHome */}
      <img
        src={logo}
        alt="logo"
        width="200px"
        height="67px"
        onClick={() => (authUser ? toHome(authUser.uid!) : toStart())}
        style={{ cursor: "pointer" }}
      />
      {authUser && (
        <div className={styles.profile}>
          <p>{authUser.displayName}</p>
          <Avatar header />
          <Button
            type="button"
            variant="outlined"
            color="primary"
            onClick={signOut}
            margin="0 0 0 20px"
          >
            Sign Out
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
