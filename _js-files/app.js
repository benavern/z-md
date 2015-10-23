// Import Catdown
var Catdown = require('catdown');
var fs = require('fs');

var currentFile = './EXAMPLE.md';

var editor = document.getElementById('editor');
var preview = document.getElementById('preview');

// Create an editor
var catdown = new Catdown({
  textarea: editor,
  preview: preview,
});

catdown.setKeys({
  'Ctrl-I': function () {
    this._surroundSelection('*');
  },
  'Ctrl-B': function () {
    this._surroundSelection('**');
  },
  'Ctrl-S': function () {
    fs.writeFile(currentFile, this.value(), function (error) {
      // ToDo: handle error
    });
  }
});

fs.readFile(currentFile, 'utf8', function (error, data) {
  // Update data
  catdown.set(data);
});
