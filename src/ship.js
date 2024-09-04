const { v4 } = require("uuid");
function ship({ length, hitTimes = 0, status = "alive" }) {
  const id = v4();
  function hit() {
    this.hitTimes += 1;
    this.isSunk();
  }
  function isSunk() {
    if (this.hitTimes >= this.length) this.status = "dead";
    else this.status = "alive";
  }
  return { length, hitTimes, status, hit, isSunk, id };
}
module.exports = ship;
