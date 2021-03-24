const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
    vid: String,
    vid_id: String,
    date: Date,
    location: String
});

module.exports = mongoose.model('Video', VideoSchema);