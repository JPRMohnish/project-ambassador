const express=require("express");
const bodyparser=require("body-parser");
const app=express();
app.use(bodyparser.urlencoded({extended:true}));
const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/chatsDB",{ useNewUrlParser:true});
const newSchema=new mongoose.Schema(
  {
    name:String,
    client_name:String,
    permission_token:Number,
    permission_token1:Number,
    messages:[String]
  });
const chat_db=mongoose.model("Chat",newSchema);
/*var n1=new chat_db({
  name:"ROHIT",
  client_
  talks_to:" ",
  Number_of_chats:0
});
var n2=new chat_db({
  name:"MONISH",
  email:"monissatidasani@gmail.com",
  talks_to:" ",
  Number_of_chats:0
});
chat_db.insertMany([n1,n2],function(err){
  if(err)
  {
    console,log(err);
  }
  else {
    console.log("Success");
       }
});*/
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
  var nam=req.body.next_client;
  //Getting the corrwct user name with login url or from jwt token after that using the name of the current user_;
  var p1=1;
  var p2=0;
  var msg="ROHIT WANTS TO CONNECT MOHNISH"
  var n1=new chat_db({
    name:"ROHIT",
    client_name:nam,
    permission_token:p1,
    permission_token1:p2,
    messages:+msg
  });
  //n1.save();
  chat_db.insertMany([n1],function(err){
    if(err)
    {
      console,log(err);
    }
    else {
      console.log("Success");
         }
  });
    console.log(n1);
});
app.set("view engine","ejs");
app.get("/MONISH",function(req,res){
     var books=[""];
     var i=0,j=0;
     chat_db.find(function(err,chats){
       if(err)
       console.log(err);
       else {
           chats.forEach(function(chat)
         {
           if(chat.client_name==="MONISH"&&chat.permission_token1===0)
           {
                  console.log("HELLO MATCHING  RECORD FOUND");
                   books[i]=chat.name;
                   i++;
                   console.log(books[i-1]);
           }
         });
         console.log(books);
        res.render("list",{books_items:books});
       }
     });
     //res.render("list",{books_items:books});
  app.post("/chat",function(req,res){
      var nam=req.body.btn1;
      console.log(nam);
       chat_db.updateOne({name:nam,client_name:"MONISH"},{$set:{permission_token1:1}},function(err){
         if(err)
         console.log(err);
         else {
           console.log("SUCCESSSFULLY UPDATED");
           }
       });
    var messages=[""];
    var counter=0;
       chat_db.find(function(err,chats){
         if(err)
         console.log(err);
         else {
                 chats.forEach(function(chatsn)
                 {
                   if(chatsn.nam==nam&&chatsn.client_name=="MONISH")
                   {
                      messages[counter]=chatsn.messages;
                      counter++;
                   }
                 });
              }
       });
       res.render("chatp",{books_items:messages});//
       //NOW WE WILL ADDD MESSAGES IN BETWEEN MESSAGES TOKEN AND WILL UPDATE THE DB TO SHOW THE PREVIOUS MESSAGES THE CORRECT CONNECTION BETWEEN TWO PERSONS ESTABLISHED AS BY NY PERMISSSION_TOKEN VARIABLES
    });
    app.post("/block",function(req,res){
      var nam=req.body.btn2;
       chat_db.updateOne({name:nam,client_name:"MONISH"},{permission_token1:0},function(err){
         if(err)
         console.log(err);
         else {
           console.log("SUCCESSSFULLY UPDATED");
         }
       });
    });
});
    app.listen(3000,function(){
      console.log("SERVER ESTABLISHED ON PORT 3000");
    });
