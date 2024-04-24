const passport = require("passport"),
  LocalStrategy = require("passport-local");
const { UserModule } = require("../models/UserModule");

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await UserModule.findByCredentials(email, password);
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser(({ email }, done) => {
  done(null, email);
});

passport.deserializeUser(async (email, done) => {
  try {
    const user = await UserModule.findByEmail(email);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports.passportAuth = passport;
