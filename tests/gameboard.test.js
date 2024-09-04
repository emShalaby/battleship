const gameBoard = require("../src/gameboard");
const ship = require("../src/ship");
test("should exist", () => {
  expect(gameBoard).not.toBeUndefined();
});
describe("gameBoard", () => {
  beforeEach(() => {
    ship1 = ship({ length: 1 });
    ship2 = ship({ length: 2 });
    ship3 = ship({ length: 3 });
    testShips = [ship1, ship2, ship3];
    testBoard = gameBoard((ships = [ship1, ship2, ship3]));
  });
  test("game board should initialize correctly", () => {
    expect(testBoard.map).toEqual([
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
    ]);
    expect(testBoard.ships.map((ship) => ship.location)).toEqual(
      Array(testBoard.ships.length).fill([])
    );
    expect(testBoard.status).toBe("alive");
  });

  test("set location method should correctly update a ships location and update the map", () => {
    testBoard.setLocation(
      testBoard.ships.find((ship) => ship.id == ship1.id),
      [[0, 0]]
    );
    testBoard.setLocation(
      testBoard.ships.find((ship) => ship.id == ship2.id),
      [
        [0, 1],
        [0, 2],
      ]
    );
    testBoard.setLocation(
      testBoard.ships.find((ship) => ship.id == ship3.id),
      [
        [0, 3],
        [0, 4],
        [0, 5],
      ]
    );
    expect(
      testBoard.ships.find((ship) => ship.id == ship1.id).location
    ).toEqual([[0, 0]]);
    expect(testBoard.map[0][0]).toBe(ship1.id);
  });

  describe("hit detection", () => {
    beforeEach(() => {
      testBoard.setLocation(
        testBoard.ships.find((ship) => ship.id == ship1.id),
        [[0, 0]]
      );
      testBoard.setLocation(
        testBoard.ships.find((ship) => ship.id == ship2.id),
        [
          [0, 1],
          [0, 2],
        ]
      );
      testBoard.setLocation(
        testBoard.ships.find((ship) => ship.id == ship3.id),
        [
          [0, 3],
          [0, 4],
          [0, 5],
        ]
      );
    });
    test("game board should recieve a missed attack correctly and update map", () => {
      testBoard.recieveAttack([1, 1]);
      expect(testBoard.map[1][1]).toBe("missed");
    });
    test("game board should update correctly when a ship is hit", () => {
      expect(testBoard.map[0][0]).toBe(testBoard.ships[0].id);
      testBoard.recieveAttack([0, 0]);

      expect(testBoard.map[0][0]).toBe(testBoard.ships[0].id + "hit");
    });
    test("a ship should increase its hits when a recieved attack lands on a ship", () => {
      testBoard.recieveAttack([0, 0]);
      expect(testBoard.ships.find((ship) => ship.id == ship1.id).hitTimes).toBe(
        1
      );
    });
    test("recieved attack should trigger a status change when hittimes is equal to length", () => {
      testBoard.recieveAttack([0, 0]);
      expect(testBoard.ships.find((ship) => ship.id == ship1.id).status).toBe(
        "dead"
      );
    });
    test("gameboard status should be dead after last ship is sunk", () => {
      testBoard.recieveAttack([0, 0]);
      expect(testBoard.map[0][0]).toBe(testBoard.ships[0].id + "hit");
      expect(testBoard.status).toBe("alive");
      testBoard.recieveAttack([0, 1]);
      expect(testBoard.map[0][1]).toBe(testBoard.ships[1].id + "hit");

      testBoard.recieveAttack([0, 2]);
      expect(testBoard.map[0][2]).toBe(testBoard.ships[1].id + "hit");

      expect(testBoard.status).toBe("alive");
      testBoard.recieveAttack([0, 3]);
      expect(testBoard.map[0][3]).toBe(testBoard.ships[2].id + "hit");
      expect(testBoard.status).toBe("alive");
      testBoard.recieveAttack([0, 4]);
      expect(testBoard.map[0][4]).toBe(testBoard.ships[2].id + "hit");
      expect(testBoard.status).toBe("alive");
      testBoard.recieveAttack([0, 5]);
      expect(testBoard.map[0][5]).toBe(testBoard.ships[2].id + "hit");

      expect(testBoard.ships[0].status).toBe("dead");
      expect(testBoard.ships[1].status).toBe("dead");
      expect(testBoard.ships[2].status).toBe("dead");
      expect(testBoard.ships.every((ship) => ship.status == "dead")).toBe(true);
      expect(testBoard.status).toBe("dead");
    });
  });
});
