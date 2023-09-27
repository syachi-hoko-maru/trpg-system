import { maxX, maxY } from "./setting";

export type Pos = [number, number];

export const addPos = (a: Pos, b: Pos): Pos => {
  return [a[0] + b[0], a[1] + b[1]];
};
export const subPos = (a: Pos, b: Pos): Pos => {
  return [a[0] - b[0], a[1] - b[1]];
};
export const multPos = (a: Pos, n: number): Pos => {
  return [a[0] * n, a[1] * n];
};

export const eqPos = (a: Pos, b: Pos): boolean => {
  return a[0] === b[0] && a[1] === b[1];
};

export const randomPos = (): Pos => {
  return [getRandomInt(maxX), getRandomInt(maxY)];
};
export const getRandomInt = (mult: number): number => {
  return Math.floor(Math.random() * mult);
};

export const isInArea = (p: Pos): boolean => {
  return (
    p[0] > -maxX / 2 - 1 &&
    p[0] < maxX / 2 + 1 &&
    p[1] > -maxY / 2 - 1 &&
    p[1] < maxY / 2 + 1
  );
};

export type Angle = "right" | "left" | "up" | "down";
