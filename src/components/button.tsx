import { borderRadius } from "@mui/system";
import React, { FC } from "react";
import styles from "@/styles/components/Button.module.scss";

type ButtonProps = {
  type: "button" | "submit" | "reset";
  width?: string;
  height?: string;
  children: string;
  onClick?: () => void;
  color: "primary" | "transparent";
  variant?: "filled" | "outlined" | "contained";
  rounded?: boolean;
};

const Button: FC<ButtonProps> = ({
  type,
  width,
  height,
  children,
  onClick,
  color = "transparent",
  variant = "filled",
  rounded = true,
}) => {
  const switchStyles = (variant: string) => {
    switch (variant) {
      case "filled":
        return styles.filled;
      case "contained":
        return styles.contained;
      case "outlined":
        return styles.outlined;
      default:
        return styles.filled;
    }
  };

  const switchBgColor = (color: string) => {
    switch (color) {
      case "primary":
        return styles.primary;
      case "transparent":
        return styles.transparent;
      default:
        return styles.transparent;
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        width: `${width}`,
        height: `${height}`,
        borderRadius: `${rounded ? "24px" : "0px"}`,
      }}
      className={`${switchStyles(variant)} ${switchBgColor(color)}`}
    >
      {children}
    </button>
  );
};

export default Button;
