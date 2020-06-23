var express = require('express');
var app=express();
var bodyParser= require('body-parser');

//this specify entry point of the application which is index.html
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

//provide a store for storing the data requested from the page
var users=[];
app.get('/',function(req,res){
    res.sendFile(__dirname + 'index.html');

});

//this post method returns the requested data itself as success response
app.post('/api/adduser',function(req,res){
    console.log("post request received");
    console.log("req:"+ req.body.name);
    var user={};
    user.name=req.body.name;
    user.email=req.body.email;
    users.push(user);
    return user;
});

//this get method returns all data stored as success response
app.get('/api/listuser', function(req,res){
    console.log("get request accepted");
    res.send(users);
});

//this show error page during a user access wrong url
app.get('*', function(req,res){
    res.sendFile(__dirname + "/public/error.html");
});
//this tell that the server run on 3000 port
app.listen(3000, function(){
    console.log("The server running on 3000 port");
});