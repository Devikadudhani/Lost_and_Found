import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// callbackURL: "http://localhost:5000/api/auth/google/callback",
callbackURL: "https://lost-and-found1-9n5a.onrender.com/api/auth/google/callback",

},
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        // restrict domain
        if (!email.endsWith("@igdtuw.ac.in")) {
          return done(null, false);
        }

        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email,
            googleId: profile.id,
            profileComplete: false,
          });
        }

        return done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

export default passport;
