import React from "react";
import "./App.css";
import Category from "./components/mainSection";
import Details from "./components/detail.jsx";
import NoPage from "./components/noPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/nav";
function App() {
  return (
    <BrowserRouter>
     <Nav />
      <Routes>
        <Route index element={<Category />} />
        <Route path="details" element={<Details />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
