import React from "react";
import { usePage } from "@/hooks/usePage";
import Button from "@/components/button";

const NotFound = () => {
  const { toLogin } = usePage();
  return (
    <>
      <h1>404 Not Found</h1>
      <p>WSvEuIp7lIaXgBxBT5M7sn7p56z2/home</p>
      <div>
        <Button type="button" color="primary" onClick={toLogin}>
          Back To Login Page
        </Button>
      </div>
    </>
  );
};

export default NotFound;
