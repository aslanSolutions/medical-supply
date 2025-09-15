import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Navbar from "@/components/common/navbar.tsx";
import "./index.css";
import App from "./App.tsx";
import "./i18n.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<div>Loading translations...</div>}>
      <BrowserRouter>
        <Navbar />
        <App />
      </BrowserRouter>
    </Suspense>
  </StrictMode>
);
