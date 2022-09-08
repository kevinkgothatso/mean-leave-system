const express = require("express");
const app = new express();
const mongoose = require("mongoose");
const leave_request = require('./models/leave_request');

const cors = require('cors');
// const { request } = require("express");

app.use(express.json()); //allaows data to be moved as json
app.use(cors()); //allows cross site origin

mongoose.connect("mongodb://localhost:27017/LeaveRequests", { useNewUrlParser: true }); //dabase

app.listen(8080, () => {
    console.log("server is running at port 8080");
})

app.get('/', async (req, res) => {
    const leave = await leave_request.find({});  // find all
    res.json(leave);
});

app.post('/post', async (req, res) => {
    const name = req.body.name;
    const surname = req.body.surname;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const days_taken = req.body.days_taken;
    const days_left = req.body.days_left;
    const leave_type = req.body.leave_type;
    const reason = req.body.reason

    const request = new leave_request(
        {
            name: name,
            surname: surname,
            start_date: start_date,
            end_date: end_date,
            days_taken: days_taken,
            days_left: days_left,
            leave_type: leave_type,
            reason: reason
        }
    );
    console.log('server:');
    console.log(request);
    await request.save();
    res.status(201).json();
});



