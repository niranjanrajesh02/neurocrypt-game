import { sceneInterface } from "./sceneInterface";

interface gameDataInterface {
  gameVer: number,
  [index: string]: any,
}

interface userInterface {
  uid: string,
  passSeq: string,
  [index: string]: any,
}

/**
 * A 2D rectangle, consists of x co-ord, y co-ord, width and height
 */
interface Box {
  x: number
  y: number
  width: number
  height: number
  [index: string]: any
}


export {
  sceneInterface,
  gameDataInterface,
  userInterface,
  Box,
}
