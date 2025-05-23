<div align=center>

<img width="75" hieght="75" src="./client/public/logo.svg">

# TeleMate
A small-scale messaging application for devs

![](./media/screenshot.png)

</div>

## Overview

:wave: Hello World!

This project is based on the idea that two or more parties create a temporary room on the platform and communicate privately for a certain period of time. No account is required! Just choose your credentials.

## How it works?

Alice and Bob meet physically and decide on the _credentials_ to be used when creating a room and the _time_
when they will be using the plaform.

Alice may select the `Room` (_string_), say `Earth` and Bob selects the `Passcode` (_string_), say `1234`.

When the agreed time reaches, both use the same credentials on the platform to access the room.

A chat window is opened and once connected, communication may begin.

## Live Demo

Here is a _temporary_ demo of TeleMate: [Click Here](https://telemate.onrender.com)

## Features

- [x] Lightweight and fast
- [x] Multiple chat windows for different rooms
- [x] Dark/Light mode
- [x] Command line interface
- [x] No database or tracking
- [x] Encryption
- [ ] Third-party server option via URL _(work in progress)_

## Anatomy of UI

Whenever a new room is created, a chat window pops up.

The title of the chat window follows the format: `TM-{room} - [{users}]`. `room` represents the actual room identifier in uppercase and `users` show the number of users in that room.

Other users in the room are notified of who has _joined_ or _disconnected_.

To begin chatting, focus the chat window and type the message. Hit `Enter` key to send the message.

Once you're done, close the chat window to disconnect.

![](./media/chat.png)

## Development

To get started with development, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org) (>=22)
- [pnpm](https://pnpm.io/) (>=10)

### Setup

1. Fork or Clone this repository: `git clone https://github.com/henryhale/telemate.git`
2. Navigate to the project directory: `cd telemate`
3. Install dependencies: `pnpm install`
4. Run development server: `pnpm dev`
5. Building for production: `pnpm serve`
6. Now go to `http://localhost:8900`

## Browser Support

Supporting wide range of browsers is the goal. Modern browsers, most specifically the latest versions of Chrome, Firefox, Safari, and Edge (for desktop and mobile devices) are supported.

## Acknowledgements

A big shoutout to these awesome projects, this project heavily relies on them;

- [xterminal](https://github.com/henryhale/xterminal) - Build web-based command line interfaces
- [winbox](https://github.com/nextapps-de/winbox/) - Modern HTML5 window manager for the web.
- [socket.io](https://github.com/socketio/socket.io) - node.js realtime framework server
- [helmet](https://github.com/helmetjs/helmet/) - help secure Express/Connect apps with various HTTP headers
- [express](https://github.com/expressjs/express/) - Fast, unopinionated, minimalist web framework
- [toobusy-js](https://github.com/STRML/node-toobusy) - Don't fall over when your Node.JS server is too busy. Now without native dependencies!

## Conclusion

Thank you for your interest in this project!
Contributions from the developer community are greatly valued and appreciated,
and your efforts will help make this project even better.

## License

Copyright (c) 2023 [Henry Hale](https://github.com/henryhale/).

Released under the [MIT License](./LICENSE.md).
