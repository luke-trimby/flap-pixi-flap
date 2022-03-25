import { Graphics, Rectangle, Sprite, Texture } from "pixi.js";
import { CollisionPoly } from "../collision/collision-poly";

export class PolySprite extends Sprite {
    public collisionPoly: CollisionPoly;
    protected debug: boolean;
    protected debugBox: Graphics;
    protected debugPoly: Graphics;

    constructor(texture?: Texture) {
        super(texture);
        this.debug = false;
    }

    public setDebug(debug: boolean): void {
        this.debug = debug;
        if (this.debugBox) {
            this.debugBox.destroy();
        }
        if (this.debugPoly) {
            this.debugPoly.destroy();
        }
        if (this.debug) {
            this.debugBox = new Graphics();
            this.addChild(this.debugBox);
            this.debugPoly = new Graphics();
            this.addChild(this.debugPoly);
        }
    }

    public isDebug(): boolean {
        return this.debug;
    }

    public update(): void {
        this.updateTransform();
        this.collisionPoly.update();
        if (this.debug) {
            if (this.debugBox) {
                const box: Rectangle = this.collisionPoly.AABB;
                this.debugBox.clear();
                this.debugBox.lineStyle(2, 0xffffff, 0.8);
                this.debugBox.drawRect(box.x - this.x, box.y - this.y, box.width, box.height);
            }
            if (this.debugPoly) {
                this.debugPoly.clear();
                this.debugPoly.lineStyle(2, 0xff00ff, 0.8).drawPolygon(this.collisionPoly.points);
            }
        }
    }
}