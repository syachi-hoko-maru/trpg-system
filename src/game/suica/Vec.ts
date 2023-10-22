const sigNum = 10000;
export class Vec {
  private internalX: number;
  private internalY: number;
  get x() {
    return this.internalX / sigNum;
  }
  get y() {
    return this.internalY / sigNum;
  }
  set x(v) {
    this.internalX = Math.round(v * sigNum);
  }
  set y(v) {
    this.internalY = Math.round(v * sigNum);
  }
  constructor(x: number, y: number) {
    this.internalX = Math.round(x * sigNum);
    this.internalY = Math.round(y * sigNum);
  }
  get size() {
    return (
      Math.round(Math.sqrt(this.internalX ** 2 + this.internalY ** 2)) / sigNum
    );
  }
  show() {
    console.log({ x: this.x, y: this.y, size: this.size });
  }
  add(vec: Vec | [number, number]): Vec {
    if (vec instanceof Vec) {
      this.internalX = Math.round(this.internalX + vec.x * sigNum);
      this.internalY = Math.round(this.internalY + vec.y * sigNum);
    } else {
      this.internalX = Math.round(this.internalX + vec[0] * sigNum);
      this.internalY = Math.round(this.internalY + vec[1] * sigNum);
    }
    return this;
  }
  sub(vec: Vec | [number, number]): Vec {
    if (vec instanceof Vec) {
      this.internalX = Math.round(this.internalX - vec.x * sigNum);
      this.internalY = Math.round(this.internalY - vec.y * sigNum);
    } else {
      this.internalX = Math.round(this.internalX - vec[0] * sigNum);
      this.internalY = Math.round(this.internalY - vec[1] * sigNum);
    }
    return this;
  }
  multiScalar(scalar: number): Vec {
    this.internalX = Math.round(this.internalX * scalar);
    this.internalY = Math.round(this.internalY * scalar);
    return this;
  }
  distance(vec: Vec | [number, number]): number {
    let count = 0;
    if (vec instanceof Vec) {
      count += (this.internalX - vec.x * sigNum) ** 2;
      count += (this.internalY - vec.y * sigNum) ** 2;
    } else {
      count += (this.internalX - vec[0] * sigNum) ** 2;
      count += (this.internalY - vec[1] * sigNum) ** 2;
    }
    return Math.floor(Math.sqrt(count)) / sigNum;
  }
  divPart(divLine: Vec): [Vec, Vec] {
    if (divLine.size === 0) {
      console.error("size 0!!");
    }
    const housenS =
      (divLine.x * this.internalX + divLine.y * this.internalY) /
      divLine.size ** 2 /
      sigNum;
    const housenV = divLine.multiScalar(housenS);
    const sessenS =
      (-divLine.y * this.internalX + divLine.x * this.internalY) /
      divLine.size ** 2 /
      sigNum;
    const sessenV = new Vec(-divLine.y, divLine.x).multiScalar(sessenS);
    return [housenV, sessenV];
  }
  inner(vec: Vec): number {
    return (this.internalX * vec.x + this.internalY * vec.y) / sigNum;
  }
  equalFour(vec: Vec): boolean {
    return (
      this.internalX / Math.abs(this.internalX) === vec.x / Math.abs(vec.x) &&
      this.internalY / Math.abs(this.internalY) === vec.y / Math.abs(vec.y)
    );
  }
  copy() {
    return new Vec(this.x, this.y);
  }
}
