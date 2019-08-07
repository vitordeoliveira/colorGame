let squares = document.querySelectorAll(".square");
const squaress = document.querySelector(".squares");
const newGame = document.querySelector(".newgame");
const opt = document.querySelectorAll(".opt");
const displayMsg = document.querySelector(".display");
const colorHeader = document.querySelector("header");
const rightColor = document.querySelector(".rightColor");
const custom = document.querySelector(".custom");

//Custom
const form = document.querySelector(".form");
const input = document.querySelector(".input");
const button = document.querySelector(".button");

//Data
const colors = [];
let pickcolor;
let difficulty = 6;

//App
init();
reset();
setDifficulty();
selectCustom();

//Functions
function init() {
  packColors(difficulty);
  pickcolor = selectColor();
  rightColor.textContent = pickcolor;
  squares.forEach(square => {
    square.addEventListener("click", () => {
      const pick = square.style.backgroundColor;
      if (pickcolor == pick) {
        displayMsg.textContent = "Correct!";
        colorHeader.style.backgroundColor = pick;
        for (let index = 0; index < difficulty; index++) {
          squares[index].style.backgroundColor = pick;
        }
      } else {
        displayMsg.textContent = "Error!";
      }
    });
  });
}

function packColors(num) {
  for (let index = 0; index < num; index++) {
    colors[index] = randowColor();
    squares[index].style.backgroundColor = colors[index];
  }
}
function randowColor() {
  return "rgb(" + randowRGB() + "," + randowRGB() + "," + randowRGB() + ")";
}
function randowRGB() {
  return Math.floor(Math.random() * 256);
}
function selectColor() {
  return squares[Math.floor(Math.random() * difficulty)].style.backgroundColor;
}

function reset() {
  newGame.addEventListener("click", () => {
    //Gen new colors
    packColors(difficulty);
    //New pick
    pickcolor = selectColor();
    rightColor.textContent = pickcolor;
    displayMsg.textContent = "";
    colorHeader.style.backgroundColor = "rgb(90, 150, 220)";
  });
}

function setDifficulty() {
  for (let i = 0; i < opt.length; i++) {
    opt[i].addEventListener("click", function() {
      opt[0].classList.remove("active");
      opt[1].classList.remove("active");
      custom.classList.remove("active");
      this.classList.add("active");
      difficulty = this.textContent == "Easy" ? 3 : 6;
      createSquares(difficulty);
      init();
    });
  }
}

function selectCustom() {
  form.addEventListener("click", e => {
    e.preventDefault();
    button.addEventListener("click", e => {
      if (!checkStored()) {
        displayMsg.textContent = "more than 0";
      } else {
        displayMsg.textContent = "";
        difficulty = input.value;
        createSquares(difficulty);
        init();
        opt[0].classList.remove("active");
        opt[1].classList.remove("active");
        custom.classList.add("active");

        if (!checkStored()) {
          input.value = "";
        }
      }
    });
  });
}

function checkStored() {
  if (input.value) {
    return true;
  } else {
    return false;
  }
}

function createSquares(num) {
  squaress.innerHTML = "";
  for (let i = 0; i < num; i++) {
    squaress.innerHTML += "<div class=" + "square" + " />";
  }
  squares = document.querySelectorAll(".square");
}
