const express = require('express')
const router = express.Router()
const User = require("./model");
const passport = require("passport");

// main route
router.get('/', (req, res) => {
  res.render('index',{msg:req.flash("info")});
})

// login route
router.get('/login', (req, res) => {
  res.render('login',{msg:req.flash("info")});
})

router.post('/login', passport.authenticate('local', { successRedirect: '/dashboard',
                                                    failureRedirect: '/login' ,
                                                successFlash: "successfully logged in"}));

// register route
router.get('/register', (req, res) => {
  res.render('register');
})

router.post('/register', (req, res) => {
    const {username, email, password } = req.body;
    User.findOne({email})
    .then(user=>{
        if(!user){
            const newUser = new User({username,email,password});
            newUser.save()
            .then(()=>{
                req.flash("info","successfully registered, please login")
                res.redirect('/login');
            })
        } else {
            req.flash("info","email is already exist");
            res.redirect("/")
        }
    })
    .catch();
    
})

// dashboard route
router.get('/dashboard', require("./auth").ensureAuthenticated, (req, res) => {
  res.render('dashboard',{username: req.user.username , msg:req.flash("info"), suc: req.flash("success")});
})

// logout route
router.get('/logout' ,(req, res) => {
    req.logout();
    req.flash("info","successfully logged out");
    res.redirect('/login');
})
module.exports = router
