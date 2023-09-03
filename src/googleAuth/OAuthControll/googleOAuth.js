const passport  = require('passport');

function googleAuthPage(req,res){
    passport.authenticate('google',{scope:['email','profile']})(req,res);
}



module.exports = {googleAuthPage };


