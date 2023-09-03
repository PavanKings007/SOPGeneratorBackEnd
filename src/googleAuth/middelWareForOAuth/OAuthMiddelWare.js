require('dotenv').config();

const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');

passport.use(new Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:8060/google/callback',
    passReqToCallback: true,
},
(request, accesToken, refreshRoken, profile, done)=>{
    return done(null,profile);
}
));

passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
})

module.exports = passport;