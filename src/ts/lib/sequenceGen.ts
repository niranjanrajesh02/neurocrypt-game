import { randomInt } from "./engine/helper";

const genRandomKeys = (length: number): string[] => {
  const keys = "sdfjkl";
  const randomKeys: string[] = [];

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
  const indexOfPasses: number[] = [];

  let xOne = randomInt(0, randomKeysCount);
  subBlock.push(...genRandomKeys(xOne));
  randomKeysCount -= xOne;
  indexOfPasses.push(subBlock.length);

  for (let i = 0; i < 3; i++) {
    subBlock.push(...passSeq);

    let randomKeyLength = randomInt(0, randomKeysCount);
    subBlock.push(...genRandomKeys(randomKeyLength));
    indexOfPasses.push(subBlock.length);
    randomKeysCount -= randomKeyLength;
  }

  indexOfPasses.pop();
  // add the remaining number of noise cues.
  subBlock.push(...genRandomKeys(randomKeysCount));
  console.log(indexOfPasses, subBlock);

  return subBlock;
}
