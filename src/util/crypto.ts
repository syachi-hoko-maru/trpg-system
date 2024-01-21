import { createCipheriv, createDecipheriv, scryptSync } from "crypto";

const algorithm = "aes-256-cbc";

export const encrypt = (
  str: string,
  password: string,
  iv: Buffer,
  salt: Buffer
): Buffer => {
  const key = scryptSync(password, salt, 32);
  const cipher = createCipheriv(algorithm, key, iv);
  return Buffer.concat([cipher.update(str), cipher.final()]);
};

export const decrypt = (
  encrypted: Buffer,
  password: string,
  iv: Buffer,
  salt: Buffer
): Buffer => {
  const key = scryptSync(password, salt, 32);
  const decipher = createDecipheriv(algorithm, key, iv);
  return Buffer.concat([decipher.update(encrypted), decipher.final()]);
};
