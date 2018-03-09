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

var http = require('http');
var url = process.argv[2];

function callback(response) {
var string = []; 
var count = 0;
    response.setEncoding("utf8");

    response.on("data", (word) => {
        count += word.length;
        string.push(word);
    }).on("end", () => {
        console.log(count);
        console.log(string.join(''));
    });
    response.on("error", console.error);
}

http.get(url, callback).on("error", console.error);
