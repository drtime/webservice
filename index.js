const express = require('express');
const bodyParser = require('body-parser');
const jsonfile = require('jsonfile');
const http = require('http');
const createIfNotExist = require("create-if-not-exist");

const app = express();
const hints_file = './hintsdb.json';
const server = http.createServer(app);
const io = require('socket.io').listen(server);

createIfNotExist(hints_file, "{\"data\": []}");

app.get('/', (req, res) => {
    res.json({
        "uptime": process.uptime(),
        "message": "is this api even working?"
    });
});

let hintlist = jsonfile.readFileSync(hints_file).data;

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.post('/v1/hint', (req, res) => {
    const content = req.body.content;

    hintlist.push({
        time: Math.floor(Date.now() / 1000),
        hint: content.trim()
    });

    jsonfile.writeFileSync(hints_file, {data: hintlist});

    res.json({
        "success": true
    });

    io.emit("hint", {"content": content});
});

app.post('/v1/unlock/:id', (req, res) => {
    const id = req.params.id;


});

app.get('/v1/hints', (req, res) => {
    res.json({
        "success": true,
        "data": hintlist.reverse()
    });
});

app.get('/realtime/hints', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

server.listen(30101, () => {
    console.log('Webservice app listening on port 30101!')
})
