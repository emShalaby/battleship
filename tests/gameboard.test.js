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
  });
  test("ship locations should exist as empty arrays", () => {
    expect(testBoard.ships.map((ship) => ship.location)).toEqual(
      Array(testBoard.ships.length).fill([])
    );
  });
  test("set location method should correctly update a ships location and update the map", () => {
    testBoard.setLocation(
      testBoard.ships.find((ship) => ship.id == testShips[0].id),
      [[0, 0]]
    );
    expect(
      testBoard.ships.find((ship) => ship.id == testShips[0].id).location
    ).toEqual([[0, 0]]);
    expect(testBoard.map[0][0]).toBe(testShips[0].id);
  });
});
