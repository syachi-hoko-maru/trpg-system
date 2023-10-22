import { Vec } from "../Vec";

const a = new Vec(400, 5);
const b = new Vec(1, 10);

// const [p, c] = a.divPart(b);
// p.show();
// c.show();
// console.log("結果");
// console.log(`内積: ${p.inner(c)}, ${b.inner(c)}`);
// console.log("");
// console.log("跳ね返り");
// p.add(c.multiScalar(-1)).multiScalar(0.8).show();
// console.log(a.inner(p));

console.log(a.distance(b));
console.log(b.distance(a));
