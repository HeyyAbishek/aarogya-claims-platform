import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import MainScreen from './components/MainScreen';
import PatientLogin from './components/patients/Login';
import InsurerLogin from './components/insurers/Login';
import PatientDashboard from './components/patients/Dashboard';
import InsurerDashboard from './components/insurers/Dashboard';
import CreateClaim from './components/patients/CreateClaim';
import EditClaim from './components/insurers/EditClaim'; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<MainScreen />} />
            
            {/* Patient Routes */}
            <Route path="/patients/login" element={<PatientLogin />} />
            <Route path="/patients/dashboard" element={<PatientDashboard />} />
            <Route path="/patients/createClaim" element={<CreateClaim />} />
            
            {/* Insurer Routes */}
            <Route path="/insurers/login" element={<InsurerLogin />} />
            <Route path="/insurers/dashboard" element={<InsurerDashboard />} />
            <Route path="/insurers/edit/:id" element={<EditClaim />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;