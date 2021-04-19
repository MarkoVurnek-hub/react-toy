import React from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };
  const signin = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };
  const signout = () => {
    return auth.signOut();
  };
  const handleAuthChange = () => {
    return auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });
  };

  React.useEffect(() => {
    const unsubscribe = handleAuthChange();

    return () => unsubscribe();
  }, []);

  const value = {
    signup,
    signin,
    signout,
    currentUser,
    loading
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
