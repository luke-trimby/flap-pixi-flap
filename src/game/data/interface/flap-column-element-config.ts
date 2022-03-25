import { PolySprite } from "../../../core/graphics/poly-sprite";

export interface IColumnElementConfig {
    top: PolySprite,
    btm: PolySprite;
    scoreAwarded: boolean;
    despawnX: number;
}