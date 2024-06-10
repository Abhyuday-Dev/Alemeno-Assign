const mongoose = require("mongoose");

//Schemas

//User Schema

const UserSchema = new mongoose.Schema({
  name: { type: String },
  username: { type: String },
  password: String,
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  completedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
});

//Admin Schema

const AdminSchema = new mongoose.Schema({
  name: { type: String },
  username: { type: String },
  password: String,
});

//Course Schema

const CourseSchema = new mongoose.Schema({
  name: String,
  instructor: String,
  description: String,
  enrollmentStatus: String,
  thumbnail: String,
  duration: String,
  schedule: String,
  location: String,
  prerequisites: [String],
  syllabus: [
    {
      week: String,
      topic: String,
      content: String,
    },
  ],
  enrolledUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

CourseSchema.methods.enrollUser = async function (userId) {
  if (!this.enrolledUsers.includes(userId)) {
    this.enrolledUsers.push(userId);
    await this.save();
  }
};

const User = mongoose.model("User", UserSchema);
const Admin = mongoose.model("Admin", AdminSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
  User,
  Admin,
  Course,
};
