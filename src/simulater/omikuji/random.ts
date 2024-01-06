export class Random {
  x = 3181327278;
  y = 6226895146;
  z = 4269569680;
  w: number;
  constructor(seed: number) {
    this.w = seed;
  }
  // XorShift
  next() {
    let t;
    t = this.x ^ (this.x << 11);
    this.x = this.y;
    this.y = this.z;
    this.z = this.w;
    return (this.w = this.w ^ (this.w >>> 19) ^ (t ^ (t >>> 8)));
  }

  nextInt(min: number, max: number) {
    const r = Math.abs(this.next());
    return min + (r % (max + 1 - min));
  }
}
