const mongoose = require("mongoose");
const express = require('express');
const { User, Course, Admin } = require("../db");
const jwt = require('jsonwebtoken');
const { SECRET } = require("../middleware/auth")
const { authenticateJwt } = require("../middleware/auth");

const router = express.Router();

router.get("/me", authenticateJwt, async (req, res) => {
    console.log("hi from /me route");
    const admin = await Admin.findOne({ username: req.user.username });
    if (!admin) {
      res.status(403).json({msg: "Admin doesnt exist"})
      return
    }
    console.log(admin.username);
    res.json({
        username: admin.username
    })
});

router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    function callback(admin) {
      if (admin) {
        res.status(403).json({ message: 'Admin already exists' });
      } else {
        const obj = { username: username, password: password };
        const newAdmin = new Admin(obj);
        newAdmin.save();

        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Admin created successfully', token });
      }
  
    }
    Admin.findOne({ username }).then(callback);
  });
  
  router.post('/login', async (req, res) => {
    console.log("Hi from /login router")
    const { username, password } = req.headers;
    const admin = await Admin.findOne({ username, password });
    if (admin) {
      const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      console.log('here i am');
      res.status(403).json({ message: 'Invalid username or password' });
    }
  });
  router.delete('/courses/:courseId',authenticateJwt, async(req,res)=>{
    console.log("hi from delete route");
    const courseId = req.params.courseId;
    try{
      const course = await Course.findOne({_id : courseId});
      if(!course){
        res.status(404).json({message: "Course not found"});
      }
      else{
        await Course.deleteOne({_id : courseId});
        res.json({message : "course deleleted"})
      }
   
    }   
    catch(err){
        res.json({message : "Error deleting the course", error : err.message});
    }
    // res.json({message:"Course deleted successfully"});
  })
  router.post('/courses', authenticateJwt, async (req, res) => {
    const course = new Course(req.body);
    await course.save();
    res.json({ message: 'Course created successfully', courseId: course.id });
  });
  
  router.put('/courses/:courseId', authenticateJwt, async (req, res) => {
    const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
    if (course) {
      res.json({ message: 'Course updated successfully' });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  });
  
  router.get('/courses', authenticateJwt, async (req, res) => {
    const courses = await Course.find({});
    res.json({ courses });
  });
  
  router.get('/courses/:courseId', authenticateJwt, async (req, res) => {
    console.log("hi from get route");
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);
    console.log(course);
    res.json({ course });
  });

  module.exports = router