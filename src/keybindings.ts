import { App } from "./app";

export const activateKeyBindings = () => {
  window.addEventListener("keypress", (k) => {
    if (k.code === "KeyO" && k.ctrlKey === true && k.shiftKey === true) {
      App.toggle?.setStyle("opacity", "0.5");
    }
  });

  window.addEventListener("keyup", (k) => {
    if (k.code === "KeyO") {
      App.toggle?.setStyle("opacity", "1.0");
    }
  });

  window.addEventListener("keydown", (k) => {
    if (k.code === "Space" && k.ctrlKey === true) {
      App.toggle?.openOrClose();
    }

    if (k.code === "KeyF" && k.ctrlKey === true && k.shiftKey === true) {
      App.TM?.files.togglePages();
    }

    if (k.code === "KeyT" && k.ctrlKey === true && k.shiftKey === true) {
      App.TM?.tabs.togglePages();
    }
  });
};
