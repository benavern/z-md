var remote = require('remote');
var Menu = remote.require('menu');
var app = remote.require('app');
var dialog = remote.require('dialog');
var fs = require('fs');
var _ = require('lodash');

var currentPath = '.';
var currentFile = 'EXAMPLE.md';

// Create an editor
var CatdownEditor = require('./js/catdown')({
  editor: 'editor',
  preview: 'preview',
  plugins: [
    require("catdown-scrollsync") //This doesn't work !!! :-(
  ]
});

var openFile = function (filename) {
  currentPath = filename.substring(0, filename.lastIndexOf('/'));
  currentFile = filename.substring(filename.lastIndexOf('/') + 1, filename.length);

  fs.readFile(filename, 'utf8', function (error, data) {
    remote.getCurrentWindow().setTitle(currentFile + ' - ' + app.getName());

    CatdownEditor.set(data);
  });
};

var saveFile = function (filename) {
  fs.writeFile(filename, CatdownEditor.get(), function (error) {
    // ToDo: handle error
  });
};

var openFiles = function (filenames) {
  _.forEach(filenames, openFile);
};

openFile(currentPath + '/' + currentFile);


var template = [
  {
    label: 'Electron',
    submenu: [
      {
        label: 'About Electron',
        selector: 'orderFrontStandardAboutPanel:'
      },
      {
        type: 'separator'
      },
      {
        label: 'Services',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        label: 'Hide Electron',
        accelerator: 'CmdOrCtrl+H',
        selector: 'hide:'
      },
      {
        label: 'Hide Others',
        accelerator: 'CmdOrCtrl+Shift+H',
        selector: 'hideOtherApplications:'
      },
      {
        label: 'Show All',
        selector: 'unhideAllApplications:'
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        selector: 'terminate:'
      },
    ]
  },
  {
    label: 'File',
    submenu: [
      {
        label: 'Open...',
        accelerator: 'CmdOrCtrl+O',
        click: function () {
          dialog.showOpenDialog({
            filters: [
              { name: 'Markdown', extensions: ['md', 'markdown'] }
            ]
          }, openFiles);
        }
      },
      {
        label: 'Save As...',
        accelerator: 'CmdOrCtrl+S',
        click: function () {
          dialog.showSaveDialog({
            title: (currentFile)? currentFile: '',
            defaultPath: (currentPath)? currentPath: '',
            filters: [
              { name: 'Markdown', extensions: ['md', 'markdown'] }
            ]
          }, saveFile);
        }
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        selector: 'undo:'
      },
      {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        selector: 'redo:'
      },
      {
        type: 'separator'
      },
      {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        selector: 'cut:'
      },
      {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        selector: 'copy:'
      },
      {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        selector: 'paste:'
      },
      {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        selector: 'selectAll:'
      }
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: function() { remote.getCurrentWindow().reload(); }
      },
      {
        label: 'Toggle DevTools',
        accelerator: 'Alt+CmdOrCtrl+I',
        click: function() { remote.getCurrentWindow().toggleDevTools(); }
      },
    ]
  },
  {
    label: 'Window',
    submenu: [
      {
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        selector: 'performMiniaturize:'
      },
      {
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        selector: 'performClose:'
      },
      {
        type: 'separator'
      },
      {
        label: 'Bring All to Front',
        selector: 'arrangeInFront:'
      }
    ]
  },
  {
    label: 'Help',
    submenu: []
  }
];

menu = Menu.buildFromTemplate(template);

Menu.setApplicationMenu(menu);
