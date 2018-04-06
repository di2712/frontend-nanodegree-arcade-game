//Sets the inital score and lives and set up to be updated later
var score = 0,
    scoreIndicator = "Score: %data%",
    scoreDisplay = document.getElementById("score");
scoreDisplay.textContent = scoreIndicator.replace("%data%", score);
var lives = 5,
    livesSection = "Lives: %data%", //Lives:
    livesLeft = document.getElementById("lives");
livesLeft.textContent = livesSection.replace('%data%', lives);

// When the window loads, open the Charater Selection Section
$(window).on('load', function() {
    $('#charaterSection').modal('show');
});

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * 300);
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 600) {
        this.x = -100;
    }
};

Enemy.prototype.reset = function() {
    this.speed = Math.floor(Math.random() * 300);
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

//Triggers functions to check if hit, moved or made it to end
Player.prototype.update = function(dt) {
    this.handleInput();
    this.hitEnemyCheck();
    this.madeToWater();
};

//This function renders the charater on the screen.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Moves the charater based on arrow pressed.
Player.prototype.handleInput = function(move) {
    switch (move) {
        case 'left':
            if (this.x - 100 >= 0) {
                this.x = this.x - 100;
            }
            break;
        case 'up':
            if (this.y - 75 >= -80) {
                this.y = this.y - 80;
            }
            break;
        case 'right':
            if (this.x + 100 < 500) {
                this.x = this.x + 100;
            }
            break;
        case 'down':
            if (this.y + 75 <= 385) {
                this.y = this.y + 80;
            }
            break;
    }
};

//Checks to see if enemy hit
Player.prototype.hitEnemyCheck = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (this.x + 50 >= allEnemies[i].x &&
            this.x < allEnemies[i].x + 60 &&
            this.y + 50 >= allEnemies[i].y &&
            this.y < allEnemies[i].y + 40) {
            this.resetPlayer();
            //got hit last life message
            if (lives == 1) {
              alert("Ouch, you got hit! \n LAST Life, Be carefull!");
              lives = lives - 1;
              var updateLives = document.getElementById("lives");
              updateLives.textContent = livesSection.replace("%data%", lives);
            }
            //Got hit message not last life
            else if (lives > 0) {
                alert("Ouch, you got hit!");
                lives = lives - 1;
                var updateLives = document.getElementById("lives");
                updateLives.textContent = livesSection.replace("%data%", lives);
            //Game over message
            } else if (lives <= 0) {
              if (score <= 5) {
                alert("*** GAME OVER ***\n *** Try Again ***\n \n   You got this, lets try again");
              } else if (score <= 10) {
                alert("*** GAME OVER ***\n *** Try Again ***\n \n   Well that went beter than expected");
              }else if (score <= 20){
                alert("*** GAME OVER ***\n *** Try Again ***\n \n   Wow, impressive");
              }else {
                alert("*** GAME OVER ***\n *** Try Again ***\n \n   The Force is strong with this one");
              }
                this.resetGame();
            }
        }
    }
};

//This determins if you made it to water and adds to score
Player.prototype.madeToWater = function() {
    if (this.y <= -15) {
        this.resetPlayer();
        score = score + 1;
        if (score == 5) {
          score = score + 5;
          lives = lives + 1;
        }
        else if (score == 10){
          score = score + 10;
          lives = lives + 1;
        }
        else if (score == 20){
          score = score + 20;
          lives = lives + 1;
        }
        else if (score == 50){
        alert("*** YOU WON ***\n \n Great Job...!! Play again");
        this.resetGame();
        }
        var updateLives = document.getElementById("lives");
        updateLives.textContent = livesSection.replace("%data%", lives);
        var scoreUpdate = document.getElementById("score");
        scoreUpdate.textContent = scoreIndicator.replace("%data%", score);
    }
};

//Put Charater back to start
Player.prototype.resetPlayer = function() {
    this.x = 200;
    this.y = 385;
};

//Resets all pieces in game and gives back starting lives and
Player.prototype.resetGame = function() {
    this.resetPlayer();
    allEnemies.forEach(function(enemy) {
        enemy.reset();
        enemy.x = -300;
    });

    lives = 5;
    var livesReset = document.getElementById("lives");
    livesReset.textContent = livesSection.replace("%data%", lives);
    score = 0;
    var scoreReset = document.getElementById("score");
    scoreReset.textContent = scoreIndicator.replace("%data%", score);
    $('#charaterSection').modal('show');
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player(200, 385);
var bug1 = new Enemy(-100, 60);
var bug2 = new Enemy(-200, 60);
var bug3 = new Enemy(-200, 145);
var bug4 = new Enemy(-400, 225);
var bug5 = new Enemy(-500, 225);
var bug6 = new Enemy (-500, 145);
var allEnemies = [];
allEnemies.push(bug1, bug2, bug3, bug4, bug5, bug6);

// Get the character selectuion section
var modal = document.getElementById('charaterSection');

//looking for chosen charater then hides the charater selection area once chosen
$(document).on("click", "#boy", function() {
    player.sprite = "images/char-boy.png";
    $("#charaterSection").modal("hide");
});
$(document).on("click", "#pinkGirl", function() {
    player.sprite = "images/char-pink-girl.png";
    $("#charaterSection").modal("hide");
});
$(document).on("click", "#catGirl", function() {
    player.sprite = "images/char-cat-girl.png";
    $("#charaterSection").modal("hide");
});
$(document).on("click", "#hornGirl", function() {
    player.sprite = "images/char-horn-girl.png";
    $("#charaterSection").modal("hide");
});
$(document).on("click", "#princessGirl", function() {
    player.sprite = "images/char-princess-girl.png";
    $("#charaterSection").modal("hide");
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
