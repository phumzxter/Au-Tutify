import { Course, RequestedCourse } from '../models/course.js';
import Tutee from '../models/tutee.js';
import Tutor from '../models/tutor.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
const router = express.Router();

export const getRequests = async (req, res) => {
  try {
    const requestedCourses = await RequestedCourse.find();
    res.status(200).json(requestedCourses);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createRequest = (req, res) => {
  const body = req.body;

  const newRequest = new RequestedCourse(body);

  try {
    newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await Tutee.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await Tutee.findOne({ email });

    if (oldUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await Tutee.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, '' + process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const enroll = async (req, res) => {
  //get course id
  const { courseid } = req.params;
  //get tutee id
  const token = req.headers.authorization.split(' ')[1];
  let decodedData;
  decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.userId = decodedData?.id;
  console.log('hello', req.userId);
  //add tutee id to course modal
  // if (!mongoose.Types.ObjectId.isValid(courseid)) return res.status(404).send(`No post with id: ${id}`);
  const course = await Course.findById(courseid);
  // console.log(course);
  // course.find({ tutees: { $in: [req.userId] } }); //doesn't work, .find returns the whole document with the matching criteria
  course.tutees.push(req.userId);
  course.save();
  //add course id to tutee modal
  const tutee = await Tutee.findById(req.userId);
  tutee.enrolled.push(courseid);
  tutee.save();
  console.log(tutee); //now has enrolled course
  console.log(course); //now has list of students

  res.status(200);
};

export const enroll2 = async (req, res) => {
  //get course id
  const { courseid } = req.params;

  const { userid } = req.body;
  //get tutee id
  // const token = req.headers.authorization.split(' ')[1];
  // let decodedData;
  // decodedData = jwt.verify(token, process.env.JWT_SECRET);
  // req.userId = decodedData?.id;
  // console.log('hello', req.userId);
  //add tutee id to course modal
  // if (!mongoose.Types.ObjectId.isValid(courseid)) return res.status(404).send(`No post with id: ${id}`);
  const course = await Course.findById(courseid);
  // console.log(course);
  // course.find({ tutees: { $in: [req.userId] } }); //doesn't work, .find returns the whole document with the matching criteria
  course.tutees.push(userid);
  course.save();
  //add course id to tutee modal
  const tutee = await Tutee.findById(userid);
  tutee.enrolled.push(courseid);
  tutee.save();
  console.log(tutee); //now has enrolled course
  console.log(course); //now has list of students

  res.status(200);
};

export const withdraw = async (req, res) => {
  //get course id
  const { courseid } = req.params;
  //get tutee id
  const token = req.headers.authorization.split(' ')[1];
  let decodedData;
  decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.userId = decodedData?.id;
  // console.log('userid', req.userId);
  //add tutee id to course modal
  if (!mongoose.Types.ObjectId.isValid(courseid)) return res.status(404).send(`No post with id: ${id}`);

  //pull tutee id from course
  console.log('tutee id', req.userId);
  let tuteeid = req.userId;
  console.log('course id', courseid);

  // Course.updateOne({ _id: courseid }, { $pull: { tutees: [req.userId] } }, function (err, docs) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log('Updated Docs : ', docs);
  //   }
  // });

  // TuteeModal.updateOne({ _id: req.userId }, { $pull: { enrolled: [courseid] } }, function (err, docs) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log('Updated Docs : ', docs);
  //   }
  // });

  const respo = await Course.updateOne({ _id: courseid }, { $pull: { tutees: tuteeid } });
  // console.log(respo.modifiedCount);
  // respo.modifiedCount;
  const temp = await Course.findOne({ _id: courseid });
  console.log(temp);

  // const course = await Course.findById(courseid);
  // console.log(course); //now has list of students
  // const tutee = await TuteeModal.findById(req.userId);
  // console.log(tutee); //now has enrolled course

  // // console.log(course);
  // // course.find({ tutees: { $in: [req.userId] } }); //doesn't work, .find returns the whole document with the matching criteria
  // course.tutees.push(req.userId);
  // course.save();
  // //add course id to tutee modal
  // tutee.enrolled.push(courseid);
  // tutee.save();

  res.status(200);
};

export const deleteRequest = async (req, res) => {
  const { courseid } = req.params;

  await RequestedCourse.findByIdAndRemove(courseid);

  res.json({ message: 'Post deleted successfully' });

  // const { id: _id } = req.params;d

  // if (!mongoose.Types.ObjectId.isValid(_id))
  // 	return res.status(404).send("No post with that id");

  // await PostMessage.findByIdAndRemove(_id);

  // res.json({ message: "Post deleted successfully" });
};

export const getTutors = async (req, res) => {
  try {
    const tutors = await Tutor.find();
    res.status(200).json(tutors);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
