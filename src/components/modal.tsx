import React, { FC, ReactNode } from "react";
import styles from "@/styles/components/Modal.module.scss";

type ModalProps = {
  title: string;
  children?: ReactNode;
  open: boolean;
};

const Modal: FC<ModalProps> = ({ title, children, open }) => {
  return (
    <>
      {open && (
        <div id="overlay" className={styles.overlay}>
          <div id="modalBody" className={styles.modalBody}>
            <h2>{title}</h2>
            <div>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
