import React, { useEffect } from "react";
import logo from "@/assets/logo.svg";
import styles from "@/styles/components/Header.module.scss";
import { usePage } from "@/hooks/usePage";
import { useAuthUser } from "@/atoms/useAuthUser";
import Button from "./button";
import { useSignOut } from "@/hooks/useSignOut";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const { toStart } = usePage();
  const authUser = useAuthUser();
  const { signOut, loading, error } = useSignOut();
  const { pathname } = useLocation();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(
      pathname !== "/start" &&
        pathname !== "/login" &&
        pathname !== "/regist" &&
        pathname !== "/reset"
    );
  }, [pathname]);

  return (
    <header
      className={`${styles.header} ${
        authUser ? styles.login : styles.notLogin
      }`}
    >
      {/* after log in switch toHome */}
      <img src={logo} alt="logo" width="200px" onClick={toStart} />
      {authUser && isAuth && (
        <Button
          type="button"
          variant="outlined"
          color="primary"
          onClick={signOut}
        >
          Sign Out
        </Button>
      )}
    </header>
  );
};

export default Header;
