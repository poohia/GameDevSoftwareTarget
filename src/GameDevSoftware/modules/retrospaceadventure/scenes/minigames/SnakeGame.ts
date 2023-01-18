import Phaser from "phaser";
import { RetrospaceadventureGamePhaserScene, PhaserGameProps } from "../types";
enum DIRECTION {
  Up = 0,
  Down,
  Left,
  Right,
}

class BadFood extends Phaser.GameObjects.Image {
  constructor(scene: SnakeGame, x: number, y: number) {
    super(scene, x, y, "snake", "tile020");
    this.setPosition(x * 16, y * 16);
    this.setOrigin(0);
    scene.children.add(this);
  }
}

class Food extends Phaser.GameObjects.Image {
  total = 0;
  constructor(scene: SnakeGame, x: number, y: number) {
    super(scene, x, y, "snake", "tile015");
    this.setPosition(x * 16, y * 16);
    this.setOrigin(0);

    this.total = 0;

    scene.children.add(this);
  }

  eat() {
    const {
      options: { playSound },
    } = this.scene as SnakeGame;
    playSound("ball_throw.mp3", 0);

    this.total += 1;
  }
}

class Snake {
  private headPosition;
  private body: Phaser.GameObjects.Group;
  private head: Phaser.GameObjects.Sprite;
  private tail;
  private speed = 60;
  private moveTime = 0;
  private increaseSpeedModulo;
  private lastHeading = DIRECTION.Right;
  private heading = DIRECTION.Right;
  private direction = DIRECTION.Right;
  private indexMovement = -1;
  private snakeSprites: any = [];
  nbRows;
  nbColumns;

  constructor(private scene: SnakeGame, x: number, y: number) {
    const {
      add,
      options: { width, height, difficulty },
    } = scene;
    this.headPosition = new Phaser.Geom.Point(x, y);
    this.body = add.group();
    this.head = this.body.create(x * 16, y * 16, "snake", "tile004");
    this.head.setOrigin(0);
    this.tail = new Phaser.Geom.Point(x, y);
    for (let i = 1; i < 4; i++) {
      this.body
        .create(
          x * 16 - 16 * i,
          y * 16,
          "snake",
          i === 3 ? "tile014" : "tile001"
        )
        .setOrigin(0);
    }
    this.nbRows = Math.floor(width / 16);
    this.nbColumns = Math.floor(height / 16);
    switch (difficulty) {
      case "dev":
      case "tutorial":
        this.increaseSpeedModulo = SnakeGame.tutorial.increaseSpeedModulo;
        this.speed = SnakeGame.tutorial.startspeed;
        break;
      case "level1":
        this.increaseSpeedModulo = SnakeGame.level1.increaseSpeedModulo;
        this.speed = SnakeGame.level1.startspeed;
        break;
      case "level2":
        this.increaseSpeedModulo = SnakeGame.level2.increaseSpeedModulo;
        this.speed = SnakeGame.level2.startspeed;
        break;
      case "level3":
        this.increaseSpeedModulo = SnakeGame.level3.increaseSpeedModulo;
        this.speed = SnakeGame.level3.startspeed;
        break;
    }
  }

  private grow() {
    const childrens = this.body.getChildren();
    // const childrensLenght = childrens.length;
    // let frameName = "";
    // childrens.forEach((children, j) => {
    //   if (j === childrensLenght - 2) {
    //     const childrenBeforeLast: Phaser.GameObjects.Sprite = childrens[
    //       childrensLenght - 2
    //     ] as Phaser.GameObjects.Sprite;
    //     const { x, y } = childrenBeforeLast;
    //     const lastChildren: Phaser.GameObjects.Sprite = childrens[
    //       childrensLenght - 1
    //     ] as Phaser.GameObjects.Sprite;
    //     frameName = lastChildren.frame.name;
    //     lastChildren.setFrame(childrenBeforeLast.frame.name, false, false);

    //     // switch (this.heading) {
    //     //   case DIRECTION.Left:
    //     //     lastChildren.setFrame("tile001", false, false);
    //     //     break;
    //     //   case DIRECTION.Right:
    //     //     lastChildren.setFrame("tile001", false, false);
    //     //     break;
    //     //   case DIRECTION.Up:
    //     //     lastChildren.setFrame("tile007", false, false);
    //     //     break;
    //     //   case DIRECTION.Down:
    //     //     lastChildren.setFrame("tile007", false, false);
    //     //     break;
    //     // }
    //   }
    //   if (j === childrensLenght - 1) {
    //     this.body
    //       .create(this.tail.x, this.tail.y, "snake", frameName)
    //       .setOrigin(0);
    //   }
    // });
    const lastChildren: Phaser.GameObjects.Sprite = childrens[
      childrens.length - 1
    ] as Phaser.GameObjects.Sprite;
    const frameName = lastChildren.frame.name;
    switch (this.heading) {
      case DIRECTION.Left:
        lastChildren.setFrame("tile001", false, false);
        break;
      case DIRECTION.Right:
        lastChildren.setFrame("tile001", false, false);
        break;
      case DIRECTION.Up:
        lastChildren.setFrame("tile007", false, false);
        break;
      case DIRECTION.Down:
        lastChildren.setFrame("tile007", false, false);
        break;
    }
    this.body.create(this.tail.x, this.tail.y, "snake", frameName).setOrigin(0);
  }

  collideWithFood(food: Food) {
    if (this.head.x === food.x && this.head.y === food.y) {
      this.grow();

      food.eat();

      //  For every 5 items of food eaten we'll increase the snake speed a little
      if (this.speed > 20 && food.total % this.increaseSpeedModulo === 0) {
        this.speed -= 5;
      }

      return true;
    }
    return false;
  }

  collideWithBadFood(badFood: BadFood) {
    if (this.head.x === badFood.x && this.head.y === badFood.y) {
      return true;
    }
    return false;
  }

  updateGrid(grid: any) {
    //  Remove all body pieces from valid positions list
    this.body.children.each((segment: any) => {
      const s: Phaser.GameObjects.Sprite = segment;
      const bx = s.x / 16;
      const by = s.y / 16;
      grid[by][bx] = false;
    });

    return grid;
  }

  async changeDirection(direction: DIRECTION) {
    const { x, y } = this.head;
    new Promise<void>((resolve, reject) => {
      switch (direction) {
        case DIRECTION.Left:
          if (
            this.direction === DIRECTION.Up ||
            this.direction === DIRECTION.Down
          ) {
            this.lastHeading = this.direction;
            this.heading = DIRECTION.Left;
            resolve();
            return;
          }
          break;
        case DIRECTION.Right:
          if (
            this.direction === DIRECTION.Up ||
            this.direction === DIRECTION.Down
          ) {
            this.lastHeading = this.direction;
            this.heading = DIRECTION.Right;
            resolve();
            return;
          }

          break;
        case DIRECTION.Up:
          if (
            this.direction === DIRECTION.Left ||
            this.direction === DIRECTION.Right
          ) {
            this.lastHeading = this.direction;
            this.heading = DIRECTION.Up;
            resolve();
            return;
          }
          break;

        case DIRECTION.Down:
          if (
            this.direction === DIRECTION.Left ||
            this.direction === DIRECTION.Right
          ) {
            this.lastHeading = this.direction;
            this.heading = DIRECTION.Down;
            resolve();
            return;
          }
          break;
      }
      reject();
    })
      .then(() => {
        this.indexMovement = -1;
        if (typeof this.snakeSprites[y] === "undefined")
          this.snakeSprites[y] = [];
        switch (this.heading) {
          case DIRECTION.Left:
            if (this.lastHeading === DIRECTION.Up) {
              this.snakeSprites[y][x] = {
                body: "tile002",
                tail: "tile018",
              };
            } else if (this.lastHeading === DIRECTION.Down) {
              this.snakeSprites[y][x] = { body: "tile012", tail: "tile018" };
            }
            break;
          case DIRECTION.Right:
            if (this.lastHeading === DIRECTION.Up) {
              this.snakeSprites[y][x] = { body: "tile000", tail: "tile014" };
            } else if (this.lastHeading === DIRECTION.Down) {
              this.snakeSprites[y][x] = { body: "tile005", tail: "tile014" };
            }
            break;
          case DIRECTION.Up:
            if (this.lastHeading === DIRECTION.Right) {
              this.snakeSprites[y][x] = { body: "tile012", tail: "tile013" };
            } else if (this.lastHeading === DIRECTION.Left) {
              this.snakeSprites[y][x] = { body: "tile005", tail: "tile013" };
            }
            break;
          case DIRECTION.Down:
            if (this.lastHeading === DIRECTION.Right) {
              this.snakeSprites[y][x] = { body: "tile002", tail: "tile019" };
            } else if (this.lastHeading === DIRECTION.Left) {
              this.snakeSprites[y][x] = { body: "tile000", tail: "tile019" };
            }
            break;
        }
      })
      .catch(() => {});
  }

  update(time: number) {
    if (time >= this.moveTime) {
      return this.move(time);
    }
  }

  move(time: number) {
    const childrens = this.body.getChildren();
    const childrensLength = childrens.length;
    this.indexMovement =
      this.indexMovement > childrensLength - 1
        ? childrensLength - 1
        : this.indexMovement + 1;

    switch (this.heading) {
      case DIRECTION.Left:
        this.headPosition.x = Phaser.Math.Wrap(
          this.headPosition.x - 1,
          0,
          this.nbRows
        );
        break;

      case DIRECTION.Right:
        this.headPosition.x = Phaser.Math.Wrap(
          this.headPosition.x + 1,
          0,
          this.nbRows
        );

        break;

      case DIRECTION.Up:
        this.headPosition.y = Phaser.Math.Wrap(
          this.headPosition.y - 1,
          0,
          this.nbColumns
        );

        break;

      case DIRECTION.Down:
        this.headPosition.y = Phaser.Math.Wrap(
          this.headPosition.y + 1,
          0,
          this.nbColumns
        );
        break;
    }

    Phaser.Actions.ShiftPosition(
      childrens,
      this.headPosition.x * 16,
      this.headPosition.y * 16,
      1,
      // @ts-ignore
      this.tail
    );
    childrens.forEach((children, j) => {
      const segment: Phaser.GameObjects.Sprite =
        children as Phaser.GameObjects.Sprite;
      const { x, y } = segment;

      if (j === 0) {
        switch (this.heading) {
          case DIRECTION.Left:
            this.head.setFrame("tile008", false, false);
            break;
          case DIRECTION.Right:
            this.head.setFrame("tile004", false, false);
            break;

          case DIRECTION.Up:
            this.head.setFrame("tile003", false, false);
            break;
          case DIRECTION.Down:
            this.head.setFrame("tile009", false, false);
            break;
        }
        return;
      }

      if (
        typeof this.snakeSprites[y] !== "undefined" &&
        typeof this.snakeSprites[y][x] !== "undefined"
      ) {
        // put tail good direction
        if (j === childrensLength - 1) {
          if (typeof this.snakeSprites[y][x].tail !== "undefined") {
            segment.setFrame(this.snakeSprites[y][x].tail, false, false);
          }

          delete this.snakeSprites[y][x];
          return;
        }
        // put angle
        segment.setFrame(this.snakeSprites[y][x].body, false, false);

        return;
      }
      // put first body
      if (j <= this.indexMovement && j < childrensLength - 1) {
        if (typeof this.snakeSprites[y] === "undefined")
          this.snakeSprites[y] = [];
        switch (this.heading) {
          case DIRECTION.Left:
          case DIRECTION.Right:
            segment.setFrame("tile001", false, false);
            this.snakeSprites[y][x] = { body: "tile001" };
            break;
          case DIRECTION.Up:
          case DIRECTION.Down:
            segment.setFrame("tile007", false, false);
            this.snakeSprites[y][x] = { body: "tile007" };
            break;
        }
        return;
      }
    });

    this.direction = this.heading;

    //  Check to see if any of the body pieces have the same x/y as the head
    //  If they do, the head ran into the body

    const hitBody = Phaser.Actions.GetFirst(
      childrens,
      { x: this.head.x, y: this.head.y },
      1
    );

    if (hitBody) {
      this.scene.options.onLoose();
      return false;
    } else {
      //  Update the timer ready for the next movement
      this.moveTime = time + this.speed;

      return true;
    }
  }
}

class SnakeGame extends RetrospaceadventureGamePhaserScene {
  // @ts-ignore
  private textInfo: Phaser.GameObjects.Text;
  private targetToEat: number;
  private nbBadFood: number;

  static tutorial = {
    startspeed: 100,
    targetToEat: 3,
    increaseSpeedModulo: 3,
    nbBadFood: 1,
  };

  static level1 = {
    startspeed: 80,
    targetToEat: 4,
    increaseSpeedModulo: 3,
    nbBadFood: 4,
  };

  static level2 = {
    startspeed: 75,
    targetToEat: 6,
    increaseSpeedModulo: 2,
    nbBadFood: 6,
  };

  static level3 = {
    startspeed: 70,
    targetToEat: 6,
    increaseSpeedModulo: 2,
    nbBadFood: 8,
  };

  // private currentDifficulty;
  // @ts-ignore
  private badFoods: BadFood[] = [];
  // @ts-ignore
  private food: Food;
  // @ts-ignore
  private snake: Snake;
  _canStart: boolean = false;

  private start = false;
  private x = 0;
  private y = 0;

  constructor(private _options: PhaserGameProps) {
    super("SnakeGame");
    switch (this._options.difficulty) {
      case "dev":
      case "tutorial":
        this.targetToEat = SnakeGame.tutorial.targetToEat;
        this.nbBadFood = SnakeGame.tutorial.nbBadFood;
        break;
      case "level1":
        this.targetToEat = SnakeGame.level1.targetToEat;
        this.nbBadFood = SnakeGame.level1.nbBadFood;
        break;
      case "level2":
        this.targetToEat = SnakeGame.level2.targetToEat;
        this.nbBadFood = SnakeGame.level2.nbBadFood;
        break;
      case "level3":
        this.targetToEat = SnakeGame.level3.targetToEat;
        this.nbBadFood = SnakeGame.level3.nbBadFood;
        break;
    }
  }

  /**
   * We can place the food anywhere in our 40x30 grid
   * *except* on-top of the snake, so we need
   * to filter those out of the possible food locations.
   * If there aren't any locations left, they've won!
   *
   * @method repositionFood
   * @return {boolean} true if the food was placed, otherwise false
   */
  private repositionFood() {
    //  First create an array that assumes all positions
    //  are valid for the new piece of food

    //  A Grid we'll use to reposition the food each time it's eaten
    const testGrid: any = [];
    const { nbRows, nbColumns } = this.snake;
    for (let y = 0; y < nbColumns; y++) {
      testGrid[y] = [];

      for (let x = 0; x < nbRows; x++) {
        if (x >= nbRows - 2 && y <= 2) {
          testGrid[y][x] = false;
        } else {
          testGrid[y][x] = true;
        }
      }
    }
    this.snake.updateGrid(testGrid);

    //  Purge out false positions
    let validLocations: { x: number; y: number }[] = [];

    for (let y = 0; y < nbColumns; y++) {
      for (let x = 0; x < nbRows; x++) {
        if (testGrid[y][x] === true) {
          //  Is this position valid for food? If so, add it here ...
          validLocations.push({ x: x, y: y });
        }
      }
    }

    if (validLocations.length > 0) {
      //  Use the RNG to pick a random food position
      const pos = Phaser.Math.RND.pick(validLocations);
      validLocations = validLocations.filter(
        (v) => !(v.x === pos.x && v.y === pos.y)
      );
      //  And place it
      this.food.setPosition(pos.x * 16, pos.y * 16);
    } else {
      return false;
    }
    this.badFoods.forEach((badFood) => {
      if (validLocations.length > 0) {
        const pos = Phaser.Math.RND.pick(validLocations);
        validLocations = validLocations.filter(
          (v) => !(v.x === pos.x && v.y === pos.y)
        );
        //  And place it
        badFood.setPosition(pos.x * 16, pos.y * 16);
      }
    });
    if (validLocations.length === 0) return false;
    return true;
  }

  private initGesture(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  private applyGesture(x: number, y: number) {
    const deltaX = this.x - x;
    const deltaY = this.y - y;
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (x < this.x) {
        this.snake.changeDirection(DIRECTION.Left);
      }
      if (x > this.x) {
        this.snake.changeDirection(DIRECTION.Right);
      }
    } else {
      if (y < this.y) {
        this.snake.changeDirection(DIRECTION.Up);
      }
      if (y > this.y) {
        this.snake.changeDirection(DIRECTION.Down);
      }
    }
  }

  preload() {
    const { getAsset, loadSound } = this._options;
    this.load.atlas(
      "snake",
      getAsset("snake_sprite.png", "image"),
      getAsset("snake_sprite_atlas.json", "json")
    );
    loadSound("ball_throw.mp3", 1);
  }

  create() {
    const {
      _options: { width },
      nbBadFood,
    } = this;
    this.food = new Food(this, 8, 4);
    this.snake = new Snake(this, 16, 8);
    for (let i = 0; i < nbBadFood; i++) {
      this.badFoods.push(new BadFood(this, 24, 8));
    }
    this.textInfo = this.add.text(width - 16, 0, this.targetToEat.toString(), {
      color: "white",
      fontSize: "16px",
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
    });
    this.add.image(width - 16 * 2, 16 / 2, "snake", "tile015");

    document.addEventListener("touchstart", (e) => {
      if (this._canStart && !this.start) {
        this.start = true;
      } else if (!this.start) {
        return;
      }
      const { screenX, screenY } = e.touches[0];
      this.initGesture(screenX, screenY);
    });

    document.addEventListener("mousedown", (e) => {
      if (this._canStart && !this.start) {
        this.start = true;
      } else if (!this.start) {
        return;
      }
      const { screenX, screenY } = e;
      this.initGesture(screenX, screenY);
    });
    document.addEventListener("mouseup", (e) => {
      if (this._canStart && !this.start) {
        this.start = true;
      } else if (!this.start) {
        return;
      }
      const { screenX, screenY } = e;
      this.applyGesture(screenX, screenY);
    });

    // document
    //   .getElementById("phasergamecontent")
    //   ?.addEventListener("mousemove", (e) => {
    //     const { screenX, screenY } = e;
    //     this.applyGesture(screenX, screenY);
    //   });

    document.addEventListener("touchmove", (e) => {
      if (this._canStart && !this.start) {
        this.start = true;
      } else if (!this.start) {
        return;
      }
      const { screenX, screenY } = e.changedTouches[0];
      this.applyGesture(screenX, screenY);
    });

    document.addEventListener("keydown", (event) => {
      if (this._canStart && !this.start) {
        this.start = true;
      } else if (!this.start) {
        return;
      }

      switch (event.code) {
        case "ArrowUp":
          this.snake.changeDirection(DIRECTION.Up);
          break;
        case "ArrowDown":
          this.snake.changeDirection(DIRECTION.Down);
          break;
        case "ArrowRight":
          this.snake.changeDirection(DIRECTION.Right);
          break;
        case "ArrowLeft":
          this.snake.changeDirection(DIRECTION.Left);
          break;
      }
      // do something
    });
  }

  update(time: number) {
    const { onWin, onLoose } = this._options;
    if (this.food.total === this.targetToEat) {
      onWin();
      return false;
    }

    if (!this.start) return;
    if (this.snake.update(time)) {
      //  If the snake updated, we need to check for collision against food

      if (this.snake.collideWithFood(this.food)) {
        this.repositionFood();
        this.textInfo.text = String(this.targetToEat - this.food.total);
      } else {
        this.badFoods.forEach((badFood) => {
          if (this.snake.collideWithBadFood(badFood)) {
            badFood.destroy();
            onLoose();
          }
        });
      }
    }
  }

  config(): Phaser.Types.Core.GameConfig {
    const { width, height } = this._options;
    return {
      type: Phaser.AUTO,
      parent: "phasergamecontent",
      scale: {
        width,
        height,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      audio: {
        disableWebAudio: true,
        noAudio: true,
      },
    };
  }

  get options() {
    return this._options;
  }
}

export default SnakeGame;