// Import Catdown
var Catdown = require('catdown');

var editor = document.getElementById('editor');
var preview = document.getElementById('preview');

// Create an editor
var catdown = new Catdown({
    textarea: editor,
    preview: preview
});

var fs = require('fs');
fs.readFile('./README.md', 'utf8', function (error, data) {
  catdown.set(data);
});
