import gsap from "gsap";
import { Container, Text } from "pixi.js";
import { Components } from "../../core/components/components";
import { LayerService } from "../../core/services/layer/layer-service";
import { Services } from "../../core/services/services";
import { State } from "../../core/services/state-machine/state";
import { PromiseChain, PromiseWrap } from "../../core/utils/promise-utils";
import { FlapBackgroundComponent } from "../components/flap-background-component";
import { FlapColumnComponent } from "../components/flap-column-component";
import { FlapMenuComponent } from "../components/flap-menu-component";
import { FlapPixiComponent } from "../components/flap-pixi-component";
import { FlapScoreComponent } from "../components/flap-score-component";
import { flapCountdownTextStyle } from "../data/config/flap-text-styles";
import { ColumnSpeed } from "../data/flap-column-speed";

export class GameIntroState extends State {

    protected layer: Container;
    protected layerService: LayerService;
    protected pixiComponent: FlapPixiComponent;
    protected columnComponent: FlapColumnComponent;
    protected backgroundComponent: FlapBackgroundComponent;
    protected scoreComponent: FlapScoreComponent;
    protected menuComponent: FlapMenuComponent;
    protected countDownText: Text;

    constructor(name: string, init: boolean = false) {
        super(name, init);
        this.layer = Services.get(LayerService).getLayer("game-intro");
        this.pixiComponent = Components.get(FlapPixiComponent);
        this.columnComponent = Components.get(FlapColumnComponent);
        this.backgroundComponent = Components.get(FlapBackgroundComponent);
        this.scoreComponent = Components.get(FlapScoreComponent);
        this.menuComponent = Components.get(FlapMenuComponent);
    }

    public onEnter(): Promise<any> {
        this.countDownText = new Text("", flapCountdownTextStyle);
        this.countDownText.anchor.set(0.5, 0.5);
        this.countDownText.position.set(270, 350);
        this.layer.addChild(this.countDownText);

        const chain: Array<() => Promise<any>> = [
            () => PromiseWrap(() => {
                this.pixiComponent.create();
                this.columnComponent.create();
                this.columnComponent.setMoving();
                this.backgroundComponent.setSpeed(0.1);
                this.backgroundComponent.setMoving();
                this.backgroundComponent.setSpeed(1, 1);
                this.pixiComponent.playIntro();
                this.scoreComponent.resetScore();
                this.columnComponent.setSpeed(ColumnSpeed.NORMAL, 1);
                this.menuComponent.setInteractionEnabled(false);
            }),
            () => this.scoreComponent.show(true, 1),
            () => this.countDown("3"),
            () => this.countDown("2"),
            () => this.countDown("1"),
            () => this.countDown("GO!")
        ];

        return PromiseChain(chain).then(() => this.complete());
    }

    public onExit(): Promise<any> {
        return PromiseWrap(() => this.layer.removeChildren());
    }

    protected countDown(text: string): Promise<any> {
        return new Promise<any>((resolve: (value?: any) => any) => {
            this.countDownText.text = text;

            const alphaText: Text = new Text(text, flapCountdownTextStyle);
            alphaText.alpha = 0.5;
            alphaText.anchor.set(0.5, 0.5);
            alphaText.position.set(270, 350);
            this.layer.addChild(alphaText);

            gsap.to(alphaText.scale, { duration: 1, x: 12, y: 12 });
            gsap.to(alphaText, { alpha: 0, duration: 1, onComplete: () => resolve() });
        });
    }
}