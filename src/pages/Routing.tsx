import React from "react";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Login = lazy(() => import("./Login/Login"));
const MainPage = lazy(() => import("./MainPage/MainPage"));

export const Routing = () => {
  return (
    <Routes>
        <Route path={"/sign-in"} element={<Login />} />
        <Route path={"/"} element={<MainPage />} />
    </Routes>
  );
};
