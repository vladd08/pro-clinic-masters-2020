const { app, BrowserWindow } = require("electron");
const path = require("path");
let mainWindow;

if (require("electron-squirrel-startup")) {
  app.quit();
}

app.allowRendererProcessReuse = true;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  mainWindow.isMenuBarVisible(false);

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.webContents.openDevTools();
};
app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
