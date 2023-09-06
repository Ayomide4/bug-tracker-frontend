import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "react-auth-kit";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider
      authType="cookie"
      authName="_auth"
      cookieDomain={window.location.hostname}
      cookieSecure={true} //change to true when using https
    >
      <App />
    </AuthProvider>
  </React.StrictMode>
);
