import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainDisplay } from "./components/MainDisplay";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainDisplay />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
