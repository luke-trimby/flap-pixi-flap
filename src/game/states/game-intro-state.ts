import { Log } from "enhance-log";
import gsap from "gsap";
import { Container, Text } from "pixi.js";
import { LayerService } from "../../core/services/layer/layer-service";
import { Services } from "../../core/services/services";
import { State } from "../../core/services/state-machine/state";
import { flapCountdownTextStyle } from "../data/config/flap-countdown-text-style";

export class GameIntroState extends State {

    protected layer: Container;
    protected countDownText: Text;

    public onEnter(): Promise<any> {
        this.layer = Services.get(LayerService).getLayer("game-intro");

        this.countDownText = new Text("", flapCountdownTextStyle);
        this.countDownText.anchor.set(0.5, 0.5);
        this.countDownText.position.set(270, 460);
        this.layer.addChild(this.countDownText);

        const promises: Array<Promise<any>> = [];
        ["3", "2", "1", "GO!"].forEach((text: string, index: number) => promises.push(this.placeAndHighlightText(text, index)));
        return Promise.all(promises).then(() => this.complete());
    }

    public onExit(): Promise<any> {
        return new Promise<any>((resolve: (value?: any) => any, reject: (value?: any) => any) => {
            this.layer.removeChildren();
            resolve();
        });
    }

    protected countdown(text: string): Promise<any> {
        return new Promise<any>((resolve: (value?: any) => any, reject: (value?: any) => any) => {
            Log.i(`Lukas - `, text);
        });
    }

    protected placeAndHighlightText(text: string, index: number): Promise<any> {
        return new Promise<any>((resolve: (value?: any) => any, reject: (value?: any) => any) => {
            setTimeout(() => {
                this.countDownText.text = text;

                const alphaText: Text = new Text(text, flapCountdownTextStyle);
                alphaText.alpha = 0.5;
                alphaText.anchor.set(0.5, 0.5);
                alphaText.position.set(270, 460);
                this.layer.addChild(alphaText);

                gsap.to(alphaText.scale, { duration: 1, x: 12, y: 12 });
                gsap.to(alphaText, { alpha: 0, duration: 1, onComplete: () => resolve() });
            }, 1000 * index);
        });
    }
}