import { Entity } from ".";
import type { CheckFunc } from "..";
import { randomPos } from "../util";

export class Npc extends Entity {
  constructor(check: CheckFunc) {
    super(
      randomPos(),
      1,
      1,
      {
        type: "emoji",
        char: "🦧",
      },
      check
    );
  }
  customUpdate() {
    if (this.moving) return;
    this.randomMove();
  }
  private randomMove() {
    if (this.moving) return;
    const rand = Math.random() * 5;
    if (rand < 1) this.move([0, 1]);
    if (rand < 2) this.move([0, -1]);
    if (rand < 3) this.move([1, 0]);
    if (rand < 4) this.move([-1, 0]);
    if (rand < 4) this.move([0, 0]);
  }
}
