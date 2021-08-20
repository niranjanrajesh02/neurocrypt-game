import { Application } from "pixi.js";

import Scene from "../lib/engine/scene";
import SceneManager from "../lib/engine/sceneManager";


class GameScene extends Scene {

    constructor(app: Application, sceneManager: SceneManager) {
        super(app, sceneManager);

    }

    update(_delta: number) {

    }
}

export default GameScene;
