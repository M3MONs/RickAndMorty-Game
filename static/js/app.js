import API from "./api.js";
import Character from "./character.js";
import * as say from "./combatsystem.js";
const api = new API();

let currentCaracter = 1;
let enemyCharacterId;
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
		Stats(currentCaracter);
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
		Stats(currentCaracter);
	}
});

function createEnemy() {
	enemyCharacterId = Math.floor(Math.random() * 100) + 50;
	initApp(enemyCharacterId);
	Stats(enemyCharacterId);
}
//Load Enemy card and game
$loadGame.addEventListener("click", async () => {
	//create enemy card
	createEnemy();
	var editCard = document.querySelectorAll(".flip-card-container");
	editCard.forEach((card) => {
		card.classList.add("flip-card-container-fight");
  });
  
	const displayFight = document.querySelectorAll(".fight-display");
  displayFight.forEach(element => {
    element.classList.remove("d-none");
  });

  const undisplayFight = document.querySelectorAll(".not-fight-display");
  undisplayFight.forEach(element => {
    element.classList.add("d-none");
  });
});

//create first main Character card
async function initApp(initCharacterId) {
	const characterData = await api.getCharacter(initCharacterId);
	console.log(characterData);
	new Character(characterData);
	Stats(currentCaracter);
}

initApp(currentCaracter);
