import { Application, Sprite } from "pixi.js";
import { Howl } from "howler";

import Scene, { propType } from "../lib/engine/scene";
import SceneManager from "../lib/engine/sceneManager";
import { createBlankSprite } from "../lib/engine/helper";
import { db } from "../lib/firebase";
import { store } from "../redux";

import sound from "/assets/sound.wav";
import { userInterface } from "../interfaces";


class GameScene extends Scene {

  private WINDOW_WIDTH = this.app.view.width;
  private WINDOW_HEIGHT = this.app.view.height;

  private buttonOne;
  private counterButton;
  private count = 0;
  private user: userInterface;

  private sound?;

  constructor(app: Application, sceneManager: SceneManager, props?: propType) {
    super(app, sceneManager, props);
    this.buttonOne = createBlankSprite(this.app.view.width - 48, 0, 48, 48, 0xeeeeee);

    this.counterButton = createBlankSprite(this.WINDOW_WIDTH / 2 - 64 / 2, this.WINDOW_HEIGHT / 2 - 64 / 2, 64, 64, 0xeeeeee);

    this.user = store.getState().user.value;
    store.subscribe(() => {
      this.user = store.getState().user.value;
      console.log(this.user)
    })

    this.sound = new Howl({
      src: [sound],
      volume: 0.5
    })
  }

  private _createUI = () => {
    this.addChild(this.buttonOne);

    const buttonImg = new Sprite(this.app.loader.resources["coffee"].texture);
    buttonImg.width = 10, buttonImg.height = 10; buttonImg.x = 2; buttonImg.y = 2;
    this.buttonOne.addChild(buttonImg);

    this.buttonOne.interactive = true;
    this.buttonOne.on("pointerup", () => {
      const ref = db.ref(this.user.uid);
      const data = {
        count: this.count
      }
      ref.push(data);
      /* db.ref("_gamedata").set({
          "VIS": false,
          "AUD": true,
          "gameVer": 0.1,
      }) */

      console.log("[DATA PUSHED]\n", data);
      this.scenes.start("start");
    });
  }

  private _createCounter = () => {
    this.addChild(this.counterButton);

    this.counterButton.interactive = true;
    this.counterButton.on("pointerup", () => {
      this.count += 1;
      this.sound?.play();
    });
  }

  public init = () => {
    this._createUI();
    this._createCounter();
  }

  public update(_delta: number) {
    if (!this.user.uid) this.scenes.start("start");
  }
}

export default GameScene;
