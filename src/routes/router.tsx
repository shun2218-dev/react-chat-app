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
import Complete from "@/pages/complete";
import Join from "@/pages/join";
import Create from "@/pages/create";
import GroupRoom from "@/pages/groupRoom";
import NotFound from "@/pages/notFound";

import Layout from "@/components/layout";
import AuthLayout from "@/components/authlayout";
import Header from "@/components/header";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="start" element={<Start />} />
        <Route path="login" element={<Login />} />
        <Route path="regist" element={<Regist />} />
        <Route path="reset" element={<Reset />} />
        <Route path="reset/complete" element={<Complete />} />
        <Route path="/:uid" element={<AuthLayout />}>
          <Route path="profile" element={<Profile />} />
          <Route path="home" element={<Home />} />
          <Route path="group" element={<Group />} />
          <Route path="group/join" element={<Join />} />
          <Route path="group/create" element={<Create />} />
          <Route path="group/:groupid" element={<GroupRoom />} />
          <Route path="private" element={<Private />} />
          <Route path="private/:partnerid" element={<Private />} />
          <Route path="*/*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default Router;
