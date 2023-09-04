require('dotenv').config();
const express = require('express');

const passport = require('passport');

const router = express.Router();

const {googleAuthPage } = require('../googleAuth/OAuthControll/googleOAuth')

const {chatGPT} = require('../chatGPT/chatGPT');

const PDFDocument = require('pdfkit');

const nodemailer = require('nodemailer');

const { AbortController } = require('abort-controller');

const fs = require('fs');

const baseURL = process.env.CLIENT_URL;

router.get('/',(req,res)=>{
    try {
        if (req.isAuthenticated()) {
            res.redirect('/protected');
        } else {
            res.redirect('/google');
        }
    } catch (error) {
        console.log(error);
    }
})

router.get('/google',googleAuthPage)

router.get('/google/callback', passport.authenticate('google',{
    successRedirect:'/protected',
    failureRedirect:'/failure'
}));

router.get('/failure',(req,res)=>{
    res.redirect('/auth/google');
})

router.get('/protected',(req,res)=>{
    res.redirect(`${baseURL}/effizientsop`);
    // res.send('Hello....');
})

router.post('/userdetails',(req,res)=>{
    try {

      const controller = new AbortController(); // Create an AbortController
    const signal = controller.signal;


        fs.readFile('sample.txt', 'utf-8', async (err, data) => {
            if (err) {
              console.error('Error reading file:', err);
              return;
            }
            
            const timeoutId = setTimeout(() => {
              controller.abort(); // Abort the request after a timeout (e.g., 5 seconds)
              console.log('Request aborted');
            }, 50000000);

            try {
              const completion = await chatGPT(req.body, data, signal);
      
              clearTimeout(timeoutId); // Cancel the timeout since the request has completed
      
              fs.writeFile('EffizientSOP.doc', completion, (writeErr) => {
                if (writeErr) {
                  console.error('Error writing file:', writeErr);
                  return;
                }
              });
      
              const pdf = new PDFDocument();
              pdf.pipe(fs.createWriteStream('EffizientSOP.pdf'));
      
              pdf.text(completion);
              pdf.end();
      
              res.json({ completion });
            } catch (error) {
              console.log(error);
              clearTimeout(timeoutId); // Cancel the timeout on error
            }
          });
            
          } 
          catch (error) {
            console.log(error);
          }
})


 
const transport = nodemailer.createTransport({
    service:'gmail',
    auth:{
      user:process.env.MAIL_ID,
      pass:process.env.MAIL_KEY,
    }
  })

router.post('/mail',async (req,res)=>{   
    try{
   await transport.sendMail({
     from:'Effizient SOP.co.in <'+process.env.MAIL_ID+'>',
     to:req.body.formData.email,
     subject:'Effizient Generated SOP Files',
     html:`<h1>Effizient SOP Generated Files...</h1>
     <p>Dear ${req.body.formData.name}</p>
     <br/>
     <p>Please find attched the Statement of Purpose template for your student
     visa application to Canada. Kindly edit it as per your scenario and
     needs.</p>
     <br/>
     <p>In case you would like to get the full statement of purpose drafted by
     our experts, do not hesitate to contact us.</p>
     <br/>
     <p> Here is the doc file in case you would like to edit it:
     https://docs.google.com/document/d/1KtAE__-Ua8W8QqD-bM-Fpm4fcQdpNCFEbqw9l8sjz2g/edit?usp=drivesdk
     </p>
     <br/>
     <p>
     Leave us a google review if you liked our service:
     https://g.page/r/CQT2Q8IwOnqpEB0/review
     </p>
     <br/>
     
     <h4>Best Regards,</h4>
     <br/>
     <h6>Team Effizient</h6>
     <br/>
     <h6>www.effizient.ca</h6>
     <br/>
     <h6>Ph: 226-774-9168</h6>
     `,
     attachments:[
       {
         filename:'EffizientSOP.pdf',
         path:'./EffizientSOP.pdf'
        },
        {
          filename:'EffizientSOP.doc',
          path:'./EffizientSOP.doc'
        }
      ]
    })
    console.log();
    res.status(200).json("Done");
  }
  catch(error){
    console.log(error);
  }
})



module.exports = router;