import React from "react";
import logo from "@/assets/logo.svg";
import styles from "@/styles/components/Header.module.scss";
import { usePage } from "@/hooks/usePage";

const Header = () => {
  const { toStart } = usePage();
  return (
    <header className={styles.header}>
      {/* after log in switch toHome */}
      <img src={logo} alt="logo" width="200px" onClick={toStart} />
    </header>
  );
};

export default Header;
