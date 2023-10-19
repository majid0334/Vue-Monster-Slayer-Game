const app = Vue.createApp({
  data() {
    return {
      playearHealth: 100,
      monsterHealth: 100,
      amountOfAttack: 0,
      winner: null,
      logMessage: [],
    };
  },
  methods: {
    startGame() {
      this.playearHealth = 100;
      this.monsterHealth = 100;
      this.winner = null;
      this.amountOfAttack = 0;
      this.logMessage = [];
    },
    attackMonster() {
      this.amountOfAttack++;
      const attackDamage = Math.floor(Math.random() * (12 - 5)) + 5;
      this.monsterHealth = this.monsterHealth - attackDamage;
      this.addLogMessages("player", "attack", attackDamage);
      this.attackPlayear();
    },
    attackPlayear() {
      const attackDamage = Math.floor(Math.random() * (12 - 5)) + 5;
      this.playearHealth = this.playearHealth - attackDamage;
      this.addLogMessages("monster", "attack", attackDamage);
    },
    specialAttackMonster() {
      this.amountOfAttack++;
      const attackDamage = Math.floor(Math.random() * (25 - 10)) + 5;
      this.monsterHealth = this.monsterHealth - attackDamage;
      this.addLogMessages("player", "special-attack", attackDamage);
      this.attackPlayear();
    },
    healplayear() {
      this.amountOfAttack++;
      const heal = Math.floor(Math.random() * (25 - 10)) + 5;
      if (this.playearHealth + heal > 100) {
        this.playearHealth = 100;
      } else {
        this.playearHealth = this.playearHealth + heal;
      }
      this.addLogMessages("pla", "heal", heal);

      this.attackPlayear();
    },
    surrender() {
      this.winner = "monster won";
    },
    addLogMessages(who, what, value) {
      this.logMessage.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
  computed: {
    monsterHealthCss() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playearHealthCss() {
      if (this.playearHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playearHealth + "%" };
    },
    specialAttack() {
      return this.amountOfAttack % 3 !== 0;
    },
    addLogMessage() {},
  },
  watch: {
    playearHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster won";
        console.log(this.winner);
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playearHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "playear won";
        console.log(this.winner);
      }
    },
  },
});

app.mount("#game");
