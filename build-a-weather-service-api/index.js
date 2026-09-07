import express from 'express';
import weatherRouter from './weather.js';
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

app.use('/api/weather',weatherRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,"public","index.html").status(200));
});
    

app.get("/api/info", (req, res) => {
  res.json({
    name: "Weather Service API",
    version: "1.0.0",
    endpoints: ["/api/weather/:city", "/api/greet/:name", "/api/data"],
  });
});

app.get('/api/status',(req,res)=>{
    res.status(200).json({"status": ""});
});

app.get('/docs',(req,res)=>{
    res.redirect("/api/info");
})

app.get('/api/greet/:name',(req,res)=>{
    const name  = req.params.name;
    res.json({"name": name});
})
app.route('/api/data')
    .get((req,res)=>{
        res.json();
    })
    .post((req,res)=>{
        res.status(201).json();
    })

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})