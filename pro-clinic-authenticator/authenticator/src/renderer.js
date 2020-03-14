"use strict";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@material/elevation/dist/mdc.elevation.min.css";
import "material-icons/iconfont/material-icons.css";
import $ from "jquery";

const SerialPort = window.SerialPort;
const ipcRenderer = window.ipcRenderer;

const portPath = "COM4";
const baudRate = 9600;
let port;

const connectToDevice = () => {
  $("#logo-icon").css("display", "none");
  $("#search-loader").css("display", "block");
  $("#connection-error").css("display", "none");

  setTimeout(() => {
    port = new SerialPort(
      portPath,
      {
        baudRate: baudRate
      },
      err => {
        if (err) {
          console.error(err.message);
          $("#connection-error").css("display", "block");
          $("#search-loader").css("display", "none");
          $("#logo-icon").css("display", "block");
          return;
        }

        sendConnectSignal();
      }
    );
  }, 2000);
};

const searchForDevice = () => {
  setTimeout(() => {
    $("#loading-spinner").fadeIn();

    setTimeout(() => {
      $("#loading-spinner").fadeOut({
        complete: () => {
          $("#main").show();
          connectToDevice();
        }
      });
    }, 2500);
  }, 300);
};

const handleAppClose = () => {
  $("#close-btn").on("click", () => {
    sendDisconnectSignal();
    setTimeout(() => {
      ipcRenderer.send("app-close");
    }, 200);
  });
};

const handleTryAgain = () => {
  $("#try-again").on("click", () => {
    connectToDevice();
  });
};

const sendConnectSignal = () => {
  setTimeout(() => {
    port.write(window.connectSignalBuffer, err => {
      if (err) {
        console.error(err.message);
        return;
      }

      console.log(`Connected to port ${portPath} with baud rate ${baudRate}`);
      $("#search-loader").css("display", "none");
      $("#logo-icon").css("display", "block");
      handlePortRead();
    });
  }, 2000);
};

const sendDisconnectSignal = () => {
  port.write(window.disconnectSignalBuffer, err => {
    if (err) {
      console.error(err.message);
      return;
    }
  });
};

const handlePortRead = () => {
  port.on("data", data => {
    $("#rfid-code").val(data.toString());
    $("#submit-btn").removeAttr("disabled");
  });
};

const startGenerateInterval = () => {
  let availablePeriodMs = 30000;
  $("#submit-btn").attr("disabled", true);

  setInterval(() => {
    if (availablePeriodMs - 10 < 0) {
      const password = Math.random()
        .toString(36)
        .substring(7)
        .toUpperCase();

      $("#password-field").html(password);
      availablePeriodMs = 30000;
    }

    availablePeriodMs -= 10;

    const percent = (availablePeriodMs * 100) / 30000;
    $("#availability-bar").width(percent + "%");
  }, 1);
};

const handleSubmit = () => {
  $("#submit-btn").on("click", () => {
    $("#password-container")
      .css("display", "flex")
      .show();
    startGenerateInterval();
  });
};

searchForDevice();
handleAppClose();
handleTryAgain();
handleSubmit();
