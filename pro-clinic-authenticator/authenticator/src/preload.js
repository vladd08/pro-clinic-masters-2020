const SerialPort = require("electron").remote.require("serialport");
const { ipcRenderer } = require("electron");

const connectSignalBuffer = Buffer.from([0x43]);
const disconnectSignalBuffer = Buffer.from([0x44]);

window.SerialPort = SerialPort;
window.ipcRenderer = ipcRenderer;

window.connectSignalBuffer = connectSignalBuffer;
window.disconnectSignalBuffer = disconnectSignalBuffer;