const { app, BrowserWindow } = require("electron");
const path = require("path");
const { ipcMain } = require("electron");
let mainWindow;

if (require("electron-squirrel-startup")) {
  app.quit();
}

app.allowRendererProcessReuse = true;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 375,
    height: 630,
    resizable: false,
    frame: false,
    show: false,
    hasShadow: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  mainWindow.setMenuBarVisibility(false);

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
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
