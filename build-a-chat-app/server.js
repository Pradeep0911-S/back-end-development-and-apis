import http from 'http';
import fs from 'fs';
import { WebSocketServer } from 'ws';

const PORT = 3001;



const server = http.createServer((req,res)=>{
    const data = fs.readFile("./public/index.html", "utf8",(err , data)=>{
        if(err){
            res.writeHead(500, {'Content-type': 'text/html'});
            res.end("Error reading the html files")
            return;
        }
    });
    res.writeHead(200, {'Content-type': 'text/html'});
    res.end(data);
    
});

const wss = new WebSocketServer({ server });

wss.on('connection',(socket ,req)=>{
    console.log('Client connected');
    const username = new URL(req.url, "http://localhost").searchParams.get(
        "username",
    );
    const message = JSON.stringify({
        type : "system",
        text: `${username} joined`
    })
    wss.clients.forEach(client => {
        if (client.readyState === 1) { 
            client.send(message); 
        }
    });
    socket.on('message',(data)=>{
        const { username, text } = JSON.parse(data);
        const message = JSON.stringify({
            type : "chat",
            username : username,
            text: text
        });
        wss.clients.forEach(client => {
            if (client.readyState === 1) { 
                client.send(message); 
            }
        });
    });

    socket.on('close', ()=>{
        const message = JSON.stringify({
            type : "system",
            text: `${username} left`
        });
        wss.clients.forEach(client => {
            if (client.readyState === 1) { 
                client.send(message); 
            }
        });
    });
});

server.listen(PORT , ()=>{
    console.log(`Chat server running at http://localhost:${PORT}`);
});