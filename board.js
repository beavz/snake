(function () {
  var Game = window.Game = window.Game || {};

  var Board = Game.Board = function () {
    this.snakes = [new Game.Snake(15), new Game.Snake(35)];
    this.placeApple();
    this.points= [0,0];
    this.message = "";
  };

  Board.size = 50;

  // Board.prototype.buildClassGrid = function () {
  //   var grid = [];
  //   for (var i = 0; i < Board.size; i++) {
  //     grid.push([]);
  //     for (var j = 0; j < Board.size; j++) {
  //       grid[i].push('');
  //     };
  //   };
  //
  //   for (var i = 0; i < 2; i++) {
  //     var snake = this.snakes[i].segments;
  //     for (var j = 0; j < snake.length; j++) {
  //       grid[snake[j].y][snake[j].x] = "snake" + i;
  //     };
  //   };
  //
  //   grid[this.apple.y][this.apple.x] = "apple";
  //
  //   return grid;
  // };
  //
  // Board.prototype.render = function () {
  //   var grid = this.buildClassGrid();
  //   var gridHtml = "";
  //
  //   for (var y = 0; y < Board.size; y++) {
  //     for (var x = 0; x < Board.size; x++) {
  //       gridHtml += ("<li class ='" + grid[y][x] + " grid'></li>" );
  //     };
  //   };
  //
  //   return gridHtml;
  // };

  Board.prototype.render = function () {
      var html = "";

      for (var i = 0; i < 2; i++) {
        var snake = this.snakes[i].segments;
        for (var j = 0; j < snake.length; j++) {
          html += "<li class='snake"+i+"' style='position: absolute; left: "+(snake[j].x * 10)+"px; top: "+(snake[j].y *10)+"px;'></li>";
        };
      };

      html += "<li class='apple' style='position: absolute; left: "+(this.apple.x * 10)+"px; top: "+(this.apple.y * 10)+"px;'></li>";

      return html;
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
    var bool = (head.x === this.apple.x && head.y === this.apple.y);
    if (bool) {
      this.points[snakeNum] += 1;
    }
    return bool;
  }

  Board.prototype.snakeHitsWall = function (snakeNum) {
    var head = this.snakes[snakeNum].segments[0];
    return (head.x >= Board.size || head.x < 0 ||
      head.y >= Board.size || head.y < 0)
  }

  Board.prototype.snakeHitsSnake = function (snakeNum) {
    var head = this.snakes[snakeNum].segments[0];
    var otherNum = (snakeNum === 0 ? 1 : 0);
    var segs = this.snakes[snakeNum].segments.slice(1, this).concat(
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