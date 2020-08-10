export default class Character {
  constructor({ id, name, image, gender, species, status }) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.status = status;
    this.species = species;
    this.gender = gender;

    //Create Main Characters
    if (this.id <= 5) {
      this.$character = document.querySelector("#character-front-card");
      this.$characterDescriptionContainer = document.querySelector(
        "#character-back-card"
      );
      this.renderCharacter();
    }

    //Create Enemy Characters
    if (this.id > 5) {
      this.$loadVs = document.querySelector("#vs-container");
      this.$enemyCharacter = document.querySelector(
        "#enemy-character-front-card"
      );
      this.$enemyCharacterNamePlaceHolder = document.querySelector(
        "#enemy-character-back-card"
      );
      this.renderEnemyCharacter();
    }
  }

  buildFrontCard() {
    return `
    <div><img src="${this.image}"></div>
    <h1 class="pt-1 pb-1">${this.name}</h1>
   `;
  }

  buildBackCard() {
    return `
        <div class="mt-5">
          <h2>Status: ${this.translator(this.status)}</h2>
          <h2>Płeć: ${this.gender}</h2>
          <h2>Gatunek: ${this.species}</h2>
        </div>
      `;
  }

  buildVs() {
    return `
    <h1 class="mx-5">VS</h1>
    `;
  }

  renderCharacter() {
    this.$character.innerHTML = this.buildFrontCard();
    this.$characterDescriptionContainer.innerHTML = this.buildBackCard();
  }

  renderEnemyCharacter() {
    this.$loadVs.innerHTML = this.buildVs();
    this.$enemyCharacter.innerHTML = this.buildFrontCard();
    this.$enemyCharacterNamePlaceHolder.innerHTML = this.buildBackCard();
  }

  translator(status) {
    if (status === "Alive") {
      return "żyje";
    } else if (status === "Dead") {
      return "martwy";
    }
  }
}

//Main Characters stats