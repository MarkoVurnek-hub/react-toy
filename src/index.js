import * as React from "react";
import ReactDOM from "react-dom";
import DiscoverBooksScreen from "screens/discover";
import App from "screens/app";
import { AuthProvider } from "./auth/auth-context";
ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("root")
);
