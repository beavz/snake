(function () {
  var Game = window.Game = window.Game || {};

  var Snake = Game.Snake = function (x) {
    this.dir = "N";
    this.segments = [new Coord(x, 22), new Coord(x, 23), new Coord(x, 24)];
  };

  Snake.DIRS = ["N", "E", "S", "W"];

  Snake.prototype.move = function(eatsApple) {
    this.segments.unshift(this.segments[0].plus(this.dir));
    if (!eatsApple) {
      this.segments.pop();
    }
  }

  Snake.prototype.turn = function(newDir) {
    if ((this.dir === "N" || this.dir === "S") &&
        (newDir === "E"   || newDir === "W" )) {
      this.dir = newDir;
    } else if ((this.dir === "W" || this.dir === "E") &&
               (newDir === "S"   || newDir === "N" )) {
      this.dir = newDir;
    }
  };

  var Coord = Game.Coord = function(x, y) {
    this.x = x;
    this.y = y;
  };

  Coord.prototype.plus = function(dir) {
    switch(dir) {
    case "N":
      return new Coord(this.x, this.y - 1);
      break;
    case "S":
      return new Coord(this.x, this.y + 1);
      break;
    case "E":
      return new Coord(this.x + 1, this.y);
      break;
    case "W":
      return new Coord(this.x - 1, this.y);
      break;
    }
  };


})();