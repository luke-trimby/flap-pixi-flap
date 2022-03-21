import { Container, Graphics, Point, Rectangle, Sprite } from "pixi.js";

export interface IColumnElementConfig {
    top: Sprite,
    btm: Sprite;
    topHit: Sprite,
    btmHit: Sprite;
    container: Container;
    repositionAtX: number;
    repositionX: number;
    repositionY: number;
    positionVariationMin: Point;
    positionVariationMax: Point;
    spacingVariationMin: number;
    spacingVariationMax: number;
}