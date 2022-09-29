import React from "react";
import { Routes, Route } from "react-router-dom";
import Start from "@/pages/start";
import Login from "@/pages/login";
import Regist from "@/pages/regist";
import Reset from "@/pages/reset";
import Home from "@/pages/home";
import Private from "@/pages/private";
import Group from "@/pages/group";
import Profile from "@/pages/profile";
import Layout from "@/components/layout";
import Complete from "@/pages/complete";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/login" element={<Login />} />
      <Route path="/regist" element={<Regist />} />
      <Route path="/reset" element={<Reset />} />
      <Route path="/reset/complete" element={<Complete />} />
      <Route path="/:uid" element={<Layout />}>
        <Route path="profile" element={<Profile />} />
        <Route path="home" element={<Home />} />
        <Route path="group" element={<Group />} />
        <Route path="private" element={<Private />} />
        <Route path="private/:partnerid" element={<Private />} />
      </Route>
    </Routes>
  );
};

export default Router;
