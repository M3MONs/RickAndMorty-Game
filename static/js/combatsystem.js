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
			setStats(this.health, this.atack, this.defense);
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
	function setStats(s1, s2, s3) {
		health = s1;
		atack = s2;
		defense = s3;
		renderStats(atack, defense);
		renderHealths(health, id);
	}

	// Render Character and Enemy Character Stats
	function renderStats(cAtack, cDefense) {
		if (id <= 5) {
			renderAtack.forEach((element) => {
				element.innerHTML = ` ${cAtack}`;
			});
			renderDefense.forEach((element) => {
				element.innerHTML = ` ${cDefense} `;
			});
		} else {
			renderEnemyAtack.innerHTML = ` ${cAtack}`;
			renderEnemyDefense.innerHTML = ` ${cDefense}`;
		}
	}
	function renderHealths(cHealth, check) {
		if (check <= 5) {
			renderHealth.forEach((element) => {
				element.innerHTML = ` ${cHealth}`;
			});
		} else {
			renderEnemyHealth.innerHTML = ` ${cHealth}`;
		}
	}

	function getRandomEnemyStat(charStat) {
		min = Math.ceil(charStat - 9);
		max = Math.floor(charStat + 8);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function setEnemyStats() {
		enemyHealth = getRandomEnemyStat(Number(renderHealth[1].innerHTML.valueOf()));
		enemyAtack = getRandomEnemyStat(Number(renderAtack[1].innerHTML.valueOf()));
		enemyDefense = getRandomEnemyStat(Number(renderDefense[1].innerHTML.valueOf()));
		renderStats(enemyAtack, enemyDefense);
		renderHealths(enemyHealth, 6);
	}

	//Atack
	document.querySelector("#atack-btn").onclick = function () {
		characterAtack();
	};

	function characterAtack() {
		var charHealth = Number(renderHealth[1].innerHTML.valueOf());
		var charAtack = Number(renderAtack[1].innerHTML.valueOf());

		var eCharHp = Number(renderEnemyHealth.innerHTML.valueOf());
		var eCharDefense = Number(renderEnemyDefense.innerHTML.valueOf());
		if (charHealth > 0) {
			eCharHp = atackAlgorithm(eCharHp, charAtack, eCharDefense) - 5;
			renderHealths(eCharHp, 6);
			//must chceck enemy hp
			enemyCombatFunction();
		}
		checkResult();
	}

	//Regen
	document.querySelector("#regen-btn").onclick = function () {
		characterRegen();
	};

	function characterRegen() {
		var charHealth = Number(renderHealth[1].innerHTML.valueOf());
		let eCharHp = Number(renderEnemyHealth.innerHTML.valueOf());
		if (charHealth < health - 20 && eCharHp > 0) {
			charHealth += randomNumberFight() + 15;
			renderHealths(charHealth, 1);
		}

		var counterMove = randomNumberFight();
		if (counterMove < -1) {
			enemyCombatFunction();
		}
	}

	function enemyCombatFunction() {
		var enemyAction = randomNumberFight();

		var charHealth = Number(renderHealth[1].innerHTML.valueOf());
		var charDefense = Number(renderDefense[1].innerHTML.valueOf());

		var eCharAtack = Number(renderEnemyAtack.innerHTML.valueOf());
		var eCharHp = Number(renderEnemyHealth.innerHTML.valueOf());
		if (charHealth > 0) {
			if (enemyAction >= -3) {
				charHealth = atackAlgorithm(charHealth, eCharAtack, charDefense) - 7;
				//must chceck char hp
				renderHealths(charHealth, 1);
			} else {
				eCharHp += randomNumberFight() - 5;
				renderHealths(eCharHp, 6);
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
		var charHealth = Number(renderHealth[1].innerHTML.valueOf());
		var eCharHp = Number(renderEnemyHealth.innerHTML.valueOf());

		const win = document.querySelector("#enemy-stats");
		const lose = document.querySelector("#front-stats");
		if(eCharHp <= 0 && charHealth <= 0){
			win.innerHTML = `<h1 class="m-auto">Draft~!</h1>`;
			lose.innerHTML = `<h1 class="m-auto">Draft~!</h1>`
		}else if (eCharHp <= 0) {
			win.innerHTML = `<h1 class="m-auto">You Win~!</h1>`;
		}else if (charHealth <= 0) {
			console.log("działa?");
			lose.innerHTML = `<h1 class="m-auto">You Lose~!</h1>`;
		}
	}
}
