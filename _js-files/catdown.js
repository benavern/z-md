var Catdown = require('catdown');

var CatdownEditor = {

  catdown: null,

  init: function (data) {
    if(!data || !data.editor || !data.preview) {
      throw new Error('Missing data properties');
    }

    this.catdown = new Catdown({
      textarea: document.getElementById(data.editor),
      preview: document.getElementById(data.preview)
    });

    if(data.content)
      this.set(data.content);

    return this;
  },

  set: function (content) {
    this.catdown.set(content);
  },

  get: function () {
    return this.catdown.value();
  }

};

module.exports = CatdownEditor.init.bind(CatdownEditor);