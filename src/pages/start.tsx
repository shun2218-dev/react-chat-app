import React, { useEffect } from "react";
import Button from "@/components/button";
import logo from "@/assets/logo.svg";
import logoImage from "@/assets/logo.png";
import styles from "@/styles/pages/Start.module.scss";
import { usePage } from "@/hooks/usePage";

const Start = () => {
  const { toLogin, toRegist } = usePage();

  const removeHomeClass = (toMove: () => void) => {
    document.body.classList.remove("home");
    toMove();
  };

  useEffect(() => {
    const bodyClasses = document.body.classList;
    if (!bodyClasses.contains("home")) {
      bodyClasses.remove("pace-done");
      bodyClasses.add("home");
    }
  }, []);

  return (
    <div className={styles.container}>
      <picture>
        <source
          media="(min-width:400px)"
          srcSet={logo}
          className={styles.logo}
          type="image/svg+xml"
        />
        <img src={logoImage} alt="logo" className={styles.logo} />
      </picture>
      <div className={styles.buttonGroup}>
        <Button
          type="button"
          color="primary"
          variant="contained"
          rounded
          onClick={() => removeHomeClass(toRegist)}
          height="50px"
          width="150px"
        >
          Get Started
        </Button>
        <Button
          type="button"
          color="transparent"
          variant="filled"
          onClick={() => removeHomeClass(toLogin)}
          height="30px"
          width="150px"
        >
          Sign In &gt;
        </Button>
      </div>
    </div>
  );
};

export default Start;
