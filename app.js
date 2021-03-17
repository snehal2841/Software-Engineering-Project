const express = require("express"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    bodyParser = require("body-parser"),
    flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { session } = require("passport");
const User = require("./models/user");

const userRoutes = require("./routes/users");
const app = express();
require('dotenv').config();

//PASSPORT CONFIGURATION
app.use(
    require("express-session")({
      secret: "Nothing is Greater than LOVE!!!",
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

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/record", (req, res) => {
    res.render("recorder");
});

app.get("/profile",(req,res) =>{
    res.render("profile")
});


let port = process.env.PORT || 8000
app.listen(port, process.env.IP, () => {
    console.log("showing on port 8000.");
});