// Exercise 6

// These four things are the contract that your module must follow.

// 1. Export a single function that takes exactly the arguments described.
// 2. Call the callback exactly once with an error or some data as described.
// 3. Don't change anything else, like global variables or stdout.
// 4. Handle all the errors that may occur and pass them to the callback.

var fs = require('fs');
var path = require('path');

function filterFunction(dir, ext, callback) {
    var arr = [];

    fs.readdir(dir, function(err, files) {
        if (err) return callback(err);
        
        files.forEach((file) => {
            if(path.extname(file) === '.' + ext) {
                arr.push(file);
            }
        });
        
        return callback(null, arr);
    });
}

module.exports = filterFunction;