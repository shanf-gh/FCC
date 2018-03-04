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
var fs = require('fs');
var path = require('path');

var folder = process.argv[2];
var ext = '.' + process.argv[3];

fs.readdir(folder, function(err, files) {
    if(err) console.log(err);
    
    files.forEach((file) => {
        // if(name.includes(ext)) {
        //     console.log(name);
        // }

        if(path.extname(file) === ext) {
            console.log(file);    
        }
    });
});