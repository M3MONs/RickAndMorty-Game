function Stats(id) {
    this.id =id;
  let health;
  let atack;
  let defense;
  $renderStat = document.querySelector("#character-stat-back");
  $renderEnemyStat = document.querySelector("#enemy-character-stat");
  switch (id) {
    case 1:
        RickSanchez();
      break;
    case 2:
      MortySmith();
      break;
    case 3:
        SummerSmith();
      break;
    case 4:
        BethSmith();
      break;
    case 5:
        JerrySmith();
      break;
    default:
      $renderStat.innerHTML = "in progress";
      break;
  }

  function RickSanchez() {
    health = 100;
    atack = 25;
    defense = 15;
    renderStats(health, atack, defense);
    renderEnemyStats(health, atack, defense);
  }

  function MortySmith() {
    health = 75;
    atack = 17;
    defense = 20;
    renderStats(health, atack, defense);
    renderEnemyStats(health, atack, defense);
  }

  function SummerSmith() {
    health = 90;
    atack = 17;
    defense = 20;
    renderStats(health, atack, defense);
    renderEnemyStats(health, atack, defense);
  }

  function BethSmith() {
    health = 80;
    atack = 17;
    defense = 20;
    renderStats(health, atack, defense);
    renderEnemyStats(health, atack, defense);
  }

  function JerrySmith() {
    health = 50;
    atack = 12;
    defense = 12;
    renderStats(health, atack, defense);
    renderEnemyStats(health, atack, defense);
  }

  function renderStats(health, atack, defense) {
    $renderStat.innerHTML = `
    <h2><i class="fa fa-heart stat-icon" aria-hidden="true"></i> ${health}</h2>
    <h2><img src="static/imgs/sword.svg" alt="" class="stat-icon"> ${atack}</h2>
    <h2><img src="static/imgs/shield.svg" alt="" class="stat-icon"> ${defense}</h2>

    `;
  }

  function renderEnemyStats(health, atack, defence) {

    let enemyHealth = getRandomEnemyStat(id,health);
    let enemyAtack = getRandomEnemyStat(id,atack);
    let enemyDefense = getRandomEnemyStat(id,defense);

    $renderEnemyStat.innerHTML = `
    <h2><i class="fa fa-heart stat-icon" aria-hidden="true"></i> ${enemyHealth}</h2>
    <h2><img src="static/imgs/sword.svg" alt="" class="stat-icon"> ${enemyAtack}</h2>
    <h2><img src="static/imgs/shield.svg" alt="" class="stat-icon"> ${enemyDefense}</h2>

    `;

  }

  function getRandomEnemyStat(id,charStat) {
      //hardest statistics for players who play Jerry
      if(id===5){
        min = Math.ceil(charStat-5);
        max = Math.floor(charStat+11);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }else{
    min = Math.ceil(charStat-12);
    max = Math.floor(charStat+12);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
  console.log(health)
}
