import React from "react";
import Button from "@/components/button";
import Form from "@/components/form";
import Header from "@/components/header";
import { usePage } from "@/hooks/usePage";
import { useLocation } from "react-use";
import styles from "@/styles/pages/Complete.module.scss";
import { useEffect } from "react";
import { useFlashMessage } from "@/hooks/useFlashMessage";
import FlashMessage from "@/components/flashMessage";

import CompleteIcon from "@mui/icons-material/CheckCircleOutline";

const Complete = () => {
  const { toLogin } = usePage();
  const location = useLocation();
  const { messageState, flashState, reset } = useFlashMessage(5000);
  useEffect(() => {
    console.log(messageState, flashState);
  }, []);
  return (
    <>
      <Header />
      {flashState && <FlashMessage {...messageState!} />}
      <Form
        title="Send Email to reset your password."
        secondTitle="Please confirm your Email."
        startIcon={<CompleteIcon fontSize="large" />}
      >
        <div className={styles.email}>
          <p>{location.state.usr.email}</p>
        </div>
        <Button
          type="button"
          color="primary"
          variant="contained"
          fullWidth
          height="52px"
          margin="30px 0 0"
          onClick={toLogin}
        >
          Back to Sign In
        </Button>
      </Form>
    </>
  );
};

export default Complete;
