const { uuid } = require("uuidv4");
function ship({ length, hitTimes = 0, status = "alive" }) {
  const id = uuid();
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
