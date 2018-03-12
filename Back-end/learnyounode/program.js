// Exercise 1
// console.log("HELLO WORLD");

// Exercise 2
// console.log(process.argv.slice(2).reduce((a, b) => parseFloat(a) + parseFloat(b)));

// Exercise 3
// var fs = require('fs');
// var file = process.argv[2];

// console.log(fs.readFileSync(file).toString().split("\n").length - 1);

// Exercise 4
// var fs = require('fs');
// var file = process.argv[2];

// fs.readFile(file, 'utf8',(err, contents) => {
//     if(err) return console.log(err);
//     var lines = contents.split("\n").length - 1
//     console.log(lines);
// });

// Exercise 5
// var fs = require('fs');
// var path = require('path');

// var folder = process.argv[2];
// var ext = '.' + process.argv[3];

// fs.readdir(folder, function(err, files) {
//     if(err) console.log(err);
    
//     files.forEach((file) => {
//         // if(name.includes(ext)) {
//         //     console.log(name);
//         // }

//         if(path.extname(file) === ext) {
//             console.log(file);    
//         }
//     });
// });


// Exercise 6 - Module
// var mymodule = require('./mymodule.js');
// var dir = process.argv[2];
// var ext = process.argv[3];

// function callback(err, files) {
//     if (err) throw new Error(err);
    
//     files.forEach(element => {
//         console.log(element);
//     });
// }

// mymodule(dir, ext, callback);

// Exercise 7 - HTTP Client
// var http = require('http');
// var url = process.argv[2];

// function callback(response) {
//     response.setEncoding("utf8");
//     response.on("data", console.log);
//     response.on("error", console.error);
// }

// http.get(url, callback).on("error", console.error);

// Exercise 8 - HTTP COLLECT

// var http = require('http');
// var url = process.argv[2];

// function callback(response) {
// var string = []; 
// var count = 0;
//     response.setEncoding("utf8");

//     response.on("data", (word) => {
//         count += word.length;
//         string.push(word);
//     }).on("end", () => {
//         console.log(count);
//         console.log(string.join(''));
//     });
//     response.on("error", console.error);
// }

// http.get(url, callback).on("error", console.error);

// Exercise 9 - JUGGLING ASYNC

// var http = require('http');
// var urls = process.argv.slice(2);

// var responses = {}; 
// var count = 0;
// var len = urls.length;

// function callback(response) {
//     let string = []
//     response.setEncoding("utf8");

//     response
//         .on("data", (word) => {
//             string.push(word);
//         })
//         .on("end", () => {
//             count++;
//             responses[count] = string.join("");

//             if(count === len) {
//                 for(string in responses) {
//                     console.log(responses[string]);
//                 }
//             }
//         });
//     response.on("error", console.error);
// }

// urls.forEach(url => http.get(url, callback).on("error", console.error));

// Exercise 10 - TIME SERVER

var net = require('net');
const port = process.argv[2];
var server = net.createServer(function(socket) {
    // socket handling logic
    const date = new Date();
    const y = date.getFullYear();
    const m = ('0' + (date.getMonth() + 1)).slice(-2) ;
    const d = ('0' + date.getDate()).slice(-2);
    const h = ('0' + date.getHours()).slice(-2);
    const min = ('0' + date.getMinutes()).slice(-2);
    
    const now = y + "-" + m  + "-" + d + " " + h + ":" + min; 
    socket.end(now + "\n");
});

server.listen(port);