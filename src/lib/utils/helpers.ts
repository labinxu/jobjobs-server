// place helper utility functions here.

import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import ObjectId from "bson-objectid";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function stringToObjectId(idString: string): ObjectId | null {
  try {
    // Check if the string is a valid ObjectId
    if (!ObjectId.isValid(idString)) {
      console.error("Invalid ObjectId string:", idString);
      return null; // Or throw an error, depending on your use case
    }

    const objectId = new ObjectId(idString);
    return objectId;
  } catch (error) {
    console.error("Error converting string to ObjectId:", error);
    return null; // Or throw an error
  }
}
export function getRandomString(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
export function getRandomId(length: number): string {
  const characters = "0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
export function getRandomPrice(): string {
  return (Math.random() * 1000).toFixed(2);
}
export function getRandomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}
