import "./App.css";
import Header from "./components/Header";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in on initial render
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedUsername = localStorage.getItem("username");
    if (storedUserId && storedUsername) {
      setUserId(storedUserId);
      setUsername(storedUsername);
      setIsLoggedIn(true);
      fetchRecords(storedUserId);
    }
  }, []);

  const fetchRecords = async (userId) => {
    try {
      const response = await fetch("http://localhost:5000/records", {
        headers: {
          "user-id": userId,
        },
      });
      if (response.ok) {
        const records = await response.json();
        setData(records);
      }
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  const addData = async () => {
    if (!name || !email) return;

    try {
      const response = await fetch("http://localhost:5000/records", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "user-id": userId,
        },
        body: JSON.stringify({ name, email }),
      });

      if (response.ok) {
        const newRecord = await response.json();
        setData([...data, newRecord]);
        setName("");
        setEmail("");
      }
    } catch (error) {
      console.error("Error adding record:", error);
    }
  };

  const removeItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/records/${id}`, {
        method: "DELETE",
        headers: {
          "user-id": userId,
        },
      });

      if (response.ok) {
        setData(data.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: loginUsername,
          password: loginPassword,
        }),
      });

      if (response.ok) {
        const { id, username } = await response.json();
        setUserId(id);
        setUsername(username);
        setIsLoggedIn(true);
        localStorage.setItem("userId", id);
        localStorage.setItem("username", username);
        fetchRecords(id);
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: registerUsername,
          password: registerPassword,
        }),
      });

      if (response.ok) {
        alert("Registration successful! Please login.");
        setRegisterUsername("");
        setRegisterPassword("");
        setShowLoginForm(true); // Switch to login form after successful registration
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserId(null);
    setUsername("");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    setData([]);
  };

  if (!isLoggedIn) {
    return (
      <div className="App">
        <Header />
        <div className="auth-container">
          {showLoginForm ? (
            // Login Form
            <div className="auth-form">
              <h2>Login</h2>
              <TextField
                label="Username"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Password"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                fullWidth
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleLogin}
                fullWidth
                style={{ marginTop: "16px" }}
              >
                Login
              </Button>
              <p className="auth-toggle">
                Don't have an account?{' '}
                <span onClick={() => setShowLoginForm(false)}>Register</span>
              </p>
            </div>
          ) : (
            // Registration Form
            <div className="auth-form">
              <h2>Register</h2>
              <TextField
                label="Username"
                value={registerUsername}
                onChange={(e) => setRegisterUsername(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Password"
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                fullWidth
                margin="normal"
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={handleRegister}
                fullWidth
                style={{ marginTop: "16px" }}
              >
                Register
              </Button>
              <p className="auth-toggle">
                Already have an account?{' '}
                <span onClick={() => setShowLoginForm(true)}>Login</span>
              </p>
            </div>
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
      <div className="form">
        <Stack direction="row" spacing={2}>
          <TextField
            value={name}
            onChange={(event) => setName(event.target.value)}
            id="outlined-basic"
            label="name"
            variant="outlined"
          />
          <TextField
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            id="outlined-basic"
            label="email"
            variant="outlined"
          />
          <Button onClick={addData} variant="contained" color="success">
            <AddIcon />
          </Button>
        </Stack>
      </div>
      {/* Data Section */}
      <div className="data">
        <div className="data_val">
          <h4>Name</h4>
          <h4>Email</h4>
          <h4>Remove</h4>
        </div>

        {data.map((element) => (
          <div key={element.id} className="data_val">
            <h4>{element.name}</h4>
            <h4>{element.email}</h4>
            <Stack>
              <Button
                onClick={() => removeItem(element.id)}
                variant="contained"
                color="error"
              >
                <DeleteIcon />
              </Button>
            </Stack>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;