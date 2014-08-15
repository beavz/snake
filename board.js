(function () {
  var Game = window.Game = window.Game || {};

  var Board = Game.Board = function () {
    this.snake = new Game.Snake();
    this.apple = new Game.Coord(4,10);
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
    var segs = this.snake.segments;

    for (var i = 0; i < segs.length; i++) {
      grid[segs[i].y][segs[i].x] = "class='snake'";
    };

    for (var i = 0; i < this.apples.length; i++){
      grid[this.apples[i].y][this.apples[i].x] = "class='apple'";
    }
    return grid;
  };

  Board.prototype.placeApple = function () {
    var disallowed = true;
    var segs = this.snake.segments;

    while (disallowed) {
      var apple = new Game.Coord(
        Math.floor(Math.random * Board.size),
        Math.floor(Math.random * Board.size)
      )
      disallowed = false;
      for (var i = 0; i < segs.length; i++) {
        if (segs[i].x === apple.x && segs[i].y === apple.y){
          disallowed = true;
        }
      };
    };

    this.apples.push(apple);
  };

  Board.prototype.render = function () {
    var grid = this.buildClassGrid();
    var gridHtml = "<ul class='group'>";

    for (var y = 0; y < Board.size; y++) {
      for (var x = 0; x < Board.size; x++) {
        gridHtml += ("<li " + grid[y][x] + "></li>" );
      };
    };

    gridHtml += "</ul>"
    return gridHtml;
  };

  Board.prototype.snakeHitsWall = function () {
    var head = this.snake.segments[0];
    return (head.x >= Board.size || head.x < 0 ||
      head.y >= Board.size || head.y < 0)
  }

  Board.prototype.snakeEatsApple = function () {

  }

})();