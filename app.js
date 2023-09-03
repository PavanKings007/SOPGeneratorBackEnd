require('dotenv').config();
const express = require('express');
const passport = require("passport");
const controller = require('./src/controlls/apiController')

const session = require('./src/middelWares/allMiddelWares');

const api = express();

api.use(express.json());

session(api);

api.use('/',controller);

const port = process.env.SERVER_URL || 8060;






api.listen(port,(req,res)=>{
    console.log(`Server listing on port : ${port}`);
})