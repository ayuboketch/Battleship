import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import { initGame, createBoard, generate, rotate, checkForWins } from './main.js';

describe('Battleship Game Logic', () => {
  let document, window, userGrid, computerGrid, userSquares, computerSquares, width, infoDisplay;

  beforeEach(() => {
    // Set up a simulated browser environment with jsdom
    const dom = new JSDOM(`<!DOCTYPE html><html><body>
      <div class="grid-user"></div>
      <div class="grid-computer"></div>
      <div class="grid-display"></div>
      <div class="destroyer-container ship"></div>
      <div class="submarine-container ship"></div>
      <div class="cruiser-container ship"></div>
      <div class="battleship-container ship"></div>
      <div class="carrier-container ship"></div>
      <button id="start">Start Game</button>
      <button id="rotate">Rotate Ships</button>
      <div id="whose-go"></div>
      <div id="info"></div>
    </body></html>`, { url: "http://localhost" });

    window = dom.window;
    document = window.document;

    // Initialize variables
    userGrid = document.querySelector('.grid-user');
    computerGrid = document.querySelector('.grid-computer');
    userSquares = [];
    computerSquares = [];
    width = 10;
    infoDisplay = document.getElementById('info');

    // Initialize the game with the simulated document
    initGame(document, 'singlePlayer');
  });

  it('should create a 10x10 grid for both user and computer', () => {
    createBoard(userGrid, userSquares);
    createBoard(computerGrid, computerSquares);

    expect(userSquares.length).toBe(width * width);
    expect(computerSquares.length).toBe(width * width);
  });

  it('should place ships on the computer grid without overlapping', () => {
    createBoard(computerGrid, computerSquares);

    const shipArray = [
      { name: 'destroyer', directions: [[0, 1], [0, 10]] },
      { name: 'submarine', directions: [[0, 1, 2], [0, 10, 20]] },
      { name: 'cruiser', directions: [[0, 1, 2], [0, 10, 20]] },
      { name: 'battleship', directions: [[0, 1, 2, 3], [0, 10, 20, 30]] },
      { name: 'carrier', directions: [[0, 1, 2, 3, 4], [0, 10, 20, 30, 40]] },
    ];

    shipArray.forEach(ship => generate(ship, computerSquares, width));

    const placedSquares = computerSquares.filter(square => square.classList.contains('taken'));
    expect(placedSquares.length).toBeGreaterThan(0);
  });

  it('should toggle ship orientation when the rotate button is clicked', () => {
    const rotateButton = document.getElementById('rotate');
    const destroyer = document.querySelector('.destroyer-container');
    const submarine = document.querySelector('.submarine-container');

    rotateButton.addEventListener('click', rotate);

    rotateButton.click();
    expect(destroyer.classList.contains('destroyer-container-vertical')).toBe(true);
    expect(submarine.classList.contains('submarine-container-vertical')).toBe(true);

    rotateButton.click();
    expect(destroyer.classList.contains('destroyer-container-vertical')).toBe(false);
    expect(submarine.classList.contains('submarine-container-vertical')).toBe(false);
  });

  it('should announce a win when all enemy ships are sunk', () => {
    global.destroyerCount = 2;
    global.submarineCount = 3;
    global.cruiserCount = 3;
    global.battleshipCount = 4;
    global.carrierCount = 5;

    checkForWins(infoDisplay, 'computer');

    expect(infoDisplay.innerHTML).toBe('YOU WIN');
  });

  it('should announce a loss when all player ships are sunk', () => {
    global.cpuDestroyerCount = 2;
    global.cpuSubmarineCount = 3;
    global.cpuCruiserCount = 3;
    global.cpuBattleshipCount = 4;
    global.cpuCarrierCount = 5;

    checkForWins(infoDisplay, 'computer');

    expect(infoDisplay.innerHTML).toBe('COMPUTER WINS');
  });
});
