(function () {
  var Game = window.Game = window.Game || {};

  var View = Game.View = function (el) {
    this.$el = $(el);
    this.board = new Game.Board;
  };

  View.KEYCODES = {
    37: "W",
    40: "S",
    38: "N",
    39: "E"
  }

  View.prototype.start = function() {

    $(
      this.$el.on("keydown", function(event){
        var dir = View.KEYCODES[event.which];

        view.game.board.snake.turn(dir);
      })
    )

    setInterval(this.step.bind(this), 1000);
  }

  View.prototype.step = function () {
    this.board.snake.move();
    this.board.render();
  }
})()