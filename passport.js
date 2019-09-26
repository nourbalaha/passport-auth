const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("./model");

module.exports = function() {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email"
      },
      function(email, password, done) {
        User.findOne({ email: email }, function(err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, { message: "Incorrect email." });
          }
          if (!bcrypt.compareSync(password,user.password)) {
            return done(null, false, { message: "Incorrect password." });
          }
          return done(null, user, { message: "Successfully logged in" });
        });
      }
    )
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
