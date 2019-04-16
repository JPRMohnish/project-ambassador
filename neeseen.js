
/*  const signSchema=new mongoose1.Schema(
    {
      name:String,
      roll:String,
      email:String,
      password:String,
      college:String,
      current:Number
    });
const signup_database=mongoose1.model("sign",signSchema);
 app.get("/signup",function(req,res){
   res.sendFile(__dirname+"/signup.html");
});*/

// AFTER SENDING SIGN_UP HTML PAGE AND THEN FINALLY HANDLING SIGNUP_POST PREQUESTS.
app.post("/signup",function(req,res){
  var u_name= req.body.user_name;
  var u_roll= req.body.user_roll;
  var u_email= req.body.email;
  var u_password= req.body.password;
  var u_college= req.body.select_college;
  var u_current=0;
/* const user=new signup_database({
    name:u_name,
    roll:u_roll,
    email:u_email,
    password:u_password,
    college:u_college,// THID WAS INITIAL SCHEMA
    current:u_current
  });*/
var email_string="HELLO YOU ARE SIGNED UP WITH US NOW";

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "monis.satidasani1@gmail.com", // generated ethereal user//host user email or admin email
      pass: "Jprm**#9" // generated ethereal password//admin password
    },tls:{
      rejectUnauthorised:true
    }
  });

  // setup email data with unicode symbols
var link="http://"+req.get('host')+"/verify?id="+u_email;//verification link or the path of the user
  let mailOptions = {
    from: '"nodemailer👻" <monis.satidasani1@gmail.com>', // sender address
    to: u_email, // list of receivers
    subject: "no_reply just verify your account to be our member", // Subject line
    text: "Hello world?", // plain text body
    html: "<a href="+link+" >hi CLICK HERE TO VERIFY ACCOUNT </a>" // html body
  };

  // send mail with defined transport object
  //SENDING THE MAIL FOR USER FROM SIGN/UP ROUTE THIS MUST BE DONE AFTER VERIFICATION OF OTHER VITAL INFORMATION
transporter.sendMail(mailOptions,function(err,info){
  if(err)
  console.log(err);
  else {
    console.log("SUCCESS IN SENIDNG THE MAIL FROM NODE nodemailer");
  }
});
//EMAIL SENT , NOW USER WILL CLICK ON THE ROUTE AND WILL GET ACCESS TO LOGIN BY CHANGING THE VALUE OF u_current in signup database to 1 from 0;
    app.get("/verify",function(req,res) {
      if(req.query.id==u_email)
      {
        u_current=1;
        res.send(" CONGRATULATIONS EMAIL IS VERIFIED AND LOGIN TO CONTINUE TO OUR SITE");
        console.log(u_current);
        var user=new signup_database({
           name:u_name,
           roll:u_roll,
           email:u_email,
           password:u_password,
           college:u_college,
           current:u_current
         });
        // user.save();
      signup_database.insertMany([user],function(err){
        if(err)
        console.log(err);
        else
        console.log("SUCCESSFULLY SIGNED UP");
      });
      }
      else {
        res.send("Invalid verification details close this page otherwise we may hack your details");
      }
    });
 //user.save();
 res.redirect("/newhome");
});
