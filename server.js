const express = require("express");
const ejs = require("ejs");
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
var flash = require('connect-flash');

const app = express();

// passport config
require("./passport")();

// mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://nourbalaha:nour1988@cluster0-y65jq.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to database");
});

// parsers
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// flash
app.use(flash());

// express session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }))

// passport 
app.use(passport.initialize());
app.use(passport.session());

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// Routes
app.use("/",require("./routes"));

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`app is listening on port ${PORT}`);
})