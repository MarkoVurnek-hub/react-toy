/** @jsxImportSource @emotion/react */
import { BrowserRouter as Router } from "react-router-dom";
import React, { useEffect } from "react";
import { useAuth } from "../auth/auth-context";
import { useAsync } from "../utils/hooks";
import Dashboard from "./dashboard";
import Entry from "./entry";
import { FullPageSpinner } from "../components/lib";

function App() {
  const { signup, signin, signout, currentUser } = useAuth();
  const { data: user, setData, isLoading, isIdle } = useAsync();

  useEffect(() => {
    setData(currentUser);
  }, []);
  const login = form =>
    signin(form.email, form.password).then(user => setData(user.user));
  const register = form =>
    signup(form.email, form.password).then(user => setData(user.user));
  const logout = () => {
    signout();
    setData(null);
  };
  if (isLoading || isIdle) {
    return <FullPageSpinner />;
  }
  const props = { user, logout, register, login };
  return user ? (
    <Router>
      <Dashboard {...props} />
    </Router>
  ) : (
    <Entry {...props} />
  );
}

export default App;
