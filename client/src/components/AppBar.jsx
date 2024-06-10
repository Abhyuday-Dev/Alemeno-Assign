import { Button, Typography } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../redux/slices/userSlice";

const AppBar = () => {
  const userLoading = useSelector((state) => state.user.isLoading);
  const userEmail = useSelector((state) => state.user.userEmail);
  const userName = useSelector((state) => state.user.userName);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (userLoading) {
    return <></>;
  }

  if (userEmail) {
    console.log(userName);
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem 1.5rem",
          backgroundColor: "#5624d0",
          alignItems: "center",
        }}
      >
        <div>
          <Typography variant="h4" color="white" fontWeight="bold">
            Learnify
          </Typography>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Button
            style={{
              marginRight: "10px",
              backgroundColor: "white",
              color: "black",
              fontWeight: "bold",
            }}
            size="medium"
            variant="contained"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </Button>
          <Button
            style={{
              marginRight: "10px",
              backgroundColor: "white",
              color: "black",
              fontWeight: "bold",
            }}
            size="medium"
            variant="contained"
            onClick={() => navigate("/courses")}
          >
            Courses
          </Button>
          <Typography
            color="white"
            backgroundColor="black"
            fontSize="25px"
            width="40px"
            height="40px"
            padding="0rem 0.3rem"
            textAlign="center"
            borderRadius="50%"
            marginRight="15px"
          >
            {userName[0]}
          </Typography>
          <Button
            style={{
              marginRight: "10px",
              backgroundColor: "white",
              color: "black",
              fontWeight: "bold",
            }}
            size="medium"
            variant="contained"
            onClick={() => {
              localStorage.setItem("token", null);
              dispatch(clearUser());
              navigate("/");
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem 1.5rem",
          backgroundColor: "#5624d0",
          alignItems: "center",
        }}
      >
        <div>
          <Typography variant="h4" color="white" fontWeight="bold">
            Learnify
          </Typography>
        </div>
        <div>
          <Button
            style={{
              marginRight: "10px",
              backgroundColor: "white",
              color: "black",
              fontWeight: "bold",
            }}
            size="medium"
            variant="contained"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </Button>
          <Button
            style={{
              backgroundColor: "black",
              color: "white",
              fontWeight: "bold",
            }}
            size="medium"
            variant="contained"
            onClick={() => navigate("/login")}
          >
            Sign In
          </Button>
        </div>
      </div>
    );
  }
};

export default AppBar;
