/*import React from "react";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const SignIn = lazy(() => import("./Login/Login"));
const SignUp = lazy(() => import("./Register/Register"));

export const Routing = () => {
  return (
    <Routes>
        <Route path={"/"} element={<SignIn />} />
    </Routes>
  );
};*/

import React from "react";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const SignIn = lazy(() => import("./Login/Login"));
const SignUp = lazy(() => import("./Register/Register"));
const NotFound = lazy(() => import("./PageNotFound/PageNotFound"));

export const Routing = () => {
  return (
    <Routes>
      <Route path={"/"} element={<SignIn />} />
      <Route path={"/signup"} element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
