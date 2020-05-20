const http = require('http');
const server = http.createServer((req, res) => {
    console.log("request received");
    console.log(req.headers);
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('X-Foo', 'bar');
    res.writeHead(200, {'Content-type' : 'text/plain'});
    // res.end('ok');
    res.end(`< html maaa=a >
<head>
    <style>
body div #myid{
    width:100px;
    backgroud-color: #ff5000;
}
body div img{
    width:30px;
    backgroud-color: #ff1111;
}
    </style>
</head>
<body>
    <div>
        <img id='#myid'>
        </img>
    </div>
</body>
<html>`);
});
server.listen(8088);