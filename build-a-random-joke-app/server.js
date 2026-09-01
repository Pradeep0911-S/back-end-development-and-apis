const express = require("express");
const port = 3000;

const app = express();
app.use(express.json());
const jokes =[
    "Why do programmers prefer dark mode? Because light attracts bugs!",
  "There are only 10 kinds of people in the world: those who understand binary and those who don't.",
  "I told my computer I needed a break, and it said \"No problem, I'll go to sleep.",
  "Why do Java developers wear glasses? Because they don't see sharp.",
];


app.get('/', (req,res)=>{
    res.status(200).send('Welcome to the Random Joke Server! Visit /joke to get a random joke.');
});

app.get('/joke',(req,res)=>{
    const randomIndex = Math.floor(Math.random() * jokes.length);
    const randomJoke = jokes[randomIndex];
    
    return res.status(200).send(randomJoke);
});

app.get('/about', (req,res)=>{
    return res.status(200).send("This Random Joke Server was built with Express.js");
});

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
    
});