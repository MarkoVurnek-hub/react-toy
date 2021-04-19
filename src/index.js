import * as React from "react";
import ReactDOM from "react-dom";

import App from "screens/app";
import { AuthProvider } from "./auth/auth-context";
ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("root")
);
