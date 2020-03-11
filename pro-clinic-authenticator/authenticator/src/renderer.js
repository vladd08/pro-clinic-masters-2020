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
          console.error(err);
          $("#connection-error").css("display", "block");
        }

        $("#search-loader").css("display", "none");
        $("#logo-icon").css("display", "block");
      }
    );
  }, 2000);
};

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

$("#close-btn").on("click", () => {
  ipcRenderer.send("app-close");
});

$("#try-again").on("click", () => {
  connectToDevice();
});
