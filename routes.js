const express = require('express')
const router = express.Router()
const User = require("./model");
const passport = require("passport");

// main route
router.get('/', (req, res) => {
  res.render('index');
})

// login route
router.get('/login', (req, res) => {
  res.render('login');
})

router.post('/login', passport.authenticate('local', { successRedirect: '/dashboard',
                                                    failureRedirect: '/login' }));

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
                res.render('dashboard');
            })
        } else {
            res.send("email exists")
        }
    })
    .catch();
    
})

// dashboard route
router.get('/dashboard', require("./auth").ensureAuthenticated, (req, res) => {
  res.render('dashboard',{username: req.user.username});
})

// logout route
router.get('/logout' ,(req, res) => {
    req.logout();
  res.redirect('/login');
})
module.exports = router
