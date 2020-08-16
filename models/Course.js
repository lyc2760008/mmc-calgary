const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema(
  {
    courseName: {
      type: String,
      required: true
    },
    courseImg: {
      type: String,
      required: true
    },
    courseSchedule: {
      type: String,
      required: true
    },
    courseDescription: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    instructorName: {
      type: String,
      required: true
    },
    instructor: { type: Schema.Types.ObjectId, ref: "User" },
    category: { type: Schema.Types.String, ref: "Category" }
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = Course = mongoose.model("courses", CourseSchema);
