import { Button, Typography, Card, CardContent, CardMedia, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../config.js";
import axios from "axios";
import { setCourse, setLoading } from "../redux/slices/courseSlice.js";


function CourseDetails() {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const course = useSelector((state) => state.course.course);
  const loading = useSelector((state) => state.course.loading);
  const userId = useSelector((state) => state.user.userId);
  const navigate=useNavigate();
  

  const init = async () => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(`${BASE_URL}/user/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(setCourse(response.data.course));
      console.log(response.data);
      dispatch(setLoading(false));
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const enrollCourse = async () => {
    console.log(userId);
    try {
      const response = await axios.post(
        `${BASE_URL}/user/courses/${courseId}/enroll`,
        { userId:userId},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data.message);
      navigate("/dashboard");
      // Add any additional logic after successful enrollment
    } catch (error) {
      console.error('Error enrolling in course:', error);
      // Handle error
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <Card sx={{ margin: '2rem', padding: '1rem' }}>
      <Typography variant="h4" sx={{ marginBottom: '1rem', fontSize: '2rem' }}>
        {course.name}
      </Typography>
      <CardMedia
        component="img"
        image={course.thumbnail}
        alt={course.name}
        sx={{ marginBottom: '1rem', height: 200, width: 'auto' }}
      />
      <CardContent>
        <Typography variant="subtitle1" color="text.secondary">
          Instructor: {course.instructor}
        </Typography>
        <Typography variant="body1" sx={{ marginTop: '1rem', fontSize: '1.2rem' }}>
          {course.description}
        </Typography>
        <Typography variant="body2" sx={{ marginTop: '1rem' }}>
          <strong>Duration:</strong> {course.duration}
        </Typography>
        <Typography variant="body2">
          <strong>Schedule:</strong> {course.schedule}
        </Typography>
        <Typography variant="body2">
          <strong>Location:</strong> {course.location}
        </Typography>
        <Typography variant="body2" sx={{ marginTop: '1rem' }}>
          <strong>Prerequisites:</strong>
          <ul>
            {course.prerequisites.map((prerequisite, index) => (
              <li key={index}>{prerequisite}</li>
            ))}
          </ul>
        </Typography>
        <Accordion sx={{ marginTop: '1rem' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="body2"><strong>Syllabus</strong></Typography>
          </AccordionSummary>
          <AccordionDetails>
  <ul>
    {course.syllabus.map((item, index) => (
      <li key={index}>
        <strong>Week {item.week}:</strong> {item.topic}<br />
        {item.content}
      </li>
    ))}
  </ul>
</AccordionDetails>
        </Accordion>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: '2rem' }}
          onClick={enrollCourse}
        >
          Enroll
        </Button>
      </CardContent>
    </Card>
    
  );
}

export default CourseDetails;
