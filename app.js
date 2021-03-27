const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { session } = require("passport");
const User = require("./models/user");
const Video = require("./models/video");
// const fs=require("fs");

const userRoutes = require("./routes/users");
require('dotenv').config();

//PASSPORT CONFIGURATION
app.use(
    require("express-session")({
      secret: "Stay secured",
      resave: false,
      saveUninitialized: false,
    })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

mongoose.set('useUnifiedTopology', true);
const url = process.env.MONGODB_URI || 8000

mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, () => {
    console.log("Connected to database.");
});

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


app.use('/', userRoutes);

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/about", (req, res) => {
    res.render("about");
});

// app.get("/signup", (req, res) => {
//     res.render("signup");
// });

// app.get("/login", (req, res) => {
//     res.render("login");
// });

app.get("/record", (req, res) => {
    res.render("recorder");
});


app.get("/videos",async(req,res) =>{
    const videos = await Video.find({});
    res.render("profile");
    // const vid = new Video({vid_id: 'no48va', location: 'Market Yard'});
    // await vid.save();
    // res.send(vid);
}); 

// app.post("/profile",async(req,res) =>{
//     res.send(req.body); 
// });

// app.get("/new",(req,res) =>{
//     res.render("newVideo");
// });

app.get("/track",(req,res) =>{
    res.render("track");
 });


let port = process.env.PORT || 8000
app.listen(port, process.env.IP, () => {
    console.log("showing on port 8000.");
});