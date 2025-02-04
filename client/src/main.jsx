import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import Homepage from "./pages/homepage.jsx";
import AuthPage from "./pages/AuthPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="auth" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
