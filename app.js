require('dotenv').config();
const express = require('express');
const passport = require("passport");
const controller = require('./src/controlls/apiController')

const session = require('./src/middelWares/allMiddelWares');

const api = express();

api.use(express.json());

session(api);

api.use('/',controller);

const port = 8060 || process.env.PORT




api.listen(port,(req,res)=>{
    console.log(`Server listing on port : ${port}`);
})