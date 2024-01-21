import { readFileSync, readdirSync, writeFileSync } from "fs";
import { decrypt, encrypt } from "../util/crypto";
import "dotenv/config";
import { randomBytes } from "crypto";

const dirPath = `${process.cwd()}/text/secret/`;
const outputPath = `${process.cwd()}/assets/secret.json`;

export const setSecret = (): void => {
  const password: string = process.env.PASSWORD || "SYACHIHOKOMARU";
  const iv = randomBytes(16);
  const salt = randomBytes(32);

  writeFileSync(
    outputPath,
    JSON.stringify({
      list: readdirSync(dirPath).reduce((prev, fileName) => {
        if (!fileName.endsWith(".txt")) return prev;
        const file = readFileSync(dirPath + fileName, "utf-8");
        prev.push({
          id: fileName.replace(".txt", ""),
          title: encrypt(file[0], password, iv, salt),
          andml: encrypt(file.slice(1), password, iv, salt),
        });
        return prev;
      }, [] as { id: string; title: Buffer; andml: Buffer }[]),
      iv,
      salt,
    }),
    "utf-8"
  );

  console.log("INFO: end set secret");
};
