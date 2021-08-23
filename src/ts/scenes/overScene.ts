import { Application } from "pixi.js";

import Scene, { propType } from "../lib/engine/scene";
import SceneManager from "../lib/engine/sceneManager";


class OverScene extends Scene {

    constructor(app: Application, sceneManager: SceneManager, props?: propType) {
        super(app, sceneManager, props);
    }

    init() {

    }

    update(_delta: number) {

    }
}

export default OverScene;