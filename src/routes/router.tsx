import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Start = lazy(() => import("@/pages/start"));
const Login = lazy(() => import("@/pages/login"));
const Regist = lazy(() => import("@/pages/regist"));
const Reset = lazy(() => import("@/pages/reset"));
const Home = lazy(() => import("@/pages/home"));
const Private = lazy(() => import("@/pages/private"));
const Group = lazy(() => import("@/pages/group"));
const Profile = lazy(() => import("@/pages/profile"));
const AuthLayout = lazy(() => import("@/components/authlayout"));
const Complete = lazy(() => import("@/pages/complete"));
const Join = lazy(() => import("@/pages/join"));
const Create = lazy(() => import("@/pages/create"));
const GroupRoom = lazy(() => import("@/pages/groupRoom"));
const NotFound = lazy(() => import("@/pages/notFound"));
const NormalLayout = lazy(() => import("@/components/normalLayout"));
const Layout = lazy(() => import("@/components/layout"));

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<NormalLayout />}>
          <Route path="start" element={<Start />} />
          <Route path="login" element={<Login />} />
          <Route path="regist" element={<Regist />} />
          <Route path="reset" element={<Reset />} />
          <Route path="reset/complete" element={<Complete />} />
        </Route>
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
