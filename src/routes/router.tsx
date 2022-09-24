import React from "react";
import { Routes, Route } from "react-router-dom";
import Start from "@/pages/start";
import Login from "@/pages/login";
import Regist from "@/pages/regist";
import Reset from "@/pages/reset";
import Home from "@/pages/home";

const Router = () => {
  return (
    <Routes>
      <Route path="/start" element={<Start />} />
      <Route path="/login" element={<Login />} />
      <Route path="/regist" element={<Regist />} />
      <Route path="/reset" element={<Reset />} />
      <Route path="/:uid/home" element={<Home />} />
    </Routes>
  );
};

export default Router;
