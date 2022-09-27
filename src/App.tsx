import React, { Suspense } from "react";
import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import Router from "@/routes/router";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<div>...loading</div>}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Suspense>
    </RecoilRoot>
  );
}

export default App;
