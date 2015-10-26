var remote = require('remote');
var Menu = remote.require('menu');
var app = remote.require('app');
var dialog = remote.require('dialog');
var fs = require('fs');
var _ = require('lodash');
var dirTree = require('directory-tree');

var sidebar = document.getElementById('sidebar');

var currentPath = '.';
var currentFolder = 'z-md';
var currentFile = 'EXAMPLE.md';

// Create an editor
var CatdownEditor = require('./js/catdown')({
  editor: 'editor',
  preview: 'preview'
});

var openFile = function (filename) {
  currentPath = filename.substring(0, filename.lastIndexOf('/'));
  currentFolder = currentPath.substring(currentPath.lastIndexOf('/') + 1, currentPath.length);
  currentFile = filename.substring(filename.lastIndexOf('/') + 1, filename.length);

  fs.readFile(filename, 'utf8', function (error, data) {
    remote.getCurrentWindow().setTitle(currentFile + ' - ' + app.getName());
    sidebar.innerHTML = '<ul><li>' +
                        currentFolder +
                        '<ul><li>' +
                        currentFile +
                        '</li></ul></li></ul>';

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


var openFolder = function (folderpath){
  var tree = dirTree.directoryTree('./TESTS');

  var sidebarContent = "";

  function objToUl(data) {
    sidebarContent += "<ul>";
    for(i=0; i<data.length; i++){
      sidebarContent += "<li>" + data[i].name + "</li>";
      if(!!data[i].children){
        objToUl(data[i].children)
      }
    }
    sidebarContent += "</ul>";
  }

  objToUl([tree])

  sidebar.innerHTML = sidebarContent;

}

var template = [
  // {
  //   label: 'Electron',
  //   submenu: [
  //     {
  //       label: 'About Electron',
  //       selector: 'orderFrontStandardAboutPanel:'
  //     },
  //     {
  //       type: 'separator'
  //     },
  //     {
  //       label: 'Services',
  //       submenu: []
  //     },
  //     {
  //       type: 'separator'
  //     },
  //     {
  //       label: 'Hide Electron',
  //       accelerator: 'CmdOrCtrl+H',
  //       selector: 'hide:'
  //     },
  //     {
  //       label: 'Hide Others',
  //       accelerator: 'CmdOrCtrl+Shift+H',
  //       selector: 'hideOtherApplications:'
  //     },
  //     {
  //       label: 'Show All',
  //       selector: 'unhideAllApplications:'
  //     },
  //     {
  //       type: 'separator'
  //     },
  //     {
  //       label: 'Quit',
  //       accelerator: 'CmdOrCtrl+Q',
  //       selector: 'terminate:'
  //     },
  //   ]
  // },
  {
    label: 'File',
    submenu: [
      {
        label: 'Open...',
        accelerator: 'CmdOrCtrl+O',
        click: function () {
          dialog.showOpenDialog({
            properties: [ 'openFile' ],
            filters: [
              { name: 'Markdown', extensions: ['md', 'markdown'] }
            ]
          }, openFiles);
        }
      },
      {
        label: 'Open folder...',
        accelerator: 'Alt+CmdOrCtrl+O',
        click: function () {
          dialog.showOpenDialog({
            properties: [ 'openDirectory' ]
          }, openFolder);
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
      },
      {
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        selector: 'terminate:'
      },
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
