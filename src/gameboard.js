function gameBoard(ships, cols = 10, rows = 10) {
  let map = Array.from({ length: rows }, () => Array(cols).fill(""));
  this.ships.map((ship) => {
    ship.location = [];
    return ship;
  });
  function setLocation(ship, locations) {
    for (let i = 0; i < locations.length; i++) {
      if (this.map[locations[i][0]][locations[i][1]] != "") return false;
    }
    for (let i = 0; i < locations.length; i++) {
      ship.location = [];
      ship.location.push(locations[i]);
      this.map[locations[i][0]][locations[i][1]] = ship.id;
    }
    updateShip(ship);
    return ship;
  }
  function recieveAttack([row, col]) {
    if (
      this.ships.find((ship) => {
        ship.locations.includes([row, col]);
      })
    ) {
      this.ships.find((ship) => ship.locations.includes([row, col])).hit();
      this.map[row][col] = "hit";
    } else this.map[row][col] = "missed";
  }
  function updateShip(ship) {
    this.ships.map((element) => {
      if (element.id == ship.id) return ship;
    });
  }

  function getLocation(ship) {
    return this.ships.find((element) => {});
  }
  return { map, ships, setLocation };
}
module.exports = gameBoard;
