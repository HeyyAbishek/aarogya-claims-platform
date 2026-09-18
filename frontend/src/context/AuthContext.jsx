import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [patientAuth, setPatientAuth] = useState(null);
  const [insurerAuth, setInsurerAuth] = useState(null);

  useEffect(() => {
    const storedPatientToken = localStorage.getItem('patientAuthToken');
    if (storedPatientToken) {
      setPatientAuth(storedPatientToken);
      localStorage.setItem('token', storedPatientToken); // Sync for Axios
    }
    const storedInsurerToken = localStorage.getItem('insurerAuthToken');
    if (storedInsurerToken) {
      setInsurerAuth(storedInsurerToken);
      localStorage.setItem('token', storedInsurerToken); // Sync for Axios
    }
  }, []);

  const patientLogin = (token) => {
    setPatientAuth(token);
    localStorage.setItem('patientAuthToken', token);
    localStorage.setItem('token', token); // Sync for Axios
  };

  const patientLogout = () => {
    setPatientAuth(null);
    localStorage.removeItem('patientAuthToken');
    localStorage.removeItem('token'); // Clear for Axios
  };

  const insurerLogin = (token) => {
    setInsurerAuth(token);
    localStorage.setItem('insurerAuthToken', token);
    localStorage.setItem('token', token); // Sync for Axios
  };
  
  const insurerLogout = () => {
    setInsurerAuth(null);
    localStorage.removeItem('insurerAuthToken');
    localStorage.removeItem('token'); // Clear for Axios
  };

  return (
    <AuthContext.Provider value={{ insurerAuth, insurerLogout, patientAuth, patientLogin, patientLogout, insurerLogin }}>
      {children}
    </AuthContext.Provider>
  );
};