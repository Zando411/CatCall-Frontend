import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // retrieve email from localStorage on page reload
    const storedEmail = localStorage.getItem("CatCallLoggedInUser");
    if (storedEmail) {
      setEmail(storedEmail);
    }
    setLoading(false);
  }, []);

  const login = (userEmail) => {
    setEmail(userEmail);
    localStorage.setItem("CatCallLoggedInUser", userEmail);
  };

  const logout = () => {
    setEmail(null);
    localStorage.removeItem("CatCallLoggedInUser");
  };

  return (
    <AuthContext.Provider value={{ email, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
