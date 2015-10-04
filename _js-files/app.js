// Import Catdown
var Catdown = require("catdown");

// Create an editor
var editor = new Catdown({
    textarea: document.getElementById("pad"),
    preview: document.getElementById("markdown")
});
