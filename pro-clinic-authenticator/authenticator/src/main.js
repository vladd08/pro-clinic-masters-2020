const { app, BrowserWindow } = require("electron");
const { ipcMain } = require("electron");
const path = require("path");
let mainWindow;

if (require("electron-squirrel-startup")) {
  app.quit();
}

app.allowRendererProcessReuse = true;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 375,
    height: 680,
    resizable: false,
    frame: false,
    show: false,
    hasShadow: true,
    title: "Pro Clinic Authenticator",
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    },
    icon: __dirname + "/assets/icon/favicon.ico"
  });

  mainWindow.setMenuBarVisibility(false);

  mainWindow.once("ready-to-show", () => {
    setTimeout(() => {
      mainWindow.show();
    }, 1000);
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
};

app.on("ready", createWindow);

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on("app-close", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
