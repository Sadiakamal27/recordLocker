import React from 'react'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

  const RegisterForm = ({
    registerUsername,
    registerPassword,
    setRegisterUsername,
    setRegisterPassword,
    handleRegister,
    switchToLogin,
    isLoading = false
 }) => (
     <div className="auth-form">
         <h2>Register</h2>
         <TextField
             label="Username"
             value={registerUsername}
            onChange={(e) => setRegisterUsername(e.target.value)}
             fullWidth
             margin="normal"
             disabled={isLoading}
         />
         <TextField
             label="Password"
             type="password"
             value={registerPassword}
             onChange={(e)=> setRegisterPassword(e.target.value)}
             fullWidth
             margin="normal"
             disabled={isLoading}
         />
         <Button
             variant="contained"
             color="secondary"
             onClick={handleRegister}
             fullWidth
             style={{ marginTop: "16px" }}
             disabled={isLoading}
         >
             {isLoading ? 'Registering...' : 'Register'}
         </Button>
         <p className="auth-toggle">
             Already have an account?{' '}
             <span
                 onClick={!isLoading ? switchToLogin : undefined}
                 style={{ cursor: isLoading ? 'not-allowed' : 'pointer', color: '#9c27b0' }}
             >
                 Login
             </span>
         </p>
     </div>
 );
 
export default RegisterForm