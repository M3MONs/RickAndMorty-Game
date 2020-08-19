import API from "./api.js";
const api = new API();

//assigning variables to elements in index.html
let charImage = document.querySelector("#img-card");
let charName = document.querySelector("#card-name");
let charHp = document.querySelector("#hp");
let charAtack = document.querySelector("#atack");
let charDefence = document.querySelector("#defence");
let charGold = document.querySelector("#gold");
let charLvl = document.querySelector("#lvl");

let enemyImage = document.querySelector("#enemy-img");
let enemyName = document.querySelector("#enemy-name");
let enemyHp = document.querySelector("#enemy-hp");
let enemyAtack = document.querySelector("#enemy-atack");
let enemyDefence = document.querySelector("#enemy-defence");

//characters stats
var RickSanchez = {
	id: 1,
	hp: 100,
	atack: 25,
	defence: 20,
	potion: 0,
};

var MortySmith = {
	id: 2,
	hp: 80,
	atack: 20,
	defence: 20,
	potion: 2,
};

var JerrySmith = {
	id: 5,
	hp: 70,
	atack: 12,
	defence: 15,
	potion: 4,
};

//player object
let player = {
	stats: {},
	gold: 0,
	lvl: 0,
	exp: 50,
	timePotion: 3,
	//set stats based on player.hp and player.lvl
	setStats() {
		totalHealth = this.stats.hp + this.lvl * 15;
		totalDamage = this.stats.atack + this.lvl * 10;
		totalDefence = this.stats.defence + this.lvl * 10;
		startHealth = this.stats.hp + this.lvl * 15;
		console.log(totalHealth);
	},
	//player atack algorithm
	atack() {
		this.gold += 3;
		enemy.hp -= Math.floor((totalDamage - enemy.defence * 0.45) * 0.85);
		renderCharacter(enemy.id);
		if (this.timePotion < 3) {
			this.timePotion += 1;
		}
	},
	//player defence algorithm
	defence() {
		this.gold += 3;
		totalHealth -= Math.floor((enemy.atack - totalDefence * 0.4) * 0.45);
		renderCharacter(this.stats.id);
		if (this.timePotion < 3) {
			this.timePotion += 1;
		}
	},
	render() {
		renderCharacter(this.stats.id);
	},
	//add exp and gold after win
	win() {
		this.exp += 50;
		this.gold += 25;
	},
	//checks experience and update levels
	checkExp() {
		if (player.exp >= expLvl[player.lvl + 1]) {
			player.lvl += 1;
		}
	},
	//potion system
	potion() {
		if (this.gold >= 50 && totalHealth < startHealth - 25 && this.timePotion === 3) {
			this.gold -= 50;
			totalHealth += 25;
			console.log(totalHealth);
			renderCharacter(player.stats.id);
			this.timePotion = 0;
		} else if (this.stats.potion > 0 && this.timePotion === 3) {
			totalHealth += 25;
			renderCharacter(player.stats.id);
			this.stats.potion -= 1;
			this.timePotion = 0;
		}
	},
};

const expLvl = {
	1: 150,
	2: 400,
	3: 800,
	4: 1300,
};
// Array with characters
var charactersList = [RickSanchez, MortySmith, JerrySmith];
var startIndex = 0;

// set player.stats to first character in array characterList
player.stats = charactersList[startIndex];

// variable
let totalHealth;
let totalDamage;
let totalDefence;
let startHealth;

// generate stats based on lvl and character stats
player.setStats();
//generate character in html
player.render();

//create enemy
let enemy = {
	id: 105,
	hp: 100,
	atack: 0,
	defence: 0,
	potion: 2,
	generateStats() {
		this.hp = Math.floor(Math.random() * 15 - 7 + player.stats.hp + 30 * player.lvl);
		this.atack = Math.floor(Math.random() * 9 - 4 + player.stats.atack + 20 * player.lvl);
		this.defence = Math.floor(Math.random() * 9 - 4 + player.stats.defence + 15 * player.lvl);
	},
	// change id enemy +=1
	next() {
		this.id += 1;
	},
	// render enemy in html
	render() {
		renderCharacter(this.id);
	},
	// enemy move against player
	move() {
		var rand = Math.floor(Math.random() * 6);
		if (rand >= 1) {
			totalHealth -= Math.floor((totalDamage - enemy.defence * 0.4) * 0.7);
		} else {
			this.hp += 15;
		}
		renderCharacter(player.stats.id);
	},
};

// get data from api and render character player or enemy in html
async function renderCharacter(id) {
	var character = await api.getData(id);
	if (id <= 5) {
		charImage.src = character.image;
		charName.textContent = character.name;
		charHp.textContent = totalHealth;
		charAtack.textContent = totalDamage;
		charDefence.textContent = totalDefence;
		charGold.textContent = player.gold;
		charLvl.textContent = player.lvl;
	} else {
		enemyImage.src = character.image;
		enemyName.textContent = character.name;
		enemyHp.textContent = enemy.hp;
		enemyAtack.textContent = enemy.atack;
		enemyDefence.textContent = enemy.defence;
	}
}

function checkWin() {
	// if player have 4 lvl the game ends
	if (player.lvl === 4) {
		document.querySelector(
			"#game"
		).innerHTML = `<h1 class="display-1 d-block m-auto text-center">You Win!</h1>`;
	}
	// checks the opponent's hp, if it is less than 0, it calls functions inside
	else if (enemy.hp <= 0) {
		player.checkExp();
		player.win();
		player.setStats();
		enemy.next();
		enemy.generateStats();
		renderCharacter(player.stats.id);
		renderCharacter(enemy.id);
	}
	// if the player has 0 hp or less, he shows the message of losing the game
	else if (totalHealth <= 0) {
		document.querySelector(
			"#game"
		).innerHTML = `<h1 class="display-1 d-block m-auto text-center">You Lose</h1>`;
	}
}

// the button loads the statistics and pictures of the next possible character to the last one
document.querySelector("#next-char").onclick = function () {
	if (startIndex < 2) {
		startIndex += 1;
		player.stats = charactersList[startIndex];
		renderCharacter(player.stats.id);
		player.setStats();
	}
};
// the button loads the stats and a photo of the previous possible character to the first
document.querySelector("#previous-char").onclick = function () {
	if (startIndex > 0) {
		startIndex -= 1;
		player.stats = charactersList[startIndex];
		renderCharacter(player.stats.id);
		player.setStats();
	}
};

// the button starts the game with the selected character and shows the generated opponent on the page
document.querySelector("#play-btn").onclick = function () {
	document.querySelector("#select-character").classList.add("d-none");
	this.classList.add("d-none");
	enemy.generateStats();
	enemy.render();
	document.querySelector("#enemy-card").classList.remove("d-none");
	document.querySelector("#vs-container").classList.remove("d-none");
	document.querySelector("#other-stat").classList.remove("d-none");
	document.querySelector("#action-btns").classList.remove("d-none");
};
// atack button
document.querySelector("#atack-btn").onclick = function () {
	player.atack();
	enemy.move();
	checkWin();
};
// defence button
document.querySelector("#defence-btn").onclick = function () {
	player.defence();
	checkWin();
};
// potion button
document.querySelector("#potion-btn").onclick = function () {
	player.potion();
	checkWin();
};
