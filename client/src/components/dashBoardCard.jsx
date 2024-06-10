import React from "react";
import { Button, Typography, LinearProgress } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../config";

const DashBoardCard = ({ course }) => {
  const userId = useSelector((state) => state.user.userId);
  const progress = Math.floor(Math.random() * 101);

  const markCourseCompleted = async () => {
    if(userId && course._id) {
        try {
            const response = axios.post(
              `${BASE_URL}/user/markCourseCompleted`,
              { userId: userId, courseId: course._id },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            console.log(response.data);
            alert("course marked as completed")
            window.location="/dashboard"
          } catch (e) {
            console.log(e.message);
          }
    }
  };

  return (
    <Card sx={{ width: "400px", maxWidth: 400, margin: "1.5rem" }}>
      <CardMedia
        component="img"
        alt="Course Thumbnail"
        height="170"
        image={course.thumbnail}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {course.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {course.instructor}
        </Typography>
        <Box sx={{ my: 2 }}>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Progress: {progress}%
          </Typography>
        </Box>
      </CardContent>
      <div style={{ float: "right", margin: "0 20px 20px 20px" }}>
        <Button
          variant="contained"
          size="small"
          style={{ backgroundColor: "#5624d0", fontWeight: "bold" }}
          onClick={markCourseCompleted}
        >
          Mark as done
        </Button>
      </div>
    </Card>
  );
};

export default DashBoardCard;
