import { describe, it, expect, beforeEach } from 'vitest';

describe('Battleship Game Model', () => {
  let model;

  beforeEach(() => {
    model = {
      boardSize: 7,
      numShips: 3,
      shipLength: 3,
      shipsSunk: 0,
      ships: [
        { locations: [0, 0, 0], hits: ["", "", ""] },
        { locations: [0, 0, 0], hits: ["", "", ""] },
        { locations: [0, 0, 0], hits: ["", "", ""] }
      ],
      fire: function(guess) {
        for (let i = 0; i < this.numShips; i++) {
          const ship = this.ships[i];
          const index = ship.locations.indexOf(guess);
          if (ship.hits[index] === "hit") {
            return true;
          } else if (index >= 0) {
            ship.hits[index] = "hit";
            if (this.isSunk(ship)) {
              this.shipsSunk++;
            }
            return true;
          }
        }
        return false;
      },
      isSunk: function(ship) {
        for (let i = 0; i < this.shipLength; i++) {
          if (ship.hits[i] !== "hit") {
            return false;
          }
        }
        return true;
      },
      generateShipLocations: function() {
        for (let i = 0; i < this.numShips; i++) {
          let newShipLocations;
          do {
            newShipLocations = this.generateShip();
          } while (this.collision(newShipLocations));
          this.ships[i].locations = newShipLocations;
        }
      },
      generateShip: function() {
        const direction = Math.floor(Math.random() * 2);
        const row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
        const col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));

        const newShipLocations = [];
        for (let i = 0; i < this.shipLength; i++) {
          if (direction === 1) {
            newShipLocations.push(row + "" + (col + i));
          } else {
            newShipLocations.push((row + i) + "" + col);
          }
        }
        return newShipLocations;
      },
      collision: function(locations) {
        for (let i = 0; i < this.numShips; i++) {
          const ship = this.ships[i];
          for (let j = 0; j < locations.length; j++) {
            if (ship.locations.indexOf(locations[j]) >= 0) {
              return true;
            }
          }
        }
        return false;
      }
    };
  });

  it('should generate ship locations without collisions', () => {
    model.generateShipLocations();

    const allLocations = model.ships.flatMap(ship => ship.locations);
    const uniqueLocations = new Set(allLocations);

    expect(uniqueLocations.size).toBe(allLocations.length);
  });

  it('should detect collisions when generating ship locations', () => {
    model.ships[0].locations = ['00', '01', '02'];
    const collision = model.collision(['00', '11', '22']);
    expect(collision).toBe(true);
  });

  it('should record a hit on a ship', () => {
    model.ships[0].locations = ['00', '01', '02'];
    const hit = model.fire('01');
    expect(hit).toBe(true);
    expect(model.ships[0].hits[1]).toBe('hit');
  });

  it('should not allow hitting the same spot twice', () => {
    model.ships[0].locations = ['00', '01', '02'];
    model.fire('01');
    const hitAgain = model.fire('01');
    expect(hitAgain).toBe(true);  // Should still return true, but not count as a new hit
  });

  it('should record a miss', () => {
    const miss = model.fire('66');
    expect(miss).toBe(false);
  });

  it('should detect a sunk ship', () => {
    model.ships[0].locations = ['00', '01', '02'];
    model.fire('00');
    model.fire('01');
    model.fire('02');
    expect(model.isSunk(model.ships[0])).toBe(true);
  });
});
