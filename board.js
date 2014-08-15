(function () {
  var Game = window.Game = window.Game || {};

  var Board = Game.Board = function () {
    this.snake = new Game.Snake();
    this.apples = [];
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

})();