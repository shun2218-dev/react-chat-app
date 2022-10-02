import React, { FC } from "react";
import { Alert, AlertTitle } from "@mui/material";
import { NavigationState } from "@/types/NavigationState";

const FlashMessage: FC<NavigationState> = ({ status, title, text, strong }) => {
  return (
    <Alert
      severity={status}
      sx={{
        position: "absolute",
        top: "127px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "874px",
        boxSizing: "border-box",
        textAlign: "left",
        "@media screen and (max-width: 940px)": {
          width: "420px",
        },
        "@media screen and (max-width:600px)": {
          width: "300px",
        },
      }}
    >
      <AlertTitle>{title}</AlertTitle>
      {text}
      {strong && <strong>{strong}</strong>}
    </Alert>
  );
};

export default FlashMessage;
