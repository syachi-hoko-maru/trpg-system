import { Entity } from "./entity";
import { Me } from "./entity/me";
import { GameMap } from "./map";
import { height, width } from "./setting";
import { Pos } from "./util";

export type Gaming = "gaming" | "stop" | "terminate";
export type GameEvent =
  | { name: "wall"; move: "stop" }
  | { name: "over"; move: "stop" }
  | { name: "goal"; move: "goal" }
  | null;
export type CheckFunc = (p: Pos) => GameEvent;

export class Game {
  private me: Me | null = null;
  private gameMap: GameMap | null = null;
  private entityList: Entity[] = [];
  private gaming: Gaming = "terminate";
  /**
   * 小さいほどfpsが高くなる
   */
  private gamespeed: number;
  private ctx: CanvasRenderingContext2D;
  private intervalId: NodeJS.Timer | null = null;
  private level: number = 0;
  constructor(ctx: CanvasRenderingContext2D, gamespeed: number = 16) {
    this.ctx = ctx;
    this.gamespeed = gamespeed;
  }
  button(): {
    string: string;
    click: () => void;
  }[] {
    if (this.gaming === "gaming")
      return [
        { string: "ポーズする", click: () => this.stop() },
        { string: "セーブする", click: () => this.save() },
      ];
    else if (this.gaming === "stop")
      return [
        { string: "再開する", click: () => this.restart() },
        { string: "セーブする", click: () => this.save() },
        { string: "終了する", click: () => this.terminate() },
      ];
    else return [{ string: "ゲームを始める", click: () => this.init() }];
  }
  handler(key: string, mode: "down" | "up") {
    if (!this.me) return;
    console.log(key, mode);
    if (key === "Shift") {
      if (mode === "up") {
        this.me.moveSpeed = 2;
      } else {
        this.me.moveSpeed = 4;
      }
    }
    if (!this.me.moving) {
      if (mode === "up") {
        return;
      }
      if (key === "Right" || key === "ArrowRight" || key === "d") {
        this.me.moveController("right");
      } else if (key === "Left" || key === "ArrowLeft" || key === "a") {
        this.me.moveController("left");
      } else if (key === "Up" || key === "ArrowUp" || key === "w") {
        this.me.moveController("up");
      } else if (key === "Down" || key === "ArrowDown" || key === "s") {
        this.me.moveController("down");
      }
    }
  }
  private init() {
    this.terminate();
    this.me = new Me();
    this.entityList.push(this.me);
    this.setMap();
    this.start();
  }
  private setMap() {
    this.gameMap = new GameMap({ name: "test", width: 50, height: 50 }).init();
    this.me?.setForNewMap(this.gameMap.startPos, this.check(this.gameMap));
  }
  private start() {
    console.log("[rpg] start");
    this.gaming = "gaming";
    this.intervalId = setInterval(() => this.mainLoop(this), this.gamespeed);
  }
  private stop() {
    console.log("[rpg] stop");
    this.gaming = "stop";
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  private save() {
    console.log("[rpg] save");
  }
  private restart() {
    this.stop();
    this.start();
  }
  private terminate() {
    this.stop();
    this.entityList = [];
    this.gaming = "terminate";
  }
  private mainLoop(self: this) {
    try {
      const gameMap = self.gameMap;
      const me = self.me;
      if (!gameMap || !me) throw "";
      self.entityList.forEach((entity) => {
        entity.update(self.gamespeed);
      });
      self.ctx.fillStyle = gameMap.FillStyleDict[0];
      self.ctx.fillRect(0, 0, width, height);
      gameMap.draw(me.positon, self.ctx);
      self.entityList.forEach((entity) => {
        entity.draw(me.positon, self.ctx);
      });
      if (this.check(gameMap)(me.positon)?.move === "goal") {
        this.level++;
        this.setMap();
      }
    } catch (e) {
      self.stop();
    }
  }
  private check(gm: GameMap): CheckFunc {
    return (p: Pos) => {
      const mapResult = gm.checkMap(p);
      return mapResult;
    };
  }
}
