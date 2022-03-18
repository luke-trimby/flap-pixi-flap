import gsap from "gsap";
import { DisplayObject } from "pixi.js";

export function FadeFromTo(displayObject: DisplayObject, from: number, to: number, duration: number): Promise<any> {
    return new Promise((resolve: (value?: any) => void) => {
        displayObject.alpha = from;
        displayObject.visible = true;

        gsap.to(displayObject, {
            alpha: to,
            duration,
            onComplete: () => {
                displayObject.visible = Boolean(displayObject.alpha);
                resolve();
            }
        });
    });
}