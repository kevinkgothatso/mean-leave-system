const mongoose = require("mongoose");
const schema = mongoose.Schema;

const leave_requestSchema = new schema({
    _id: String,
    name: String,
    surname: String,
    start_date: String,
    end_date: String,
    days_taken: Number,
    days_left: Number,
    leave_type: String,
    reason: String
});

leave_request = mongoose.model('leaves', leave_requestSchema);  //mapping collection with model

module.exports = leave_request;