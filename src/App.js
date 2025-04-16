import "./App.css";
import Header from "./components/Header";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import { useState, useEffect } from "react";
import RegisterForm from "./components/RegisterForm";
import useRecordLocker from "./hooks/useRecordLocker";
import AddData from "./components/AddData";
import DeleData from "./components/DeleData";

function App() {
  const {
    // State values
    name, setName,
    email, setEmail,
    data, setData,
    isLoggedIn, setIsLoggedIn,
    userId, setUserId,
    username, setUsername,
    loginUsername, setLoginUsername,
    loginPassword, setLoginPassword,
    registerUsername, setRegisterUsername,
    registerPassword, setRegisterPassword,
    showLoginForm, setShowLoginForm,
    addData,
    removeItem,
    handleLogin,
    handleRegister,
    handleLogout
  } = useRecordLocker();

  const navigate = useNavigate();


  if (!isLoggedIn) {
    return (
      <div className="App">
        <Header />
        <div className="auth-container">
          {showLoginForm ? (
            // Login Form
            <LoginForm
              loginUsername={loginUsername}
              setLoginUsername={setLoginUsername}
              loginPassword={loginPassword}
              setLoginPassword={setLoginPassword}
              handleLogin={handleLogin}
              switchToRegister={() => setShowLoginForm(true)}
            />
          ) : (
            // Registration Form
            <RegisterForm
              registerUsername={registerUsername}
              setRegisterUsername={setRegisterUsername}
              registerPassword={registerPassword}
              setRegisterPassword={setRegisterPassword}
              handleRegister={handleRegister}
              switchToLogin={() => setShowLoginForm(true)}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      <div className="user-info">
        <span>Welcome, {username}!</span>
        <Button variant="outlined" onClick={handleLogout} style={{ marginLeft: "16px" }}>
          Logout
        </Button>
      </div>
      {/* Form section */}
      <AddData
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        addData={addData}
      />
      {/* Data Section */}
      <div className="data">
        <div className="data_val">
          <h4>Name</h4>
          <h4>Email</h4>
          <h4>Remove</h4>
        </div>

        {data.map((element) => (
          <DeleData
            key={element.id}
            id={element.id}
            name={element.name}
            email={element.email}
            removeItem={removeItem}
          />
        ))}
      </div>
    </div>
  );
}

export default App;