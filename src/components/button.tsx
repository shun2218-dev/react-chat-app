import React, { FC, ReactNode } from "react";
import styles from "@/styles/components/Button.module.scss";

type ButtonProps = {
  type: "button" | "submit" | "reset";
  width?: string;
  height?: string;
  margin?: string;
  children: string;
  onClick?: () => void;
  color: "primary" | "transparent";
  variant?: "filled" | "outlined" | "contained";
  rounded?: boolean;
  fullWidth?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
};

const Button: FC<ButtonProps> = ({
  type,
  width,
  height,
  margin,
  children,
  onClick,
  color = "transparent",
  variant = "filled",
  rounded = false,
  fullWidth = false,
  startIcon,
  endIcon,
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

  const switchWidth = (fullWidth: boolean) => {
    if (fullWidth) {
      return styles.fullWidth;
    } else {
      return styles.cutomWidth;
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        width: `${width}`,
        height: `${height}`,
        margin: `${margin}`,
        borderRadius: `${rounded ? "24px" : "0px"}`,
      }}
      className={`${switchStyles(variant)} ${switchBgColor(
        color
      )} ${switchWidth(fullWidth)} ${styles.button}`}
    >
      {startIcon}
      {children}
      {endIcon}
    </button>
  );
};

export default Button;
