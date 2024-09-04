🚀 # Battleship Game

![Battleship](https://img.shields.io/badge/Status-Development-blue) ![GitHub license](https://img.shields.io/badge/license-MIT-green)

A classic Battleship game built with JavaScript, HTML, and CSS. This project includes both single-player and multiplayer modes, allowing users to play against the computer or another player online.

## Table of Contents
  
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Testing](#testing)
  - [Project Structure](#project-structure)
  - [Technologies Used](#technologies-used)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- **Single Player Mode**: Play against an AI.
- **Multiplayer Mode**: Play against another player online using WebSockets.
- **Drag and Drop**: Easily place ships on the grid using drag and drop functionality.
- **Rotate Ships**: Rotate ships horizontally or vertically to fit them on the grid.
- **Real-time Updates**: Receive real-time updates during multiplayer matches.

## Installation

To get started with the Battleship game, clone the repository and install the dependencies.

  bash
  git clone https://github.com/ayuboketch/battleship.git
  cd battleship
  npm install or npm i

Usage

To run the game locally:

bash

  npm start

This will start a local development server, and you can play the game by navigating to http://localhost:3000 in your browser.
Multiplayer Mode

To enable multiplayer mode, you need to run a server that supports WebSockets. This project includes a basic Node.js server for that purpose.

    Start the server:

    bash

    npm run server

    Open http://localhost:3000 in two different browser windows to play against yourself or share the link with a friend.

Testing

This project uses Vitest for testing. To run the tests, use:

bash

  - npm test

This will execute the test suite and provide coverage information.
Project Structure

php

  battleship/
  ├── public/                # Static files (HTML, CSS)
  ├── src/                   # Source files
  │   ├── main.js            # Main game logic
  │   ├── main.test.js       # Tests for game logic
  ├── server/                # Node.js server for multiplayer mode
  ├── package.json           # Node.js dependencies and scripts
  └── README.md              # Project documentation

Technologies Used

    JavaScript: The core language used to develop game logic.
    HTML/CSS: For structuring and styling the game interface.
    Node.js: Backend for multiplayer mode using WebSockets.
    JSDOM: Used for testing the game logic in a simulated DOM environment.
    Vitest: A testing framework used to test the game logic.

Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any changes you'd like to make. Ensure that all tests pass and that the code adheres to the existing style and structure.
License

This project is licensed under the MIT License. See the LICENSE file for details.

css


This `README.md` file should give potential contributors and users a clear understanding of what the project is about, how to set it up, and how to contribute. Adjust the repository URL and other details according to your specific project setup.
