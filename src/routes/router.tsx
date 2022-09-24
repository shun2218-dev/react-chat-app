import React from "react";
import { Routes, Route } from "react-router-dom";
import Start from "@/pages/start";
import Login from "@/pages/login";
import Regist from "@/pages/regist";
import Reset from "@/pages/reset";
import Home from "@/pages/home";
import Private from "@/pages/private";
import Group from "@/pages/group";

const Router = () => {
  return (
    <Routes>
      <Route path="/start" element={<Start />} />
      <Route path="/login" element={<Login />} />
      <Route path="/regist" element={<Regist />} />
      <Route path="/reset" element={<Reset />} />
      <Route path="/:uid/home" element={<Home />} />
      <Route path="/:uid/group" element={<Group />} />
      <Route path="/:uid/private" element={<Private />} />
    </Routes>
  );
};

export default Router;
