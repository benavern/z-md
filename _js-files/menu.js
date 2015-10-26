var Menu = null;

var MenuInstance = {

  browserWindow: null,
  menu: null,

  template: [
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
            console.log("coucou!")
            dialog.showOpenDialog({
              features: ["openFile", "openDirectory"],
              filters: [
                { name: 'Markdown', extensions: ['md', 'markdown'] }
              ]
            }, this.openFiles);
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
            }, this.saveFile);
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
    // {
    //   label: 'View',
    //   submenu: [
    //     {
    //       label: 'Reload',
    //       accelerator: 'CmdOrCtrl+R',
    //       click: function() { this.browserWindow.reload(); }
    //     },
    //     {
    //       label: 'Toggle DevTools',
    //       accelerator: 'Alt+CmdOrCtrl+I',
    //       click: function() { this.browserWindow.toggleDevTools(); }
    //     },
    //   ]
    // },
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
  ],

  init: function (data) {
    if(!data || !data.menu) {
      throw new Error('Missing data properties');
    }

    Menu = data.menu;
    console.log(data.browserWindow);
    if(data.browserWindow) this.browserWindow = data.browserWindow;
    if(data.openFiles) this.openFiles = data.openFiles;
    if(data.saveFile) this.saveFile = data.saveFile;

    this.load();
  },

  openFiles: function () {
    console.error('Need to be defined');
  },

  saveFile: function () {
    console.error('Need to be defined');
  },

  load: function () {
    this.menu = Menu.buildFromTemplate(this.template);
    Menu.setApplicationMenu(this.menu);
  }

};

module.exports = MenuInstance.init.bind(MenuInstance);
