import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    create() {
      this.add.text(200, 300, "Habitverse Prototype", {
        fontSize: "32px",
        fill: "#ffffff"
      });
    }
  }
};

new Phaser.Game(config);