import crypto from "crypto";

export function hashPassword(password, salt) {
  const hash = crypto.createHmac("sha256", salt);
  hash.update(password);
  return hash.digest("hex");
}

export function generateSalt() {
  return crypto.randomBytes(16).toString("hex");
}

export function isValidCredentials(
  providedPasswrod,
  salt,
  hashedPasswordFromDb
) {
  return hashPassword(providedPasswrod, salt) === hashedPasswordFromDb;
}