import { createRoot } from "react-dom/client";
import { DataProvider } from "./contexts/Context.jsx";
import { setAxiosDefaults } from "./utils/axiosConfig.js";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

setAxiosDefaults(); // Sets the base URL, credentials, and headers for all axios requests.

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <BrowserRouter>
      <DataProvider>
        <App />
      </DataProvider>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
