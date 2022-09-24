import React, { Suspense } from "react";
import logo from "./assets/logo.svg";
import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import Router from "@/routes/router";
import ThemeContext from "./themes/ThemeContext";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<div>...loading</div>}>
        <ThemeContext>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </ThemeContext>
      </Suspense>
    </RecoilRoot>
  );
}

export default App;
