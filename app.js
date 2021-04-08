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
const upload = require("./utils/multer");
const {cloudinary} = require("./utils/cloudinary");
const { all } = require('async')
const User = require("./models/user");
const Video = require("./models/video");
// const fs=require("fs");

const userRoutes = require("./routes/users");
const { isLoggedIn } = require("./middleware/usermiddleware");
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

app.use(express.json());
app.use(express.urlencoded({extended: false}));

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


app.get("/record",isLoggedIn ,(req, res) => {
    res.render("recorder");
});
app.get("/error", (req, res) => {
    res.render("errormsg");
});



app.get("/videos",async(req,res) =>{
    const all_file = await cloudinary.api.resources();
    const files = await all_file.resources;
    res.render('profile', {files});
}); 

app.get("/newVid", (req,res) =>{
    res.render("newVid");
});

app.post("/videos",  upload.single('file') , async (req,res) =>{

    const result = await cloudinary.uploader.upload(req.file.path, {resource_type: 'auto'});

    console.log("result: ", result);

    // const post_details = {
    //     title: req.body.title,
    //     image: result.public_id
    // }

    //res.status(200).json({post_details});
    res.redirect('/videos');
});

app.get("/track", isLoggedIn,(req,res) =>{
    res.render("track");
 });


let port = process.env.PORT || 8000
app.listen(port, process.env.IP, () => {
    console.log("showing on port 8000.");
});