import { Entity } from ".";
import { CheckFunc } from "..";
import { Angle, Pos } from "../util";

export class Me extends Entity {
  constructor() {
    super(
      [0, 0],
      1,
      1,
      {
        type: "emoji",
        char: "🐂",
      },
      () => null
    );
  }
  setForNewMap(pos: Pos, check: CheckFunc) {
    this.positon = pos;
    this.check = check;
  }
  moveController(angle: Angle) {
    switch (angle) {
      case "right":
        this.move([1, 0]);
        break;
      case "left":
        this.move([-1, 0]);
        break;
      case "up":
        this.move([0, -1]);
        break;
      case "down":
        this.move([0, 1]);
        break;
    }
  }
  customUpdate(): void {}
}
