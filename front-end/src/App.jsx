import "lucide-react";

import Home from "../src/pages/Home/Home";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import { ToastContainer, toast } from "react-toastify";
import Product from "./pages/Product/Product";
import ErrorPage from "./pages/ErrorPage";
const App = () => {
  return (
    <div>
      <ToastContainer theme="dark" />

      <Routes>
        <Route path="/product" element={<Product />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default App;
