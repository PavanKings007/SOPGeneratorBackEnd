require('dotenv').config();
// const express = require("express");

// const api = express();
const passport = require('../googleAuth/middelWareForOAuth/OAuthMiddelWare');
const cors = require("cors");

const session = require('express-session');

module.exports=(api)=>{
require('../googleAuth/middelWareForOAuth/OAuthMiddelWare');



api.use(
    session({
        secret:process.env.ACCESS_TOKEN_SECRET,
        resave:true,
        saveUninitialized:true,
          cookie:{secure:false,maxAge:24 * 60 * 60 * 1000},
          
        })
)

api.use(passport.initialize());
api.use(passport.session());

api.use(cors());
}