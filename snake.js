(function () {
  var Game = window.Game = window.Game || {};

  var Snake = Game.Snake = function () {
    this.dir = "N";
    this.segments = [new Coord(1, 5), new Coord(1, 6), new Coord(1, 7)];
  };

  Snake.DIRS = ["N", "E", "S", "W"];

  Snake.prototype.move = function() {
    this.segments.pop();
    this.segments.unshift(this.segments[0].plus(this.dir));
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

  Snake.prototype.hitsSelf = function () {
    var head = this.segments[0];
    for (var i = 1; i < this.segments.length; i++) {
      var seg = this.segments[i];
      if (seg.x === head.x && seg.y === head.y) {
        return true;
      }
    };
    return false;
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