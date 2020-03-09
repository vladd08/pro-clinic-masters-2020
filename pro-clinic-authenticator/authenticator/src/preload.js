const _SerialPort = require("electron").remote.require("serialport");

window.SerialPort = _SerialPort;
