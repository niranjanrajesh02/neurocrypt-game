import { Application, Sprite, Texture, Text } from "pixi.js";
import Scene from "../lib/engine/scene";
import SceneManager from "../lib/engine/sceneManager";

export default class StartScene extends Scene {

    private background: Sprite;
    private button: Sprite;

    constructor(app: Application, sceneManager: SceneManager) {
        super(app, sceneManager);
        this.background = new Sprite(Texture.WHITE);
        this.background.tint = 0x333333
        this.background.width = this.app.view.width;
        this.background.height = this.app.view.height;

        this.button = new Sprite(Texture.WHITE);
        this.button.width = 48 + 16;
        this.button.height = 32;


        this.button.position.set(this.app.view.width / 2 - this.button.width / 2, this.app.view.height / 2 - this.button.height / 2)
    }

    public init(): void {
        this.addChild(this.background);
        this.addChild(this.button);

        const buttonText = new Text("Click");
        buttonText.width = 12;
        buttonText.height = 12;

        this.button.addChild(buttonText);
        this.button.interactive = true;

        this.button.on('pointerup', () => {
            this.scenes.start("game");
        })
        // this.se

    }

    public start(): void {
    }


    public update(_delta: number): void {

    }
}
