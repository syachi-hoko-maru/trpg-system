import { SuicaGame } from "./Game";
import { Vec } from "./Vec";

export const BallSizeList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const;
export type BallSize = (typeof BallSizeList)[number];

const g = 1;
const t = 1;
const i = 0.9;

export class Ball {
  // ベクトルプロパティ
  pos: Vec;
  v: Vec = new Vec(0, 0);
  prev: Vec = new Vec(0, 0);
  a: Vec = new Vec(0, 0);
  // プロパティ
  size: BallSize;
  r: number;
  color: string;
  m: number;
  // フラグ
  isFallen: boolean = false;
  isMoving: boolean = false;
  isMerged: boolean = false;
  isCollosionWallL: boolean = false;
  isCollosionWallR: boolean = false;
  isCollosionFloor: boolean = false;
  // 接触しているボールの情報
  nealyBalls: Ball[] = [];
  klList: Vec[] = [];
  collisionArea: number = 0;
  constructor(pos: Vec, size: BallSize) {
    this.pos = pos;
    this.size = size;
    this.r = this.setR(this.size);
    this.m = this.setM(this.size);
    this.color = this.setColor(this.size);
  }
  private setR(size: BallSize) {
    return 20 * size;
  }
  private setM(size: BallSize) {
    return 5 * size * size;
  }
  private setColor(size: BallSize) {
    const hue = Math.floor((360 * size) / BallSizeList.length);
    return `hsl(${hue}, 100%, 50%)`;
  }
  fall(): Ball {
    if (this.isFallen) return this;
    this.isFallen = true;
    this.a = new Vec(0, g);
    this.v = new Vec(0, 20);
    return this;
  }
  move() {
    // klListとmgからmaを計算する
    this.a = new Vec(0, g);
    this.klList.forEach((kl) => {
      this.a.add(kl.multiScalar(1 / this.m));
    });
    // aが大きくなりすぎないようにする
    const aLimit = g * 20;
    if (this.a.x > aLimit) {
      this.a.x = aLimit;
    } else if (this.a.x < -aLimit) {
      this.a.x = -aLimit;
    }
    if (this.a.y > aLimit) {
      this.a.y = aLimit;
    } else if (this.a.y < -aLimit) {
      this.a.y = -aLimit;
    }
    // aからvを計算する
    this.v.multiScalar(0.95);
    this.v.add(this.a.copy().multiScalar(t));
    this.prev = this.v.copy();
    // vからposを計算する
    this.pos.add(this.v.copy().multiScalar(t));
  }
  checkCollisionWall(game: SuicaGame) {
    this.isCollosionFloor = false;
    this.isCollosionWallL = false;
    this.isCollosionWallR = false;
    this.klList = [];
    this.collisionArea = 0;
    // 床との衝突
    if (this.pos.y + this.r > game.height) {
      this.pos.y = game.height - this.r;
      this.isCollosionFloor = true;
      // 床で弾かれたならそれ以上の計算を放棄する
      if (this.v.y > 10 * g) {
        this.v = new Vec(this.v.x, -Math.abs(this.v.y)).multiScalar(0.2);
      } else {
        this.v.y = 0;
        this.v.x = this.v.x * 0.2;
      }
    }
    // // 壁との衝突
    if (this.pos.x - this.r < 0) {
      this.pos.x = this.r;
      this.isCollosionWallL = true;
      // 壁で弾かれたならそれ以上の計算を放棄する
      if (this.v.x < -10 * g) {
        this.v = new Vec(-Math.abs(this.v.x), this.v.y).multiScalar(0.1);
      } else {
        this.v.x = 0;
        this.v.y = this.v.y * 0.2;
      }
    } else if (this.pos.x + this.r > game.width) {
      this.pos.x = game.width - this.r;
      this.isCollosionWallR = true;
      // 壁で弾かれたならそれ以上の計算を放棄する
      if (this.v.x > 10 * g) {
        this.v = new Vec(-Math.abs(this.v.x), this.v.y).multiScalar(0.1);
      } else {
        this.v.x = 0;
        this.v.y = this.v.y * 0.2;
      }
    }
  }
  checkCollisionBall(game: SuicaGame) {
    // ボールとの衝突
    game.ballArray.forEach((b) => {
      // 自分自身 or すでに壁と当たっているやつとは計算しない
      if (this === b) return;
      const l = this.r + b.r - this.pos.distance(b.pos);
      if (l >= 0) {
        this.collisionArea += l;
        // 速度ベクトルを分解する
        const relaV = this.v.sub(b.prev);
        const divLine = this.pos.copy().sub(b.pos);
        const [hV, sV] = relaV.divPart(divLine);
        // 法線ベクトルの向きが正なら、ベクトルを反転する
        const nV = sV.copy();
        if (hV.x / Math.abs(hV.x) === divLine.x / Math.abs(divLine.x)) {
          nV.add(hV.multiScalar(-1))
            .multiScalar((this.m - i * b.m) / (this.m + b.m))
            .add(b.prev);
        }
        // 弾性力を受ける
        if (l > (this.r + b.r) / 20) {
          const powerS = (b.m * g * (l > (this.r + b.r) / 5 ? 5 : 2)) / 100;
          const powerV = divLine.copy().multiScalar(powerS / divLine.size);
          nV.add(powerV);
        }
        // ついてるかで考える
        if (this.isCollosionFloor && nV.y > 0) {
          nV.y = 0;
        }
        if (
          (this.isCollosionWallL && nV.x < 0) ||
          (this.isCollosionWallR && nV.x > 0)
        ) {
          nV.x = 0;
        }
        if (b.isCollosionFloor && nV.y < 0) {
          nV.y = nV.y * 2;
        }
        if (
          (b.isCollosionWallL && nV.x > 0) ||
          (b.isCollosionWallR && nV.x < 0)
        ) {
          nV.x = nV.x * 2;
        }
        // 速度に影響
        this.v = nV;
      }
    });
  }
}
