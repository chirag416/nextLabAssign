const gamePattern = [];
const userClickedPattern = [];
const buttonColors = ["red", "blue", "green", "yellow"];
let started = false;
let level = 1;

function pressAnimation(key) {
  const button = document.getElementById(key);
  button.classList.add("pressed");
  setTimeout(() => {
    button.classList.remove("pressed");
  }, 100);
}

function flashButton(key) {
  const button = document.getElementById(key);
  button.style.opacity = "0.5";
  setTimeout(() => {
    button.style.opacity = "1";
  }, 300);
}

// Start the game
function startGame() {
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  flashButton(randomChosenColor);
  document.getElementById("level-title").textContent = `Level ${level}`;
}

// Check the user's pattern
function check() {
  for (let i = 0; i < userClickedPattern.length; i++) {
    if (gamePattern[i] !== userClickedPattern[i]) {
      document.getElementById("level-title").textContent = `Game Over, Press Any Key to Restart`;
      document.body.classList.add("game-over");
      setTimeout(() => {
        document.body.classList.remove("game-over");
      }, 200);
      resetGame();
      return;
    }
  }

  if (gamePattern.length === userClickedPattern.length) {
    level++;
    userClickedPattern.length = 0;
    setTimeout(() => {
      startGame();
    }, 500);
  }
}

// Reset the game
function resetGame() {
  gamePattern.length = 0;
  userClickedPattern.length = 0;
  level = 1;
  started = false;
}

// Start game on keydown
document.addEventListener("keydown", () => {
  if (!started) {
    started = true;
    startGame();
  }
});

// Button click events
document.querySelectorAll(".btn-green, .btn-red, .btn-yellow, .btn-blue").forEach(button => {
  button.addEventListener("click", (e) => {
    if (started) {
      const chosenColor = e.target.id;
      userClickedPattern.push(chosenColor);
      flashButton(chosenColor);
      pressAnimation(chosenColor);
      check();
    }
  });
});
