const http = require('http');
const express = require('express')
const app = express()

const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
});

server.get('/', (req, res) => {
    res.send('hello world')
})

server.listen(port, hostname, () => {
    console.log("Server running at http://0.0.0.0:3000/");
});


