import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";


function CourseCard({ course }) {
    const navigate = useNavigate();
    return (
      <Card sx={{ width: "400px", maxWidth: 400, margin: "1.5rem" }}>
        <CardMedia component="img" alt="Course Thumbnail" height="200" image={course.thumbnail} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {course.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {course.description}
          </Typography>
        </CardContent>
        <div style={{ float: "right", margin: "20px" }}>
          <Button
            variant="contained"
            size="small"
            style={{ backgroundColor: "#5624d0", fontWeight: "bold" }}
            onClick={() => {
              navigate(`/course/${course._id}`);
            }}
          >
            View Course
          </Button>
        </div>
      </Card>
    );
  }

  export default CourseCard;