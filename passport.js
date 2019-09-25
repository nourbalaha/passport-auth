const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
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
            return done(null, false, { message: "Incorrect username." });
          }
          if (user.password != password) {
            return done(null, false, { message: "Incorrect password." });
          }
          return done(null, user);
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
