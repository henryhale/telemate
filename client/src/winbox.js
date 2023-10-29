import "winbox/dist/css/winbox.min.css";
import "winbox";

import "../theme/hack-winbox.css";

export function createWinbox({ target, title }) {
    const win = new WinBox({
        class: ["hack"],
        title,
        icon: "logo.svg",
        top: 32,
        x: "center",
        y: "center",
        mount: target,
        root: document.querySelector("#app"),
    });

    win.removeControl("wb-full");

    return win;
}
