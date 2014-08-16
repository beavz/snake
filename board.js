(function () {
  var Game = window.Game = window.Game || {};

  var Board = Game.Board = function () {
    this.snakes = [new Game.Snake(15), new Game.Snake(35)];
    this.placeApple();
  };

  Board.size = 50;

  Board.prototype.buildClassGrid = function () {
    var grid = [];
    for (var i = 0; i < Board.size; i++) {
      grid.push([]);
      for (var j = 0; j < Board.size; j++) {
        grid[i].push('');
      };
    };

    for (var i = 0; i < 2; i++) {
      var snake = this.snakes[i].segments;
      for (var j = 0; j < snake.length; j++) {
        grid[snake[j].y][snake[j].x] = "class='snake" + i + "'";
      };
    };

    grid[this.apple.y][this.apple.x] = "class='apple'";

    return grid;
  };

  Board.prototype.render = function () {
    var grid = this.buildClassGrid();
    var gridHtml = "";

    for (var y = 0; y < Board.size; y++) {
      for (var x = 0; x < Board.size; x++) {
        gridHtml += ("<li " + grid[y][x] + "></li>" );
      };
    };

    return gridHtml;
  };


  Board.prototype.placeApple = function () {
    var disallowed = true;
    var segs = this.snakes[0].segments.concat(this.snakes[1].segments);

    while (disallowed) {
      var apple = new Game.Coord(
        Math.floor(Math.random() * Board.size),
        Math.floor(Math.random() * Board.size)
      )
      disallowed = false;
      for (var i = 0; i < segs.length; i++) {
        if (segs[i].x === apple.x && segs[i].y === apple.y){
          disallowed = true;
        }
      };
    };

    this.apple = apple;
  };

  Board.prototype.snakeEatsApple = function (snakeNum) {
    var head = this.snakes[snakeNum].segments[0];
    return (head.x === this.apple.x && head.y === this.apple.y)
  }

  Board.prototype.snakeHitsWall = function (snakeNum) {
    var head = this.snakes[snakeNum].segments[0];
    return (head.x >= Board.size || head.x < 0 ||
      head.y >= Board.size || head.y < 0)
  }

  Board.prototype.snakeHitsSnake = function (snakeNum) {
    var head = this.snakes[snakeNum].segments[0];
    var otherNum = (snakeNum === 0 ? 1 : 0);
    var segs = this.snakes[snakeNum].segments.slice(1).concat(
      this.snakes[otherNum].segments);

    for (var i = 0; i < segs.length; i++) {
      if (head.y == segs[i].y && head.x === segs[i].x){
        return true;
      }
    };
    return false;
  }

  Board.prototype.isDead = function (snakeNum){
    return this.snakeHitsWall(snakeNum) || this.snakeHitsSnake(snakeNum);
  }

})();