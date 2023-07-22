import { ReactNode, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

import { Loading } from "../../ui/Loading/Loading";
import React from "react";

export const withRouter = (component: () => ReactNode) => () =>
  (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>{component()}</Suspense>
    </BrowserRouter>
  );