import { TextField } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";;
import { BASE_URL } from "../config.js";
import axios from "axios";
import { setCourses, setSearchQuery, setLoading } from "../redux/slices/courseSlice";
import CourseCard from "../components/CourseCard.jsx";


//Course listing page

function Courses() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course.filteredCourses);
  const searchQuery = useSelector((state) => state.course.searchQuery);



  //fetch Courses
  const init = async () => {
    dispatch(setLoading(true));
    const response = await axios.get(`${BASE_URL}/user/courses`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch(setCourses(response.data.courses));
    dispatch(setLoading(false));
  };

  useEffect(() => {
    init();
  }, []);

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div>
      <TextField
        label="Search Courses"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearch}
        style={{ margin: "20px", width: "50%" }}
      />
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {courses.map((course) => {
          return <CourseCard key={course._id} course={course} />;
        })}
      </div>
    </div>
  );
}



export default Courses;
