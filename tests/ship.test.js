const ship = require("../src/ship");
test("should exist", () => {
  expect(ship).not.toBeUndefined();
});
describe("ship", () => {
  beforeEach(() => {
    testShip = ship({ length: 3 });
  });

  test("should initialize with correct values", () => {
    expect(testShip.length).toBe(3);
    expect(testShip.hitTimes).toBe(0);
    expect(testShip.status).toBe("alive");
  });
  test("should increase hit times when hit() is called", () => {
    testShip.hit();
    expect(testShip.hitTimes).toBe(1);
    testShip.hit();
    expect(testShip.hitTimes).toBe(2);
  });
  test("should check for the ships status correctly", () => {
    testShip.hit();
    testShip.hit();
    testShip.hit();
    expect(testShip.status).toBe("dead");
  });
  test("should keep alive status when hit is below length", () => {
    testShip.hit();
    expect(testShip.status).toBe("alive");
  });
});
