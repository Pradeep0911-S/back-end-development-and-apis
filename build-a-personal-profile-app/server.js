const express = require("express");
const port = 3000;

const app = express();

const hobbies = ['cycling', 'boating', 'guitar'];
const skills = ['JavaScript', 'Node.js', 'Express.js'];

app.get('/',(req,res)=>{
    res.send("Welcome to Camper Bot's homepage!");
});

app.get('/hobbies',(req,res)=>{
    res.send("I cycle, go boating, and play guitar.");
});


app.get('/skills',(req,res)=>{
    res.send("JavaScript, Node.js, and Express.js!");
});

app.get('/api/profile',(req,res)=>{
    res.header({"Content-type": "application/JSON"});
    res.json({"name": "Camper Bot", "hobbies" : hobbies, "skills" : skills});
});

app.listen(port,()=>{
    console.log("server is running");
    
});