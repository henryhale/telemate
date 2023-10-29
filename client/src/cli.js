import "xterminal/dist/xterminal.css";
import XTerminal from "xterminal";

import "../theme/cli.css";

export function createTerminal(target) {
    const term = new XTerminal( { target });

    term.pause();

    return term;
}
