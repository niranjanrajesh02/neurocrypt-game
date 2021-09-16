import Scene, { propType } from "../lib/engine/scene";
import SceneManager from "../lib/engine/sceneManager";

// import { db } from "../lib/firebase";
import { store } from "../redux";
import { fretInterface, userInterface } from "../interfaces";
import { Application, BitmapText, Container, Graphics, Sprite, Texture } from "pixi.js";
import { collisionCheck, keyboard, randomInt } from "../lib/engine/helper";
import Note from "../lib/note";

class GameScene extends Scene {

  private gameSpace;
  private scoreSpace;
  private hitsText;
  private missesText;

  private WINDOW_WIDTH = this.app.view.width;       // 800
  private WINDOW_HEIGHT = this.app.view.height;     // 600
  private GAME_WIDTH = this.WINDOW_WIDTH - 200;     // 600
  private KEYS = "sdfjkl";
  private FONT_SETTINGS = {
    fontName: "Defont",
    tint: 0x000000,
    fontSize: 24
  }

  private user: userInterface;

  private frets: fretInterface[];
  private fretKeys: keyboard[];                    // Keyboard objects
  private isPaused: boolean = true;

  private notes: Note[];
  private noteSpeed = 8;
  private misses = 0;
  private hits = 0;

  constructor({ app, sceneManager, props }: { app: Application; sceneManager: SceneManager; props?: propType; }) {
    super(app, sceneManager, props);

    this.gameSpace = new Container();
    this.scoreSpace = new Container();

    this.user = store.getState().user.value;
    store.subscribe(() => {
      this.user = store.getState().user.value;
    });

    this.hitsText = new BitmapText(`Hits - ${this.hits}`, this.FONT_SETTINGS);
    this.missesText = new BitmapText(`Misses - ${this.misses}`, this.FONT_SETTINGS);

    this.frets = [];
    this.fretKeys = [];
    this.notes = [];
  }

  private _gameOver = () => {
    console.log("[GAME OVER]");

    this.scenes.start("start");
  }

  private _setupScene = () => {
    const gameBg = new Sprite(Texture.WHITE);
    gameBg.width = this.GAME_WIDTH; gameBg.height = this.WINDOW_HEIGHT;

    const scoreBg = new Sprite(Texture.WHITE);
    scoreBg.tint = 0x444444;
    scoreBg.width = this.WINDOW_WIDTH - this.GAME_WIDTH - 10; scoreBg.height = this.WINDOW_HEIGHT - 10;
    scoreBg.position.set(5, 5);

    this.gameSpace.addChild(gameBg);
    this.scoreSpace.addChild(scoreBg);

    this.scoreSpace.position.set(this.GAME_WIDTH, 0);

    const scoreBoardTitle = new BitmapText("SCORES", this.FONT_SETTINGS);
    scoreBoardTitle.position.set(scoreBg.width / 2 - scoreBoardTitle.width / 2, 50)
    this.scoreSpace.addChild(scoreBoardTitle);

    this.hitsText.position.set(scoreBg.width / 2 - this.hitsText.width / 2, 100)
    this.scoreSpace.addChild(this.hitsText)

    this.missesText.position.set(scoreBg.width / 2 - this.missesText.width / 2, 150);
    this.scoreSpace.addChild(this.missesText)

    this.addChild(this.gameSpace);
    this.addChild(this.scoreSpace);
  }

  private _createFrets = () => {
    for (let i = 0; i < 7; i++) {
      const offsetX = 20;
      const gap = 80;

      if (i === 3) continue;

      const fret = new Sprite(Texture.WHITE);
      fret.width = 60; fret.height = 20;
      fret.tint = 0x000000;

      fret.position.set(offsetX + i * gap + (gap - fret.width) / 2, this.WINDOW_HEIGHT - 80);
      this.frets.push({ fret, isPressed: false });
      this.gameSpace.addChild(fret);
    }
  }

  private _createLines = () => {
    for (let i = 0; i < 8; i++) {
      const offsetX = 20;
      const gap = 80;

      const line = new Graphics();
      line.lineStyle(4, 0x000000, 1);

      line.moveTo(offsetX + i * gap, 100);
      line.lineTo(offsetX + i * gap, this.WINDOW_HEIGHT - 40);

      if (i === 0 || i === 7) {
        line.lineStyle(2, 0x000000, 1);

        line.moveTo(offsetX + i * gap, 40);
        line.lineTo(offsetX + i * gap, this.WINDOW_HEIGHT - 20);
      }

      this.gameSpace.addChild(line);
    }
  }

  private _keyInputs = () => {
    for (const key of this.KEYS) {
      const key_instance = new keyboard(key);
      this.fretKeys.push(key_instance);
    }

    this.fretKeys.forEach((key, i, arr) => {
      key.press = () => {
        let isOtherKeyDown = false;
        arr
          .filter((otherKey) => otherKey !== key)
          .forEach((otherKey) => {
            if (otherKey.isDown) {
              isOtherKeyDown = true;
            }
          })

        if (!isOtherKeyDown) {
          this.frets[i].isPressed = true;
        }
      }

      key.release = () => {
        this.frets[i].isPressed = false;
      }
    })

    const escKey = new keyboard("Escape");
    escKey.release = () => {
      this._gameOver();
    }

    const spaceKey = new keyboard(" ");
    spaceKey.release = () => {
      console.log("[SPACE PRESSED]")
      this.isPaused = !this.isPaused;
    }
  }

  private _generateNote = (n: number) => {
    let noteOffsetX = 60,
      noteGapX = 80;

    let x;
    while (true) {
      x = n === -1 || n === 3 ? randomInt(0, 6) : n;

      if (x !== 3) break;
    }

    const note = new Note(0, this.noteSpeed, noteOffsetX + x * noteGapX);
    this.notes.push(note);
    this.gameSpace.addChild(note);
  }

  private _killNotes = (note: Note, index: number) => {
    note.clear();
    this.notes.splice(index, 1);
  }

  public init = () => {
    this._setupScene();
    this._createFrets();
    this._keyInputs();
    this._createLines();

    setInterval(() => {
      if (!this.isPaused) this._generateNote(-1);
    }, 500)
  }

  public update(_delta: number) {
    if (!this.user.uid) this.scenes.start("start");

    if (!this.isPaused) {
      this.frets.forEach((fret) => {
        if (fret.isPressed) {
          fret.fret.tint = 0x222222;
        } else {
          fret.fret.tint = 0x000000;
        }
      });

      this.notes.forEach((note, index) => {
        note.move();

        this.frets.forEach((fret) => {
          if (collisionCheck(fret, note)) {
            if (fret.isPressed) {
              this._killNotes(note, index);
              this.hits += 1;
              this.hitsText.text = `Hits: ${this.hits}`
            }
          }
        });
      });
    }

    this.notes.forEach((note, index) => {
      if (note.y > this.WINDOW_HEIGHT + 50) {
        this._killNotes(note, index);
        this.misses += 1;
        this.missesText.text = `Misses: ${this.misses}`
      }
    });
  }
}

export default GameScene;
