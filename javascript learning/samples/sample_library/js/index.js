window.onload = function () {
  const container = document.getElementById("globalArea");
  const controller = new GIO.Controller(container);
  controller.addData();
  controller.init();
};
