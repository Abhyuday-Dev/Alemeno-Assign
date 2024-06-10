import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const credentials = {
      username: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/user/login",
        { credentials }
      );

      const data = response.data;
      localStorage.setItem("token", data.token);
      window.location = "/";
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "8rem",
      }}
    >
      <Card
        variant="outlined"
        style={{ width: "450px", padding: "1rem", border: "none" }}
      >
        <div
          className="form"
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "1rem",
          }}
        >
          <Typography fontSize="15px" fontWeight="700" marginBottom="15px">
            Log in to your Learnify account
          </Typography>
          <TextField
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            fullWidth={true}
            label="Email"
            variant="outlined"
            style={{ marginBottom: "14px" }}
          />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            fullWidth={true}
            label="Password"
            variant="outlined"
            style={{ marginBottom: "20px" }}
          />
          <Button
            style={{
              backgroundColor: "#a435f0",
              "&:hover": {
                backgroundColor: "#5624d0",
              },
            }}
            size={"large"}
            variant="contained"
            onClick={handleLogin}
          >
            Log In
          </Button>
          <hr />
          <Typography fontSize="14px" textAlign="center" margin="15px">
            Don't have an account?{"  "}
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <span style={{ color: "#5624d0", fontWeight: "bold" }}>
                Sign up
              </span>
            </Link>
          </Typography>
        </div>
      </Card>
    </div>
  );
};

export default SignIn;
