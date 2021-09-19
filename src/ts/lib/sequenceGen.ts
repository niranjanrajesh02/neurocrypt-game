import { randomInt } from "./engine/helper";

const genRandomKeys = (length: number): string[] => {
  const keys = "sdfjkl";
  const randomKeys:string[] = [];

  let prevKey = "";
  for (let i = 0; i < length; i++) {
    let randomKey;

    while (true) {
      randomKey = keys[Math.floor(Math.random() * keys.length)];

      if (randomKey === prevKey) {
        randomKey = keys[Math.floor(Math.random() * keys.length)];
        continue
      }
      
      break;
    }
    randomKeys.push(randomKey);
    prevKey = randomKey;
  }

  return randomKeys;
}


export const subBlockGen = (passSeq: string[]): string[] => {
  let randomKeysCount = 18;
  const subBlock: string[] = [];

  let xOne = randomInt(0, randomKeysCount);
  subBlock.push(...genRandomKeys(xOne));
  randomKeysCount -= xOne;

  for (let i = 0; i < 3; i++) {
    subBlock.push(...passSeq);

    let randomKeyLength = randomInt(0, randomKeysCount);
    subBlock.push(...genRandomKeys(randomKeyLength));
    randomKeysCount -= randomKeyLength;
  }
  subBlock.push(...genRandomKeys(randomKeysCount));

  return subBlock;
}
