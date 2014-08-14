(function () {
  var Game = window.Game = window.Game || {};

  var Board = Game.Board = function () {
    this.snake = new Game.Snake();
  };

  Board.prototype.render = function () {
    var grid = [];
    for (var i = 0; i < 15; i++) {
      grid.push([]);
      for (var j = 0; j < 15; j++) {
        grid[i].push('.');
      };
    };
    var segs = this.snake.segments;

    for (var i = 0; i < segs.length; i++) {
      grid[segs[i].y][segs[i].x] = "S";
    };
    console.log(JSON.stringify(grid));
  };

})();