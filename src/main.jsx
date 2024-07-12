import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/style.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter basename="/">
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
