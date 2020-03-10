import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@material/elevation/dist/mdc.elevation.min.css";
import "material-icons/iconfont/material-icons.css";
import $ from "jquery";

const SerialPort = window.SerialPort;
const ipcRenderer = window.ipcRenderer;

setTimeout(() => {
  $("#loading-spinner").fadeIn();

  setTimeout(() => {
    $("#loading-spinner").fadeOut({
      complete: () => {
        $("#main").show();
      }
    });
  }, 2500);
}, 300);

$("#close-btn").on("click", () => {
  ipcRenderer.send("app-close");
});
