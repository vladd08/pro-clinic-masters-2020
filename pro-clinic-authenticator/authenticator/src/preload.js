const SerialPort = require("electron").remote.require("serialport");
const { ipcRenderer } = require("electron");

window.SerialPort = SerialPort;
window.ipcRenderer = ipcRenderer;
