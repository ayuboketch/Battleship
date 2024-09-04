import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';

describe('Battleship Game View', () => {
  let dom;

  beforeEach(() => {
    dom = new JSDOM(`<!DOCTYPE html><body><div id="messageArea"></div><div id="00"></div></body>`);
    global.document = dom.window.document;
  });

  it('should display a message', () => {
    const view = {
      displayMessage: function(msg) {
        const messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
      }
    };

    view.displayMessage("Test Message");

    const messageArea = document.getElementById("messageArea");
    expect(messageArea.innerHTML).toBe("Test Message");
  });

  it('should display a hit', () => {
    const view = {
      displayHit: function(location) {
        const cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
      }
    };

    view.displayHit("00");

    const cell = document.getElementById("00");
    expect(cell.getAttribute("class")).toBe("hit");
  });

  it('should display a miss', () => {
    const view = {
      displayMiss: function(location) {
        const cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
      }
    };

    view.displayMiss("00");

    const cell = document.getElementById("00");
    expect(cell.getAttribute("class")).toBe("miss");
  });
});
