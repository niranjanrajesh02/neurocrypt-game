import { Graphics } from "pixi.js";


class Note extends Graphics {

  public vx;
  public vy;

  constructor(vx: number, vy: number, xPos: number) {
    super();
    this.vx = vx;
    this.vy = vy;

    this.beginFill(0x000000);
    this.drawCircle(0, 0, 20);
    this.endFill();

    this.position.set(xPos, -100);
  }


  public move() {
    this.y += this.vy;
  }
}


export default Note;
