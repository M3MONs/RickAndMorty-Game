import API from "./api.js";
import Character from "./character.js";
const api = new API();

let currentCaracter = 1;
const $loadNext = document.querySelector("#load-next");
const $loadPrevious = document.querySelector("#load-previous");
const $loadGame = document.querySelector("#load-game");

//Next Character
$loadNext.addEventListener("click", async () => {
  if (currentCaracter <= 5) {
    if (currentCaracter === 5) {
      currentCaracter = 0;
    }
    var characterData = await api.getCharacter(++currentCaracter);
    new Character(characterData);
  }
});

//Prevoius Character
$loadPrevious.addEventListener("click", async () => {
  if (currentCaracter > 0) {
    //loop for card set next card id=1 if we click next on card id=5
    if (currentCaracter === 1) {
      currentCaracter = 6;
    }
    var characterData = await api.getCharacter(--currentCaracter);
    new Character(characterData);
  }
});

//Load Enemy card and game
$loadGame.addEventListener("click", async () => {
  //create enemy card
  var enemyCharacterId = Math.floor(Math.random() * 100) + 101;
  initApp(enemyCharacterId);
  var enemyCharacterCard = document.querySelector(
    "#enemy-character-card-container"
  );
  enemyCharacterCard.classList.remove("d-none");

  //delete elements
  var playButton = document.querySelector("#load-game");
  playButton.classList.add("d-none");
  var scrollButtons = document.querySelector("#load-previous");
  scrollButtons.classList.add("d-none");
  var scrollButtons1 = document.querySelector("#load-next");
  scrollButtons1.classList.add("d-none");
});


//create first main Character card
async function initApp(initCharacterId) {
  const characterData = await api.getCharacter(initCharacterId);
  console.log(characterData);
  new Character(characterData);
}

initApp(currentCaracter);



//stats

// health:100
//atack :10
//defence :5