import { createRoot } from "react-dom/client";
import { DataProvider } from "./contexts/Context.jsx";
import { setAxiosDefaults } from "./utils/axiosConfig.js";
import { BrowserRouter } from "react-router-dom";  
import "./index.css";
import App from "./App.jsx";

setAxiosDefaults(); // Sets the base URL, credentials, and headers for all axios requests.

createRoot(document.getElementById("root")).render(
  <BrowserRouter> 
    <DataProvider>
      <App />
    </DataProvider>
  </BrowserRouter>
);
