import { Point, Sprite, TilingSprite } from "pixi.js";
import { Size } from "../../../core/data/size";

export interface IParallaxElementConfig {
    assetName: string;
    assetAtlas: string;
    speed: number;
    scale: Point;
    position: Point;
    tiled: boolean;
    size?: Size;
    positionVariationMin?: Point;
    positionVariationMax?: Point;
    sprite?: Sprite | TilingSprite;
    repositionAtX?: number;
    repositionX?: number;
}