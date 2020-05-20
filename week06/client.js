const net = require("net");
const parser = require("./parser.js");

class Request{
    //method, url = host + port+ path
    //content-type 两边一致
    //content-length
    //headers
    //body  key=val

    constructor(options){
      this.method = options.method || "GET";
      this.host = options.host;
      this.path = options.path || "/";
      this.port = options.port || 80;
      this.body = options.body || {};
      this.headers = options.headers || {};
      if(!this.headers["Content-Type"]){
        this.headers["Content-Type"] = "application/x-www/form-urlencode";
      }
      if(this.headers["Content-Type"] === "application/json"){
        this.bodyText = JSON.stringify(this.body);
      } else if(this.headers["Content-Type"] === "application/x-www/form-urlencode"){
        this.bodyText = Object.keys(this.body).map(key => `${key} = ${encodeURIComponent(this.body[key])}`).join('&');
      }
      this.headers['Content-length'] = this.bodyText.length;
    }
      toString(){
        return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join()}\r\n
\r
${this.bodyText}`;
      }

    // }
    // open(methos, url){

    // }
    send(connection){
      return new Promise((resolve,reject) => {
        const parser = new ResponseParser();
        if(connection){
          connection.write(this.toString());
        } else {
          connection = net.createConnection({
            host: this.host,
            port: this.port,
  
          }, () => {
            connection.write(this.toString());
          });
        }
        connection.on('data', (data) => {
          // console.log(data.toString());
            parser.receive(data.toString());
            // console.log(data.toString());
            // resolve(data.toString);
            if(parser.getisFinished()){
              resolve(parser.getResponse());
            }
            connection.end();
            // console.log(parser.statusLine);
            // console.log(parser.headers);
        });
        // connection.on('end', () => {
        //     console.log('end');
        //   });

      });
    }
};
class Response{

};
class ResponseParser{
  constructor(){
    this.WATTING_STATUS_LINE = 0;
    this.WATTING_STATUS_LINE_END = 1;
    this.WATTING_HEADER_NAME = 2;
    this.WATTING_HEADER_SPACE = 3;
    this.WATTING_HEADER_VALUE = 4;
    this.WATTING_HEADER_LINE_END = 5;
    this.WATTING_HEADER_BLOCK_END = 6;
    this.WATTING_BODY = 7;
    // this.WATTING_STATUS_LINE = 0;

    this.current = this.WATTING_STATUS_LINE
    this.statusLine = "" ;
    this.headers = {};
    this.headerName = "";
    this.headerValue = "";
    this.bodyParser = null;
    
  }
  getisFinished(){
    return this.bodyParser && this.bodyParser.isFinished;
  }
  getResponse(){
    // console.log(this.statusLine);
    this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\S\s]+)/);
    return {
      statusCode : RegExp.$1,
      statusText: RegExp.$2,
      headers: this.headers,
      body: this.bodyParser.content.join('')
    }
  }
  receive(string){
    for (let i =0; i< string.length; i++) {
      this.receiveChar(string.charAt(i));
    }
  }
  receiveChar(char){
    if(this.current === this.WATTING_STATUS_LINE){
      if( char === '\r'){
        this.current = this.WATTING_STATUS_LINE_END;
      } else {
        this.statusLine +=char;
      }
    } else if(this.current === this.WATTING_STATUS_LINE_END){
      if(char === '\n'){
        this.current = this.WATTING_HEADER_NAME;
      }
    } else if(this.current === this.WATTING_HEADER_NAME){
      if( char === ':'){
        this.current = this.WATTING_HEADER_SPACE;
      } else if( char === '\r'){
        this.current = this.WATTING_HEADER_BLOCK_END;
        if(this.headers['Transfer-Encoding'] === 'chunked'){
          this.bodyParser = new TrunkBodyParser()
        }
      } else{
        this.headerName +=char;
      }
    } else if(this.current === this.WATTING_HEADER_SPACE){
      if( char === ' '){
        this.current = this.WATTING_HEADER_VALUE;
        
      }
    }

    else if(this.current === this.WATTING_HEADER_VALUE){
      if(char === '\r'){
        this.current = this.WATTING_HEADER_LINE_END;
        this.headers[this.headerName] = this.headerValue;
        this.headerName = '';
        this.headerValue = '';
      } else {
        this.headerValue += char;
      }
    }

    
    else if(this.current === this.WATTING_HEADER_LINE_END){
      if(char === '\n'){
        this.current = this.WATTING_HEADER_NAME;
      }
    }
    
    else if (this.current === this.WATTING_HEADER_BLOCK_END){
      if(char === '\n'){
        this.current = this.WATTING_BODY;
      }
    }
    else if(this.current === this.WATTING_BODY){
      this.bodyParser.receiveChar(char);
    }
  }
}
class TrunkBodyParser{
  constructor(){
    this.WATTING_LENGTH = 0;
    this.WATTING_LENGTH_LINE_END = 1;
    this.READING_TRUNK = 2;
    this.WATTING_NEW_LINE = 3;
    this.WATTING_NEW_LINE_END = 4;
    this.isFinished = false;
    this.length = 0;
    this.content = [];
    // this.WATTING_STATUS_LINE = 0;
    this.current = this.WATTING_LENGTH;
    
  }
  receiveChar(char){
    // console.log(JSON.stringify(char));
    // console.log(this.current);
    if(this.current === this.WATTING_LENGTH){
      if(char === '\r'){
        if(this.length === 0){
          this.isFinished = true;
          // console.log(this.content);
          // console.log('//////');
          return this.content;
        }
        this.current = this.WATTING_LENGTH_LINE_END;
        
      } else {
        this.length *= 16;
        // this.length += char.charCodeAt(0) - '0'.charCodeAt(0);
        this.length += parseInt(char, 16);
      }
    } else  if(this.current === this.WATTING_LENGTH_LINE_END){
      if(char == '\n'){
        this.current = this.READING_TRUNK;
      }
    } else  if(this.current === this.READING_TRUNK){
      // console.log(char);
      if(this.length > 0){
        this.content.push(char);
        this.length --;
        // console.log(this.length);
        if(this.length === 0){
          this.current =this.WATTING_NEW_LINE;
        }

      }
    } else if(this.current === this.WATTING_NEW_LINE){
      if(char == '\r'){
        this.current = this.WATTING_NEW_LINE_END;
      }
    }else  if(this.current === this.WATTING_NEW_LINE_END){
      if(char == '\n'){
        this.current = this.WATTING_LENGTH;
      }
    }

  }

}
// const net = require('net');
// net.connect({
//   host: "127.0.0.1",
//   port: 8088,
//   onread: {
//     // Reuses a 4KiB Buffer for every read from the socket.
//     buffer: Buffer.alloc(4 * 1024),
//     callback: function(nread, buf) {
//       // Received data is available in `buf` from 0 to `nread`.
//       console.log(buf.toString('utf8', 0, nread));
//     }
//   }
// });
// const client = net.createConnection(
//   {
//     host: "127.0.0.1",
//     port: 8088
//   }, () => {
//   // 'connect' listener.
  
//   console.log('connected to server!');
//   // client.write('POST / HTTP/1.1\r\nContent-Type: application/x-www/form-urlencode\r\nContent-Length: 9\r\n\r\nname=shyi');
//   let request = new Request({
//     method: "POST",
//     host: "127.0.0.1",
//     port: "8088",
//     body: {
//       name: "shyi"
//     },
//     headers: {
//       "X-FOO2" : "customedd"
//     }
//   });
//   console.log(request.toString());
//   client.write(request.toString());
// });
// client.on('data', (data) => {
//   console.log(data.toString());
//   client.end();
// });
// client.on('end', () => {
//   console.log('disconnected from server');
// });
// let request = new Request({
//       method: "POST",
//       host: "127.0.0.1",
//       port: "8088",
//       body: {
//         name: "shyi"
//       },
//       headers: {
//         "X-FOO2" : "customedd"
//       }
// });
// request.send();
void async function(){
  let request = new Request({
    method: "POST",
    host: "127.0.0.1",
    port: "8088",
    body: {
      name: "shyi"
    },
    headers: {
      "X-FOO2" : "customedd"
    }
  });
  let response = await request.send();
  // console.log(response);
  let dom = parser.parseHTML(response.body);
  console.log(dom);
}();