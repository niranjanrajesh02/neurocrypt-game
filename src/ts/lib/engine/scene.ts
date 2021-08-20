import { Application, Container } from "pixi.js";
import { sceneInterface } from "./sceneInterface";
import SceneManager from "./sceneManager";

export default class Scene extends Container implements sceneInterface {

    public app;
    public scenes;
    public isInitialized: boolean;

    constructor(app: Application, sceneManager: SceneManager) {
        super();
        this.app = app;
        this.scenes = sceneManager;
        this.isInitialized = false;
    }

    public init(): void { }

    public destroy(): void { }

    public start(): void { }

    public stop(): void { }

    public update(_delta: number): void { }
}