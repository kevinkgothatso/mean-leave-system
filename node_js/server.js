const express = require("express");
const app = new express();
const mongoose = require("mongoose");
const leave_request = require('./models/leave_request');

mongoose.connect("mongodb://localhost:27017/LeaveRequests", {useNewUrlParser: true}); //dabase

app.listen(3000, ()=>{
    console.log("server is running at port 3000");
})

app.get('/',async (req,res)=>{
     const leave = await leave_request.find({});  // find all
     res.json(leave);
     console.log(leave);
});

// app.post('/leave', (req, res)={

// });



