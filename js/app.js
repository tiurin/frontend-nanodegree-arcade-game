var CELL_X = 101;
var CELL_Y = 83;
var ENEMY_OFFSET_Y = 63; // serves to draw enemies aligned to the stones

var Util = {
  /** 
  Returns a random integer between min (included) and max (included). 
  */
  getRandomIntInclusive: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};

/** 
Enemies our player must avoid. 
@constructor
*/
var Enemy = function () {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.init();
};

/** 
Places an enemy before the leftmost cell at random road track 
and sets random speed.
*/
Enemy.prototype.init = function () {
  this.x = -CELL_X;
  this.y = ENEMY_OFFSET_Y + Util.getRandomIntInclusive(0, 2) * CELL_Y;
  this.speed = Util.getRandomIntInclusive(75, 375);
};

/** 
Update the enemy's position, required method for game.
Moves enemy to the right taking into account its speed
until it passes right edge of playing field. When right edge is passed 

@see {@link init}
@param {number} dt - a time delta between ticks, i.e. duration of a game rendering loop
*/
Enemy.prototype.update = function (dt) {
  if (this.x > 5 * CELL_X) {
    this.init();
  }
  var step = this.speed * dt;
  this.x += Math.round(step);
};

/** 
Draw the enemy on the screen.
*/
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
Main character of the game whom a player controls.
@constructor
*/
var Player = function () {
  this.sprite = 'images/char-boy.png';
  this.init();
};


/**
Places a player at random bottom grass field
at the beginning of the game and after win or loss.
*/
Player.prototype.init = function () {
  this.x = Util.getRandomIntInclusive(0, 4) * CELL_X;
  this.y = 5 * CELL_Y;
};

/**
Analyses player's position for game events: win or collision with one of enemies.

@param {Enemy[]} enemies - an array of enemies that are present on the game field.
@returns {number} 2 in case of win event, 1 in case of collision and 0 if nothing special happened.
*/
Player.prototype.update = function (enemies) {
  if (this.y === 0) { // win event
    this.init();
    return 2;
  }
  var that = this;
  var result = 0;
  enemies.forEach(function (enemy) {
    var distanceX = Math.abs(that.x - enemy.x);
    var distanceY = Math.abs(that.y - enemy.y);

    if (distanceX < CELL_X - 20 && distanceY < ENEMY_OFFSET_Y) { 
      // collision event,
      // 20px are deducted as hero and enemy doesn't occupy all pixels of their respective images
      that.init();
      result = 1;
    }
  });
  return result;
};

/**
Draw player's character on the screen.
*/
Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
Updates player's position based on input direction.

@param {string} direction - could be one of ['left', 'right', 'up', 'down'
*/
Player.prototype.handleInput = function (direction) {
  if (direction === 'left' && this.x > 0) {
    this.x -= CELL_X;
  } else if (direction === 'right' && this.x < 4 * CELL_X) {
    this.x += CELL_X;
  } else if (direction === 'up' && this.y > 0) {
    this.y -= CELL_Y;
  } else if (direction === 'down' && this.y < 5 * CELL_Y) {
    this.y += CELL_Y;
  }
};

//Listens for key presses and invokes updating player's position correspondingly.
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];

// Place the player object in a variable called player
var player = new Player();