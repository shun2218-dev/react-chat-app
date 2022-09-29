import React from "react";
import { usePage } from "@/hooks/usePage";
import { useAuthUser } from "@/atoms/useAuthUser";
import { useSignOut } from "@/hooks/useSignOut";
import Button from "./button";
import Avatar from "./avatar";
import SignOutIcon from "@mui/icons-material/Logout";
import logo from "@/assets/logo.svg";
import styles from "@/styles/components/Header.module.scss";

const Header = () => {
  const { toStart, toHome } = usePage();
  const authUser = useAuthUser();
  const { signOut, loading, error } = useSignOut();

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
            startIcon={<SignOutIcon />}
          >
            Sign Out
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
