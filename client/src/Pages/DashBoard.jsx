import React, { useEffect,useState } from "react";
import { BASE_URL } from "../config";
import { useSelector } from "react-redux";
import axios from "axios";
import CourseCard from "../components/CourseCard";
import DashBoardCard from "../components/dashBoardCard";
import { Typography } from "@mui/material";


//User Dashboard Page

const DashBoard = () => {
  const [courses, setCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);
  const userId = useSelector((state) => state.user.userId);


  //Fetching User Courses (Enrolled + Completed)

  const init = async (userId) => {
    console.log("dash", userId);
    try {
      const response = await axios.get(
        `${BASE_URL}/user/getUserCourses/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      setCourses(response.data.enrolledCourses)  
      setCompletedCourses(response.data.completedCourses)
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      init(userId);
    }
  }, [userId]);

  //Displaying courses (Enrolled + Completed)

  return (
  <div>
     <div style={{ display: "flex", justifyContent: "center",flexDirection:"column" }}>
    <Typography variant="h5" style={{margin:"20px"}} >Enrolled Courses</Typography>
     <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {courses.map((course) => {
        return <DashBoardCard key={course._id} course={course} />;
      })}
    </div>
   </div>
    <div style={{ display: "flex", justifyContent: "center",flexDirection:"column" }}>
    <Typography variant="h5" style={{margin:"20px"}} >Completed Courses</Typography>
     <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {completedCourses.map((course) => {
        return <CourseCard key={course._id} course={course} />;
      })}
    </div>
   </div>
  </div>
  );
};

export default DashBoard;
