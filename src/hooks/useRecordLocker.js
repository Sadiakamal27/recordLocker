import { useState,useEffect } from "react"



const useRecordLocker = () => {

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



  return {
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
    fetchRecords,
    addData,
    removeItem,
    handleLogin,
    handleRegister,
    handleLogout
  };
}

export default useRecordLocker