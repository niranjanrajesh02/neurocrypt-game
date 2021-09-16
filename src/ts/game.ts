import { Application, BitmapFont, SCALE_MODES, settings, utils } from "pixi.js";
import { gameConfig } from "../data/config.json";

import SceneManager from "./lib/engine/sceneManager";
import { StartScene, GameScene } from "./scenes";

let type = "WebGL";
if (!utils.isWebGLSupported()) {
  type = "canvas";
}

utils.sayHello(`${type}`);

let app = new Application(gameConfig);
settings.SCALE_MODE = SCALE_MODES.NEAREST;

BitmapFont.from("Defont", {
  fill: "#ffffff",
  fontSize: 24
}, {
  // @ts-expect-error
  chars: [['a', 'z'], ['A', 'Z'], ['0', '9'], " _-:"],
})

app.loader
  .load(setup);

function setup() {
  const scenes = new SceneManager(app);

  scenes.add("start", new StartScene(app, scenes));
  scenes.add("game", new GameScene({ app: app, sceneManager: scenes }));

  scenes.start("start");
}

export default app;
