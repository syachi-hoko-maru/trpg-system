import type { GameEvent } from ".";
import { basicSize, centerX, centerY, maxX } from "./setting";
import type { Pos } from "./util";
import { addPos, eqPos, getRandomInt, isInArea, multPos, subPos } from "./util";

export type GameMapSetting = {
  name: string;
  width: number;
  height: number;
};
export type Rect = [Pos, Pos];
type TileType = 0 | 1 | 99;

export class GameMap {
  private setting: GameMapSetting;
  mapArr: TileType[] = [];
  // level: number = 0;
  FillStyleDict: { [key in TileType]: string } = {
    0: "#4f2f2f",
    1: "#916969",
    99: "#fff",
  };
  startPos: Pos = [0, 0];
  goalPos: Pos = [0, 0];
  constructor(setting: GameMapSetting) {
    this.setting = setting;
  }
  init() {
    this.createRandomDungeon();
    return this;
  }
  draw(pos: Pos, ctx: CanvasRenderingContext2D) {
    ctx.save();
    this.mapArr.forEach((type, i) => {
      const x = i % this.setting.width;
      const y = (i - x) / this.setting.width;
      // マップ
      const dp = subPos([x, y], pos);
      if (!isInArea(dp)) return;
      if (type) {
        ctx.fillStyle = this.FillStyleDict[type];
      } else if (type === 0) {
        ctx.fillStyle = this.FillStyleDict[0];
      } else {
        ctx.fillStyle = "black";
      }
      ctx.fillRect(
        ...multPos(addPos(dp, [centerX - 1, centerY - 1]), basicSize),
        basicSize,
        basicSize
      );
    });
    // ミニマップ
    const miniMapBasicSize = (basicSize / this.setting.width) * 2;
    this.mapArr.forEach((type, i) => {
      const x = i % this.setting.width;
      const y = (i - x) / this.setting.width;
      if (type !== 0) {
        ctx.fillStyle = "#eee";
        ctx.fillRect(
          ...addPos(multPos([x, y], miniMapBasicSize), [
            (maxX - 7 / 3) * basicSize,
            basicSize / 3,
          ]),
          miniMapBasicSize,
          miniMapBasicSize
        );
      }
    });
    ctx.fillStyle = "red";
    ctx.fillRect(
      ...addPos(multPos(pos, miniMapBasicSize), [
        (maxX - 7 / 3) * basicSize - miniMapBasicSize,
        basicSize / 3 - miniMapBasicSize,
      ]),
      miniMapBasicSize * 2,
      miniMapBasicSize * 2
    );
    ctx.restore();
  }
  private createRandomDungeon() {
    const { width, height } = this.setting;
    // 0（壁）で埋める
    for (let i = 0; i < width * height; i++) {
      this.mapArr[i] = 0;
    }
    this.setRoom([0, 0], [width, height]);
    // 最後に階段を設置
    this.mapArr[this.Pos2CellNum(this.goalPos)] = 99;
  }
  private setRoom(a: Pos, b: Pos): [Pos, Pos] {
    const start: Pos = [Math.min(a[0], b[0]), Math.min(a[1], b[1])];
    const end: Pos = [Math.max(a[0], b[0]), Math.max(a[1], b[1])];
    const [width, height] = subPos(end, start).map((n) => Math.abs(n));
    if (width * height < 300 || (width < 15 && height < 15)) {
      // これ以上分割できない時
      const minimumSize = 9;
      let dx1: number = 0;
      let dx2: number = 0;
      let dy1: number = 0;
      let dy2: number = 0;
      if (width > minimumSize) {
        dx1 = getRandomInt((width - minimumSize) / 2);
        dx2 = getRandomInt((width - minimumSize - dx1) / 2);
      }
      if (height > minimumSize) {
        dy1 = getRandomInt((height - minimumSize) / 2);
        dy2 = getRandomInt((height - minimumSize - dy1) / 2);
      }
      const s: Pos = addPos(start, [dx1 + 1, dy1 + 1]);
      const e: Pos = subPos(end, [dx2 + 1, dy2 + 1]);
      this.fillArea(s, e, 1, "room");
      return [s, e];
    }
    if (width > height) {
      // X軸上の点dで分割する
      const d = start[0] + getRandomInt(width - 16) + 8;
      const a = this.setRoom(start, [d - 1, end[1]]);
      const b = this.setRoom([d + 1, start[1]], end);
      const ay = a[0][1] + getRandomInt(a[1][1] - a[0][1]);
      const by = b[0][1] + getRandomInt(b[1][1] - b[0][1]);
      this.fillArea([a[1][0], ay], [d - 1, ay], 1);
      this.fillArea([d + 1, by], [b[0][0], by], 1);
      this.fillArea([d, ay], [d, by], 1);
      return a;
    } else {
      // Y軸上の点dで分割する
      const d = start[1] + getRandomInt(height - 16) + 8;
      const a = this.setRoom(start, [end[0], d - 1]);
      const b = this.setRoom([start[0], d + 1], end);
      const ax = a[0][0] + getRandomInt(a[1][0] - a[0][0]);
      const bx = b[0][0] + getRandomInt(b[1][0] - b[0][0]);
      this.fillArea([ax, a[1][1]], [ax, d - 1], 1);
      this.fillArea([bx, d + 1], [bx, b[0][1]], 1);
      this.fillArea([ax, d], [bx, d], 1);
      return a;
    }
  }
  private fillArea(a: Pos, b: Pos, tileType: TileType, option?: "room") {
    const start: Pos = [Math.min(a[0], b[0]), Math.min(a[1], b[1])];
    const end: Pos = [Math.max(a[0], b[0]), Math.max(a[1], b[1])];
    const [w, h] = subPos(end, start).map((n) => Math.abs(n));
    for (let i = 0; i < h + 1; i++) {
      for (let j = 0; j < w + 1; j++) {
        const p = addPos(start, [j, i]);
        this.mapArr[this.Pos2CellNum(p)] = tileType;
        if (option === "room") {
          const rand = getRandomInt(1000);
          if (eqPos(this.startPos, [0, 0]) || rand < 1) {
            this.startPos = p;
          } else if (eqPos(this.goalPos, [0, 0]) || rand < 15) {
            this.goalPos = p;
          }
        }
      }
    }
  }
  private Pos2CellNum(p: Pos): number {
    return p[0] + p[1] * this.setting.width;
  }
  checkMap(p: Pos): GameEvent {
    const num = this.Pos2CellNum(p);
    if (num < 0 || num >= this.mapArr.length)
      return { name: "over", move: "stop" };
    if (this.mapArr[num] === 0) return { name: "wall", move: "stop" };
    if (this.mapArr[num] === 99) return { name: "goal", move: "goal" };
    return null;
  }
}
