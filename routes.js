const express = require('express')
const router = express.Router()
const User = require('./model')
const passport = require('passport')
const bcrypt = require('bcrypt')

// main route
router.get('/', (req, res) => {
  res.render('index', { msg: req.flash('info') })
})

// login route
router.get('/login', (req, res) => {
  res.render('login', {
    msg: req.flash('info'),
    err: req.flash('error'),
    suc: req.flash('success')
  })
})

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    successFlash: true,
    failureFlash: true
  })
)

// register route
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        const { username, email } = req.body
        const password = bcrypt.hashSync(req.body.password, 12)
        const newUser = new User({ username, email, password })
        newUser.save().then(() => {
          req.flash('info', 'successfully registered, please login')
          res.redirect('/login')
        })
      } else {
        req.flash('info', 'email is already exist')
        res.redirect('/')
      }
    })
    .catch(err => console.log(err))
})

// dashboard route
router.get('/dashboard', require('./auth').ensureAuthenticated, (req, res) => {
    if(req.user){
        res.render('dashboard', {
          username: req.user.username,
          suc: req.flash('success')
        })
    }
})

// logout route
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success', 'successfully logged out')
  res.redirect('/login')
})
module.exports = router
