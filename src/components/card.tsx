import React, { FC, ReactNode } from "react";
import styles from "@/styles/components/Card.module.scss";

type Card = {
  children: ReactNode;
  onClick?: () => void;
};

const Card: FC<Card> = ({ children, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;
