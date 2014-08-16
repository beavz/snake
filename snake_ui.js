(function () {
  var Game = window.Game = window.Game || {};

  var View = Game.View = function (el) {
    this.$el = $(el);
    this.$board = $(this.$el.children(".group").first())
    this.board = new Game.Board;
    this.paused = false;
    this.points0 = 0;
    this.points1 = 0;
  };

  View.KEYCODES = {
    37: [0,"W"], 40: [0,"S"],
    38: [0,"N"], 39: [0,"E"],
    65: [1,"W"], 83: [1,"S"],
    87: [1,"N"], 68: [1,"E"],
  }


  View.prototype.start = function() {

    this.$el.on("keydown", function(event){
      if(event.which === 32){
        this.paused = !this.paused;
      } else if (!this.paused){
        var keyData = View.KEYCODES[event.which];
        this.board.snakes[keyData[0]].turn(keyData[1]);
      }
    }.bind(this))

    setInterval(this.step.bind(this), 150);
  };

  View.prototype.isLost = function () {
    return (this.board.isDead(0) || this.board.isDead(1));
  }

  View.prototype.step = function () {
    var board = this.board;
    var eating0 = board.snakeEatsApple(0);
    var eating1 = board.snakeEatsApple(1);

    if (!this.paused) {
      board.snakes[0].move(eating0);
      board.snakes[1].move(eating1);
      if (eating0 || eating1) {
        this.board.placeApple();
      }
      if (!this.isLost()) {
        this.$board.html(board.render.bind(board)());
      } else {
        this.paused = true;
      }
    }
  };

})()