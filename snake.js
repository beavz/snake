(function () {
  var Game = window.Game = window.Game || {};

  var Snake = Game.Snake = function () {
    this.dir = "N";
    this.segments = [new Coord(1, 27), new Coord(1, 28), new Coord(1, 29)];
  };

  Snake.DIRS = ["N", "E", "S", "W"];

  Snake.prototype.move = function() {

  }

  var Coord = Game.Coord = function(x, y) {
    this.x = x;
    this.y = y;
  }

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
  }


})();