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
    if (this.map[row][col] == "" || this.map[row][col] == "missed") {
      this.map[row][col] = "missed";
      return false;
    }
    if (this.map[row][col].endsWith("hit")) {
      return false;
    }
    this.ships.find((ship) => ship.id == this.map[row][col]).hit();
    this.map[row][col] += "hit";
  }
  function updateShip(ship) {
    this.ships.map((element) => {
      if (element.id == ship.id) return ship;
    });
  }

  return { map, ships, setLocation, recieveAttack };
}
module.exports = gameBoard;
