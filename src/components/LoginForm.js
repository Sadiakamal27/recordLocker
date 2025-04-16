import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const LoginForm =({

    loginUsername,
    loginPassword,
    setLoginUsername,
    setLoginPassword,
    handleLogin,
    switchToRegister,
    isLoading = false
}) => (

    <div className='auth-form'>
        <h2>Login</h2>
        <TextField
            label="Username"
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
            fullWidth
            margin="normal"
            disabled={isLoading}
        />
        <TextField
            label="Password"
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            fullWidth
            margin="normal"
            disabled={isLoading}
        />
        <Button
            variant='contained'
            color='primary'
            onClick={handleLogin}
            fullWidth
            style={{ marginTop: "16px" }}
            disabled={isLoading}
        >
            {isLoading ? 'Logging in...' : 'Login'}
        </Button>
        <p className='auth-toggle'>
            Don't have an account? {' '}
            <span
                onClick={!isLoading ? switchToRegister : undefined}
                style={{ cursor: isLoading ? 'not-allowed' : 'pointer', color: '#1976d2' }}

            >
                Register
            </span>
        </p>

    </div>
);

export default LoginForm