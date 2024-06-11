const { User, Course } = require("../database/db.js");
const express = require("express");
const jwt = require("jsonwebtoken");
const { authenticateJwt, SECRET } = require("../middleware/auth");

const router = express.Router();

router.get("/me", authenticateJwt, async (req, res) => {
  const user = await User.findOne({ username: req.user.username });
  if (!user) {
    res.status(403).json({ message: "Admin Dosen't exist" });
    return;
  }
  res.json({
    username: user.username,
    name: user.name,
    userId: user._id,
  });
});

router.post("/signup", async (req, res) => {
  const { name, username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    res.status(403).json({ message: "User Already Exists" });
  } else {
    const newUser = new User({ name, username, password });
    await newUser.save();
    const token = jwt.sign({ username, role: "user" }, SECRET, {
      expiresIn: "2h",
    });
    res.json({ message: "User Created Successfully", token: token });
  }
});

router.post("/login", async (req, res) => {
  
  const { credentials } = req.body;

  const username = credentials.username;
  const password = credentials.password;

  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ username, role: "user" }, SECRET, {
      expiresIn: "2h",
    });
    res.json({ message: "User Logged In successfully", token: token });
  } else {
    res.status(403).json({ message: "User does not exist" });
  }
});

router.get("/courses", authenticateJwt, async (req, res) => {

  //get all courses
  const courses = await Course.find();
  res.json({ courses: courses });
});

router.post("/addCourse", async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/courses/:courseId", authenticateJwt, async (req, res) => {
  const courseId = req.params.courseId;

  //Fetch course by course id
  const course = await Course.findById(courseId);
  if (course) {
    res.json({ course });
  } else {
    res.status(404).json({ message: "Course Not Found" });
  }
});

router.post("/courses/:courseId/enroll", authenticateJwt, async (req, res) => {

  //Fetch course and user id
  const { courseId } = req.params;
  const { userId } = req.body;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    // Check if user is already enrolled
    if (course.enrolledUsers.includes(userId)) {
      return res
        .status(400)
        .json({ message: "User already enrolled in this course" });
    }

    // Update courses enrolledUsers array and save the course
    course.enrolledUsers.push(userId);
    await course.save();

    // Update user courses array and save the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.courses.push(courseId);
    await user.save();

    res.json({ message: "User enrolled in course successfully" });
  } catch (error) {
    console.error("Error enrolling user in course:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/getUserCourses/:userId", authenticateJwt, async (req, res) => {
  try {
    const { userId } = req.params;

    // Get user by userId and populate courses and completedCourses Array
    const user = await User.findById(userId)
      .populate("courses")
      .populate("completedCourses");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return courses and completedCourses
    res.json({
      enrolledCourses: user.courses,
      completedCourses: user.completedCourses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/markCourseCompleted", async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    // Find the user and update their completedCourses array
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the course is in the users enrolled courses array
    if (!user.courses.includes(courseId)) {
      return res
        .status(400)
        .json({ message: "User is not enrolled in this course" });
    }

    // Move the course from enrolled to completed
    user.courses = user.courses.filter(
      (course) => course.toString() !== courseId
    );
    user.completedCourses.push(courseId);

    await user.save();
    res.json({ message: "Course marked as completed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
