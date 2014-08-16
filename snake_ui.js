(function () {
  var Game = window.Game = window.Game || {};

  var View = Game.View = function (el) {
    this.$el = $(el);
    this.$board = $(this.$el.children(".board").first())
    this.$scoreBoard = $(this.$el.children(".score-board"))
    this.board = new Game.Board;
    this.paused = true;
    this.interval = 300.0;
  };

  View.KEYCODES = {
    37: [1,"W"], 40: [1,"S"],
    38: [1,"N"], 39: [1,"E"],
    65: [0,"W"], 83: [0,"S"],
    87: [0,"N"], 68: [0,"E"],
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

    this.intervalID = window.setInterval(this.step.bind(this), this.interval);
  };

  View.prototype.speedUp = function () {
    this.interval *= 0.95;
    window.clearInterval(this.intervalID);
    this.intervalID = window.setInterval(this.step.bind(this), this.interval);
  }

  View.prototype.isLost = function () {
    return (this.board.isDead(0) || this.board.isDead(1));
  }

  View.prototype.step = function () {
    var board = this.board;
    var eating0 = board.snakeEatsApple(0);
    var eating1 = board.snakeEatsApple(1);

    if (!this.paused) {
      //board.snakes[0].move(eating0);
      board.snakes[1].move(eating1);
      if (eating0 || eating1) {
        this.board.placeApple();
        this.speedUp()
      }
      if (!this.isLost()) {
        this.$board.html(board.render.bind(board)());
        this.$scoreBoard.children(".game-message").html(this.board.message);
        this.$scoreBoard.children(".score0").html("GREEN: " + this.board.points[0]);
        this.$scoreBoard.children(".score1").html("BLUE: " + this.board.points[1]);
      } else {
        this.paused = true;
        this.board.message = "GAMEOVER"
        this.$scoreBoard.children(".game-message").html(this.board.message);
        window.clearInterval(this.intervalID);
      }
    }
  };

})()