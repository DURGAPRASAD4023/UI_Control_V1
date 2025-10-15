import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./index.css";
import "./firebase";
import LoginPage from "./Login";

const CLIENT_ID = "155894986948-s7q2ipvnnhbk32i5vjl92ue9thfp6ctv.apps.googleusercontent.com";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <LoginPage />
    </GoogleOAuthProvider>
  </StrictMode>
);
