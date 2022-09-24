import React, { FC } from "react";
import styles from "@/styles/components/Input.module.scss";

type Input = {
  type?: "text" | "email" | "password";
  placeholder: string;
  label: string;
};

const Input: FC<Input> = ({ type = "text", placeholder, label }) => {
  return (
    <label className={styles.input}>
      {label}
      <input type={type} placeholder={placeholder} />
    </label>
  );
};

export default Input;
