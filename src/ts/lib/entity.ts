import { Sprite, Texture } from "pixi.js";
import { Box, consoleKeys, contains } from "./helper";

/**
 * Velocity of a body in 2D
 */
export interface Velocity {
    x: number
    y: number
}


/**
 * An Entity class that extends PIXI.Sprite object. 
 * @param x - The x co-ordinate 
 * @param x - The x co-ordinate
 * @param texture - The texture to be used
 * @param npc - Is the entity an npc
 * @param velocity - x and y velocity of the entity, defaults to x: 0, y: 0 
*/
export default class Entity extends Sprite {

    public vx: number;
    public vy: number;
    public npc: boolean;
    public isHit: boolean;
    public velocity: Velocity;

    constructor(x: number, y: number, texture: Texture, npc: boolean, velocity: Velocity = { x: 0, y: 0 }) {
        super(texture);

        this.anchor.set(0.5);
        this.position.set(x, y);

        this.vx = 0;
        this.vy = 0;

        this.isHit = false;
        this.velocity = velocity;

        this.npc = npc;
    }

    /**
     * Sets up the keyboard movement if the player if playable, if not sets then sets as the default velocity
     */
    public movements = () => {
        if (!this.npc) {
            let keys = consoleKeys();

            keys.right.press = () => {
                if (!keys.d.isDown) this.vx += this.velocity.x;
            }
            keys.right.release = () => {
                if (!keys.left.isDown) this.vx = 0;
            }
            keys.d.press = () => {
                if (!keys.right.isDown) this.vx += this.velocity.x;
            }
            keys.d.release = () => {
                this.vx = 0
            }

            keys.left.press = () => {
                if (!keys.d.isDown) this.vx -= this.velocity.x;
            }
            keys.left.release = () => {
                if (!keys.right.isDown) this.vx = 0;
            }
            keys.a.press = () => {
                if (!keys.right.isDown) this.vx -= this.velocity.x;
            }
            keys.a.release = () => {
                this.vx = 0
            }

            keys.up.press = () => {
                if (!keys.w.isDown) this.vy -= this.velocity.y;
            }
            keys.w.press = () => {
                if (!keys.up.isDown) this.vy -= this.velocity.y;
            }
            keys.up.release = () => {
                this.vy = 0;
            }
            keys.w.release = () => {
                this.vy = 0;
            }

            keys.down.press = () => {
                if (!keys.s.isDown) this.vy += this.velocity.y;
            }
            keys.down.release = () => {
                this.vy = 0;
            }
            keys.s.press = () => {
                if (!keys.down.isDown) this.vy += this.velocity.y;
            }
            keys.s.release = () => {
                this.vy = 0;
            }

        } else {
            this.vx += this.velocity.x;
            this.vy += this.velocity.y;
        }
    }


    /**
     * Checks if the entity is inside a box
     * @param {Box} container object containing x co-ordinate, y co-ordinate, width and height of the box 
    */
    public contains = (container: Box) => {
        const collision = contains(this, container);
        if (collision === "left") {
            this.x = container.x;
        }
        if (collision === "right") {
            this.x = container.x + container.width - this.width;
        }
        if (collision === "top") {
            this.y = container.y;
        }
        if (collision === "bottom") {
            this.y = container.y + container.height - this.height;
        }

        return collision;
    }

    /**
     * The movement function that moves the entity each frame by vx and vy
     * 
     * @remarks
     * Use it inside the update function
     * 
     * @param delta PIXI.Ticker thingy
     */
    public move(delta: number) {
        this.x += this.vx * delta;
        this.y += this.vy * delta;
    }
}