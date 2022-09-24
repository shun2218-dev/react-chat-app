import React from "react";
import { Routes, Route } from "react-router-dom";
import Start from "@/pages/start";
import Login from "@/pages/login";
import Regist from "@/pages/regist";

const Router = () => {
  return (
    <Routes>
      <Route path="/start" element={<Start />} />
      <Route path="/login" element={<Login />} />
      <Route path="/regist" element={<Regist />} />
    </Routes>
  );
};

export default Router;
