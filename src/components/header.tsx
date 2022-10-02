import React from "react";
import { usePage } from "@/hooks/usePage";
import { useAuthUser } from "@/atoms/useAuthUser";
import { useSignOut } from "@/hooks/useSignOut";
import Button from "./button";
import logo from "@/assets/logo.svg";
import styles from "@/styles/components/Header.module.scss";
import { useParams } from "react-router-dom";
import SignOutIcon from "@/Icons/signOutIcon";

const Header = () => {
  const { toStart, toHome, toProfile } = usePage();
  const authUser = useAuthUser();
  const { signOut, loading, error } = useSignOut();
  const { uid } = useParams();

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
        className={styles.logo}
      />
      {authUser && (
        <div className={styles.profile}>
          <p>{authUser.displayName}</p>
          <img
            src={authUser.photoURL!}
            alt=""
            className={styles.avatar}
            onClick={() => toProfile(uid!)}
          />
          <Button
            type="button"
            variant="outlined"
            color="primary"
            onClick={signOut}
            startIcon={<SignOutIcon />}
            header
          >
            Sign Out
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
