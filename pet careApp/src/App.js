import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import HomePage from './components/HomePage';
import ContactUs from './components/ContactUs';
import Login from './components/Login';
import PetDetails from './components/PetDetails';
import Header from './components/Header';
import UserProfile from './components/UserProfile';
import { AuthProvider } from './components/AuthContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Logic to handle user login, e.g., set user credentials, etc.
    setIsLoggedIn(true);
  }

  const handleLogout = () => {
    // Logic to handle user logout, e.g., clear user credentials, etc.
    setIsLoggedIn(false);
  }

  return (
    <AuthProvider>
      <div className="App">
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />

        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/petdetails" element={<PetDetails />} />
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />}
          />
          <Route path="/register" element={<SignUp />} />
        </Routes>
      </div>
    </AuthProvider>

  );
}

export default App;
