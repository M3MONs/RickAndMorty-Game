function Stats(id) {
	this.id = id;
	//variables to set stats
	let health;
	let atack;
	let defense;

	let enemyHealth;
	let enemyAtack;
	let enemyDefense;

	//Select docuument to render stats

	const renderHealth = document.querySelectorAll(".char-h");
	const renderAtack = document.querySelectorAll(".char-a");
	const renderDefense = document.querySelectorAll(".char-d");

	const renderEnemyHealth = document.querySelector("#echar-h");
	const renderEnemyAtack = document.querySelector("#echar-a");
	const renderEnemyDefense = document.querySelector("#echar-d");

	class Character {
		constructor(health, atack, defense) {
			this.health = health;
			this.atack = atack;
			this.defense = defense;
		}
		rendStat() {
			health = this.health;
			atack = this.atack;
			defense = this.defense;
			renderStats();
			renderHealths(1);
		}
	}
	// Stats Characters (health, atack, defense)
	const RickSanchez = new Character(100, 25, 15);
	const MortySmith = new Character(75, 17, 20);
	const SummerSmith = new Character(90, 20, 15);
	const BethSmith = new Character(80, 23, 18);
	const JerrySmith = new Character(50, 12, 12);

	//generate character and enemy character stats
	switch (id) {
		case 1:
			RickSanchez.rendStat();
			break;
		case 2:
			MortySmith.rendStat();
			break;
		case 3:
			SummerSmith.rendStat();
			break;
		case 4:
			BethSmith.rendStat();
			break;
		case 5:
			JerrySmith.rendStat();
			break;
		default:
			setEnemyStats();
			break;
	}

	// Render Character and Enemy Character Stats
	function renderStats() {
		if (id <= 5) {
			renderAtack.forEach((element) => {
				element.innerHTML = ` ${atack}`;
			});
			renderDefense.forEach((element) => {
				element.innerHTML = ` ${defense} `;
			});
		} else {
			renderEnemyAtack.innerHTML = ` ${enemyAtack}`;
			renderEnemyDefense.innerHTML = ` ${enemyDefense}`;
		}
	}
	function renderHealths(check) {
		if (check <= 1) {
			renderHealth.forEach((element) => {
				element.innerHTML = ` ${health}`;
			});
		} else {
			renderEnemyHealth.innerHTML = ` ${enemyHealth}`;
		}
	}

	function getRandomEnemyStat(x) {
		var min = Math.ceil(x - 9);
		var max = Math.floor(x + 8);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function setEnemyStats() {
		readCharacterStats();
		enemyHealth = getRandomEnemyStat(health);
		enemyAtack = getRandomEnemyStat(atack);
		enemyDefense = getRandomEnemyStat(defense);
		renderStats();
		renderHealths(2);
	}

	//Atack
	document.querySelector("#atack-btn").onclick = function () {
		characterAtack();
	};

	function characterAtack() {
		readCharacterStats();
		if (health > 0) {
			enemyHealth = atackAlgorithm(enemyHealth, atack, enemyDefense) - 5;
			renderHealths(enemyHealth, 6);
			enemyCombatFunction();
		}
		checkResult();
	}

	//Regen
	document.querySelector("#regen-btn").onclick = function () {
		characterRegen();
	};

	function characterRegen() {
		readCharacterStats();
		if (health < health - 20 && health > 0 && enemyHealth > 0) {
			health += randomNumberFight() + 15;
			renderHealths(1);
		}

		var counterMove = randomNumberFight();
		if (counterMove < -1) {
			enemyCombatFunction();
		}
	}

	function enemyCombatFunction() {
		readCharacterStats();
		var enemyAction = randomNumberFight();

		if (enemyHealth > 0) {
			if (enemyAction >= -3) {
				health = atackAlgorithm(health, atack, defense) - 7;
				//must chceck char hp
				renderHealths(1);
			} else {
				enemyHealth += randomNumberFight() - 5;
				renderHealths(2);
			}
		}
		checkResult();
	}

	function atackAlgorithm(h, a, d) {
		h -= Math.abs(Math.round((a - d) * 1.1) + randomNumberFight());
		return h;
	}

	function randomNumberFight() {
		return Math.floor(Math.random() * 9 - 4);
	}

	function checkResult() {
		readCharacterStats();

		const win = document.querySelector("#enemy-stats");
		const lose = document.querySelector("#front-stats");
		if (enemyHealth <= 0 && health <= 0) {
			win.innerHTML = `<h1 class="m-auto">Draft~!</h1>`;
			lose.innerHTML = `<h1 class="m-auto">Draft~!</h1>`;
		} else if (enemyHealth <= 0) {
			win.innerHTML = `<h1 class="m-auto">You Win~!</h1>`;
		} else if (health <= 0) {
			lose.innerHTML = `<h1 class="m-auto">You Lose~!</h1>`;
		}
	}

	function readCharacterStats() {
		health = Number(renderHealth[1].innerHTML.valueOf());
		atack = Number(renderAtack[1].innerHTML.valueOf());
		defense = Number(renderDefense[1].innerHTML.valueOf());
	}

	enemyHealth = Number(renderEnemyHealth.innerHTML.valueOf());
	enemyAtack = Number(renderEnemyAtack.innerHTML.valueOf());
	enemyDefense = Number(renderEnemyDefense.innerHTML.valueOf());
}
