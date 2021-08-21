import { Application, SCALE_MODES, settings, utils } from "pixi.js";
import { gameConfig } from "../data/config.json";

import SceneManager from "./lib/engine/sceneManager";
import StartScene from "./scenes/startScene";
import GameScene from "./scenes/gameScene";


let type = "WebGL";
if (!utils.isWebGLSupported()) {
    type = "canvas";
}

utils.sayHello(`${type}`);

let app = new Application(gameConfig);
settings.SCALE_MODE = SCALE_MODES.NEAREST;

app.loader
    .add("coffee", "https://i.ibb.co/M547g7R/coffee-cup.png")
    .load(setup);


function setup() {
    let user = null;

    const scenes = new SceneManager(app);

    scenes.add("start", new StartScene(app, scenes, { user }));
    scenes.add("game", new GameScene(app, scenes, { user }));

    scenes.start("start");
}

export default app;
