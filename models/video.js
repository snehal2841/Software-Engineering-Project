const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
    vid_url_id:{
        type: String,
    },
    vid_id:{
        type : String,
        required : true,
        unique : true
    },
    author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
    date: Date,
    location: String
});

module.exports = mongoose.model('Video', VideoSchema);