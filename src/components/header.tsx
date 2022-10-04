import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useAuthUser } from "@/atoms/useAuthUser";
import { usePage } from "@/hooks/usePage";
import { useSignOut } from "@/hooks/useSignOut";
import logo from "@/assets/logo.svg";
import styles from "@/styles/components/Header.module.scss";

import Button from "./button";
import SignOutIcon from "@/Icons/signOutIcon";

const Header = () => {
  const { toStart, toHome, toProfile } = usePage();
  const authUser = useAuthUser();
  const { pathname } = useLocation();
  const { signOut, loading, error } = useSignOut();
  const { uid } = useParams();

  return (
    <>
      {pathname !== "/start" && (
        <header
          className={`${styles.header} ${
            authUser ? styles.login : styles.notLogin
          }`}
        >
          {/* after log in switch toHome */}
          <img
            src={logo}
            typeof="image/svg+xml"
            alt="logo"
            width="200px"
            height="67px"
            onClick={() => (authUser ? toHome(authUser.uid!) : toStart())}
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
      )}
    </>
  );
};

export default Header;
