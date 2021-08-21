import { Application, Sprite } from "pixi.js";

import Scene from "../lib/engine/scene";
import SceneManager from "../lib/engine/sceneManager";
import { createBlankSprite } from "../lib/engine/helper";
import { db } from "../lib/firebase";

interface propType {
    [index: string]: any;
}

class GameScene extends Scene {

    private WINDOW_WIDTH = this.app.view.width;
    private WINDOW_HEIGHT = this.app.view.height;

    private buttonOne;
    private counterButton;
    private count = 0;

    constructor(app: Application, sceneManager: SceneManager, props?: propType) {
        super(app, sceneManager, props);
        this.buttonOne = createBlankSprite(this.app.view.width - 48, 0, 48, 48, 0xeeeeee);

        this.counterButton = createBlankSprite(this.WINDOW_WIDTH / 2 - 64 / 2, this.WINDOW_HEIGHT / 2 - 64 / 2, 64, 64, 0xeeeeee);
        console.log(this.props);
    }

    private _createUI = () => {
        this.addChild(this.buttonOne);

        const buttonImg = new Sprite(this.app.loader.resources["coffee"].texture);
        buttonImg.width = 10, buttonImg.height = 10; buttonImg.x = 2; buttonImg.y = 2;
        this.buttonOne.addChild(buttonImg);

        this.buttonOne.interactive = true;
        this.buttonOne.on("pointerup", () => {
            const ref = db.ref("/");
            ref.push({
                count: this.count
            })

            this.scenes.start("start");
        });
    }

    private _createCounter = () => {
        this.addChild(this.counterButton);

        this.counterButton.interactive = true;
        this.counterButton.on("pointerup", () => {
            this.count += 1;
            console.log(this.count);
        });
    }

    public init = () => {
        this._createUI();
        this._createCounter();
    }

    public update(_delta: number) {

    }
}

export default GameScene;
