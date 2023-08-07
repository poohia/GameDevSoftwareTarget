import SnakeGame from "../SnakeGame";

export default class Food extends Phaser.GameObjects.Sprite {
  total = 0;
  constructor(scene: SnakeGame, x: number, y: number) {
    super(scene, x, y, "snake_sprites", "tile020");
    this.setPosition(x * SnakeGame.PIXEL_SIZE, y * SnakeGame.PIXEL_SIZE);
    this.setOrigin(0);

    this.total = 0;

    this.width = SnakeGame.PIXEL_SIZE;
    this.height = SnakeGame.PIXEL_SIZE;
    scene.children.add(this);
  }

  playAnimation() {
    this.play("robot", false);
    this.setOrigin(0);
  }

  eat() {
    const {
      options: { playSound, hitVibration },
    } = this.scene as SnakeGame;
    hitVibration();
    playSound("ball_throw.mp3", 0);

    this.total += 1;
  }
}
