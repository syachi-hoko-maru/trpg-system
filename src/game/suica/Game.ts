import { Ball, BallSize, BallSizeList } from "./Ball";
import { Vec } from "./Vec";

type SuicaGameOption = {
  resolution: number;
};
type GameStatus = "init" | "ready" | "progress" | "close" | "error";
const fallBallSizeArray: BallSize[] = [1, 2, 3, 4, 5];

export class SuicaGame {
  // ゲーム関連（表側）
  score: number = 0;
  highScore: number = 0;
  nowBall: Ball | null = null;
  nextBall: Ball | null = null;
  // ゲーム関連（裏側）
  status: GameStatus = "init";
  ballArray: Ball[] = [];
  targetX: number = 0;
  // 描画関連
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private resolution: number;
  width: number;
  height: number;
  constructor(option?: SuicaGameOption) {
    this.resolution = option?.resolution || 400;
    this.width = 2 * this.resolution;
    this.height = 3 * this.resolution;
  }
  setCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.canvas.addEventListener("touchstart", () => this.clickHandler("down"));
    this.canvas.addEventListener("touchstart", () => this.clickHandler("down"));
    this.canvas.addEventListener("mousedown", () => this.clickHandler("down"));
    this.canvas.addEventListener("mouseup", () => this.clickHandler("up"));
    this.canvas.addEventListener("touchend", () => this.clickHandler("up"));
    this.canvas.addEventListener("touchcancel", () => this.clickHandler("up"));
    this.canvas.onmousemove = (e) => this.moveHandler(e);
  }
  clickHandler(mode: "up" | "down") {
    console.log(mode);
    if (mode === "up") {
      // マウスが上がったらボールを落とす
      this.ballArray.push(this.setBall().fall());
      this.nowBall = null;
      //   console.log(this.ballArray);
    }
  }
  moveHandler(e: MouseEvent) {
    const clientWidth = this.canvas?.getBoundingClientRect().width;
    if (clientWidth) {
      this.targetX = (e.offsetX / clientWidth) * this.width;
    }
  }
  start() {
    if (!this.ctx) {
      this.errorCtx();
      return;
    }
    this.status = "progress";
    this.setBall();
    this.mainLoop();
  }
  show() {
    console.log(
      this.ballArray
        .map(
          (b) =>
            `size: ${b.size}, a: [${b.a.x},${b.a.y}], v: [${b.v.x},${
              b.v.y
            }], pos: [${b.pos.x},${b.pos.y}], klList: [${b.klList
              .map((v) => `[${v.x},${v.y}]`)
              .join(", ")}]`
        )
        .join("\n")
    );
  }
  private errorCtx() {
    console.log("error w ctx");
    return;
  }
  private mainLoop() {
    const ball = this.setBall();
    const ballX: number = ball.pos.x;
    ball.pos = new Vec(ballX + (this.targetX - ballX) / 5, this.height / 20);
    this.ballArray.forEach((ball) => {
      ball.move();
    });
    this.draw();
    this.mergeBalls();
    this.ballArray.forEach((ball) => {
      ball.checkCollisionBall(this);
    });
    this.ballArray.forEach((ball) => {
      ball.checkCollisionWall(this);
    });

    // console.log(
    //   this.ballArray.map((b) => `a: ${b.a.x},${b.a.y} v:${b.v.x},${b.v.y}`)
    // );
    setTimeout(() => this.mainLoop(), 16);
  }
  private setBall(): Ball {
    if (!this.nowBall) {
      if (this.nextBall) {
        this.nowBall = this.nextBall;
        this.nextBall = this.setNewBall();
      } else {
        this.nowBall = this.setNewBall();
        this.nextBall = this.setNewBall();
      }
    }
    return this.nowBall;
  }
  private setNewBall(): Ball {
    return new Ball(
      new Vec(this.width / 2, this.height / 20),
      this.getRandomsize()
    );
  }
  private getRandomsize(): BallSize {
    return fallBallSizeArray[
      Math.floor(Math.random() * fallBallSizeArray.length)
    ];
  }
  private mergeBalls() {
    main: while (true) {
      this.ballArray = this.ballArray
        .filter((a) => !a.isMerged)
        .sort((a, b) => a.size - b.size);
      sub1: for (let i = 0; i < this.ballArray.length; i++) {
        const a = this.ballArray[i];
        if (a.isMerged) continue sub1;
        sub2: for (let j = 0; j < this.ballArray.length - 1; j++) {
          const b = this.ballArray[j];
          if (b.isMerged) continue sub2;
          if (a === b) continue;
          if (a.size === b.size && a.size !== BallSizeList.at(-1)) {
            if (a.pos.distance(b.pos) <= a.r + b.r) {
              this.ballArray.push(
                new Ball(
                  a.v.size < b.v.size ? a.pos : b.pos,
                  (a.size + 1) as BallSize
                )
              );
              a.isMerged = true;
              b.isMerged = true;
              continue main;
            }
          }
        }
      }
      break main;
    }
    // console.log(this.ballArray);
    // this.ballArray.forEach((a) => {
    //   this.ballArray.forEach((b) => {
    //     if (a === b) return;
    //     if (this.pos.distance(b.pos) <= this.r + b.r) {
    //       // 衝突時の処理
    //       if (this.size === b.size && this.size !== BallSizeList.at(-1)) {
    //         game.ballArray.push(
    //           new Ball(
    //             this.pos.add(b.pos).multiScalar(1 / 2),
    //             (this.size + 1) as BallSize
    //           )
    //         );
    //       }
    //       // console.log("col", this.pos, b.pos, this.pos.distance(b.pos));
    //     }
    //   });
    // });
  }
  private draw() {
    if (!this.ctx) {
      this.errorCtx();
      return;
    }
    this.ctx.save();
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = "#2f6b55";
    this.ctx.fillRect(0, 0, this.width, this.height);
    for (let ball of [...this.ballArray, this.nowBall]) {
      if (!ball) continue;
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.fillStyle = ball.color;
      this.ctx.arc(ball.pos.x, ball.pos.y, ball.r, 0, 360);
      this.ctx.fill();
      this.ctx.closePath();
      this.ctx.restore();
    }
    this.ctx.restore();
  }
}
