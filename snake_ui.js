(function () {
  var Game = window.Game = window.Game || {};

  var View = Game.View = function (el) {
    this.$el =  ;
    this.board = new Game.Board;
    this.paused = false;
  };

  View.KEYCODES = {
    37: "W",
    40: "S",
    38: "N",
    39: "E"
  }


  View.prototype.start = function() {

    this.$el.on("keydown", function(event){
      if(event.which === 32){
        this.paused = !this.paused;
      } else if (!this.paused){
        var dir = View.KEYCODES[event.which];
        this.board.snake.turn(dir);
      }
    }.bind(this))

    setInterval(this.step.bind(this), 1000);
  };

  View.prototype.step = function () {
    if (!this.paused) {
      this.board.snake.move();
      this.$el.html(this.board.render.bind(this.board)());
    }
  };
})()