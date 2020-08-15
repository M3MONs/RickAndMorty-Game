function Stats(id) {
	this.id = id;
	//variables to set stats
	let health;
	let atack;
	let defense;

	let enemyHealth;
	let enemyAtack;
	let enemyDefense;

	let healthRegen;
	let maxRegen = 4;

	const renderHealth = document.querySelectorAll(".char-h");
	const renderAtack = document.querySelectorAll(".char-a");
	const renderDefense = document.querySelectorAll(".char-d");

	const renderEnemyHealth = document.querySelector("#echar-h");
	const renderEnemyAtack = document.querySelector("#echar-a");
	const renderEnemyDefense = document.querySelector("#echar-d");

	const enemyStats = document.querySelector("#enemy-stats");
	const charStats = document.querySelector("#front-stats");
	const win = document.querySelector("#win");
	const lose = document.querySelector("#lose");

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
			healthRegen = health - 20;
			renderStats();
			renderHealths(1);
		}
	}
	// Stats Characters (health, atack, defense)
	let RickSanchez = new Character(100, 25, 15);
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

	function setEnemyStats() {
		readCharacterStats();
		enemyHealth = getRandomEnemyStat(health);
		enemyAtack = getRandomEnemyStat(atack);
		enemyDefense = getRandomEnemyStat(defense);
		renderStats();
		renderHealths(2);
		readEnemyCharacterStats();
	}

	//Atack
	document.querySelector("#atack-btn").onclick = function () {
		characterAtack();
	};

	function characterAtack() {
		readCharacterStats();
		readEnemyCharacterStats();
		if (health > 0) {
			enemyHealth = atackAlgorithm(enemyHealth, atack, enemyDefense);
			renderHealths(2);
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
		readEnemyCharacterStats();
		if (health < healthRegen && health > 0 && enemyHealth > 0 && maxRegen > 0) {
			maxRegen -= 1;
			console.log(maxRegen);
			health += randomNumberFight() + 20;
			renderHealths(0);
		}
	}

	function enemyCombatFunction() {
		readCharacterStats();
		readEnemyCharacterStats();
		var enemyAction = randomNumberFight();

		if (enemyHealth > 0) {
			if (enemyAction >= -2) {
				health = atackAlgorithm(health, atack, defense) - 8;
				//must chceck char hp
				renderHealths(1);
			} else {
				enemyHealth += randomNumberFight() + 10;
				renderHealths(2);
			}
			checkResult();
		}
	}

	function nextOpponentButton() {
		var button = document.querySelector("#next-opponent");
		button.classList.remove("d-none");
	}

	function checkResult() {
		readCharacterStats();
		readEnemyCharacterStats();

		if (enemyHealth <= 0 && health <= 0) {
			enemyStats.classList.remove("d-flex");
			charStats.classList.remove("d-flex");
			charStats.classList.add("d-none");
			win.innerHTML = `<h1 class="m-auto">Draft~!</h1>`;
			lose.innerHTML = `<h1 class="m-auto">Draft~!</h1>`;
			maxRegen = 4;
			nextOpponentButton();
		} else if (enemyHealth <= 0) {
			enemyStats.classList.remove("d-flex");
			win.classList.remove("d-none");
			win.innerHTML = `<h1 class="m-auto">You Win~!</h1>`;
			maxRegen = 4;
			nextOpponentButton();
		}
		if (health <= 0) {
			charStats.classList.remove("d-flex");
			charStats.classList.add("d-none");
			lose.classList.remove("d-none");
			lose.innerHTML = `<h2 class="m-auto">You Lose!</h2>`;
		}
	}

	function readCharacterStats() {
		health = Number(renderHealth[1].innerHTML.valueOf());
		atack = Number(renderAtack[1].innerHTML.valueOf());
		defense = Number(renderDefense[1].innerHTML.valueOf());
	}

	function readEnemyCharacterStats() {
		enemyHealth = Number(renderEnemyHealth.innerHTML.valueOf());
		enemyAtack = Number(renderEnemyAtack.innerHTML.valueOf());
		enemyDefense = Number(renderEnemyDefense.innerHTML.valueOf());
	}

	function atackAlgorithm(h, a, d) {
		h -= Math.abs(Math.round((2 * a - d) * 0.55) + randomNumberFight());
		return h;
	}

	function randomNumberFight() {
		return Math.floor(Math.random() * 9 - 4);
	}

	function getRandomEnemyStat(x) {
		var min = Math.ceil(x - 9);
		var max = Math.floor(x + 8);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	document.querySelector("#next-opponent").onclick = function () {
		enemyStats.classList.add("d-flex");
		win.classList.add("d-none");
		lose.classList.add("d-none");
	};
}
