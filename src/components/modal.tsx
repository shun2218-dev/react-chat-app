import React, { FC, FormEvent, ReactNode } from "react";
import styles from "@/styles/components/Modal.module.scss";

type ModalProps = {
  title: string;
  children?: ReactNode;
  open: boolean;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
};

const Modal: FC<ModalProps> = ({ title, children, open, onSubmit }) => {
  return (
    <>
      {open && (
        <div id="overlay" className={styles.overlay}>
          <form id="modalBody" className={styles.modalBody} onSubmit={onSubmit}>
            <h2 className={styles.title}>{title}</h2>
            {children}
          </form>
        </div>
      )}
    </>
  );
};

export default Modal;
