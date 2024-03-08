import type { CheckFunc } from "..";
import { basicSize, centerX, centerY } from "../setting";
import type { Pos } from "../util";
import { addPos, eqPos, isInArea, multPos, subPos } from "../util";

type Img =
  | {
      type: "emoji";
      char: string;
    }
  | {
      type: "img";
      src: string;
    };
type MovePos = [-1, 0] | [1, 0] | [0, 0] | [0, -1] | [0, 1];

export abstract class Entity {
  /** 中心座標 */
  positon: Pos;
  /** 幅 */
  w: number;
  /** 高さ */
  h: number;
  /** 速度 */
  v: Pos = [0, 0];
  /** 方向（0<angle<2PI） */
  angle: number = 0;
  /** 外見 */
  img: Img;
  /** 次に動く座標 */
  movePos: MovePos = [0, 0];
  /** 移動前の座標 */
  beforePos: Pos;
  /** 動いているか */
  moving: boolean = false;
  /** 移動速度 */
  moveSpeed: number = 2;
  /** ある場所に何があるか確認する関数 */
  check: CheckFunc;
  constructor(position: Pos, w: number, h: number, img: Img, check: CheckFunc) {
    this.positon = this.beforePos = position;
    this.w = w;
    this.h = h;
    this.img = img;
    this.check = check;
  }
  /**
   * @param gamespeed 小さいほどfpsが高くなる
   */
  update(gamespeed: number) {
    this.customUpdate();
    this.positon = addPos(
      this.positon,
      multPos(this.v, (gamespeed * this.moveSpeed) / 400)
    );
    this.smoothMove();
  }
  draw(pos: Pos, ctx: CanvasRenderingContext2D) {
    const dp = subPos(this.positon, pos);
    if (!isInArea(dp)) return;
    ctx.save();
    ctx.beginPath();
    if (this.img.type === "emoji") {
      ctx.font = `${this.w * basicSize}px serif`;
      ctx.fillText(this.img.char, ...this.drawPosition(dp));
    }
    ctx.closePath();
    ctx.restore();
  }
  move(movePos: MovePos) {
    const nextPos = addPos(this.positon, movePos);
    const e = this.check(nextPos);
    if (e?.move === "stop") return;
    this.beforePos = this.positon;
    this.movePos = movePos;
    this.moving = true;
  }
  private drawPosition = (dp: Pos): Pos => {
    return multPos(
      addPos(dp, [centerX - this.w / 2 - 1 / 2, centerY - this.h / 2 + 1 / 2]),
      basicSize
    );
  };
  private smoothMove = () => {
    if (eqPos(this.movePos, [0, 0])) {
      this.moving = false;
      return;
    }
    const movedPos = subPos(this.positon, this.beforePos);
    const moved = Math.abs(this.movePos[0] ? movedPos[0] : movedPos[1]);
    if (moved >= 1) {
      // 到着した
      this.positon = addPos(this.beforePos, this.movePos);
      this.v = this.movePos = [0, 0];
      this.moving = false;
    } else {
      this.v = this.movePos;
    }
  };
  customUpdate() {}
}
