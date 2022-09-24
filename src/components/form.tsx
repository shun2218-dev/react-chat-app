import React, { FC, FormEvent } from "react";
import { ReactNode } from "react";
import styles from "@/styles/components/Form.module.scss";

type Form = {
  children: ReactNode;
  title: string;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
};

const Form: FC<Form> = ({ children, title, onSubmit }) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </form>
  );
};

export default Form;
