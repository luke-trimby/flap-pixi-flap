import { Point, Sprite } from "pixi.js";
import { Size } from "../../../core/data/size";

export interface IParallaxElementConfig {
    assetName: string;
    assetAtlas: string;
    speed: number;
    scale: Size;
    position: Point;
    positionVariationMin: Point;
    positionVariationMax: Point;
    sprite?: Sprite;
    repositionAtX: number;
    repositionX: number;
}