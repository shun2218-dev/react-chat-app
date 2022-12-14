import React, { RefObject } from "react";
import styles from "@/styles/components/Input.module.scss";
import { forwardRef } from "react";

type Input = {
  type?: "text" | "email" | "password";
  placeholder?: string;
  label?: string;
  required?: boolean;
  ref?: RefObject<HTMLInputElement>;
  defaultValue?: string;
};

const Input = forwardRef<HTMLInputElement, Input>(
  (
    { type = "text", placeholder, label, required = true, defaultValue },
    ref
  ) => {
    return (
      <label className={styles.input}>
        {label}
        <input
          type={type}
          placeholder={placeholder}
          required={required}
          ref={ref}
          defaultValue={defaultValue}
        />
      </label>
    );
  }
);

export default Input;
