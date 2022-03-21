import { Container } from "pixi.js";
import { SignalBinding } from "signals";
import { Components } from "../../core/components/components";
import { LayerService } from "../../core/services/layer/layer-service";
import { Services } from "../../core/services/services";
import { State } from "../../core/services/state-machine/state";
import { PromiseChain, PromiseDelay, PromiseWrap } from "../../core/utils/promise-utils";
import { FlapBackgroundComponent } from "../components/flap-background-component";
import { FlapColumnComponent } from "../components/flap-column-component";
import { FlapMenuComponent } from "../components/flap-menu-component";
import { FlapPixiComponent } from "../components/flap-pixi-component";
import { FlapScoreComponent } from "../components/flap-score-component";

export class GameState extends State {

    protected layer: Container;
    protected layerService: LayerService;
    protected pixiComponent: FlapPixiComponent;
    protected columnComponent: FlapColumnComponent;
    protected backgroundComponent: FlapBackgroundComponent;
    protected scoreComponent: FlapScoreComponent;
    protected pixiBinding: SignalBinding;

    constructor(name: string, init: boolean = false) {
        super(name, init);
        this.layerService = Services.get(LayerService);
        this.pixiComponent = Components.get(FlapPixiComponent);
        this.columnComponent = Components.get(FlapColumnComponent);
        this.backgroundComponent = Components.get(FlapBackgroundComponent);
        this.scoreComponent = Components.get(FlapScoreComponent);
    }

    public onEnter(): Promise<any> {
        return new Promise<any>((resolve: (value?: any) => any) => {
            this.layer = this.layerService.getLayer("pixi");
            this.pixiComponent.enableUserInteraction();
            this.columnComponent.enableHitTesting();
            this.pixiBinding = this.pixiComponent.onPixiDeath.addOnce(() => this.onPixiDeath().then(() => resolve()));
        }).then(() => this.complete());
    }

    protected onPixiDeath(): Promise<any> {
        const flapMenuComponent: FlapMenuComponent = Components.get(FlapMenuComponent);

        this.pixiBinding.detach();

        return PromiseChain([
            () => PromiseWrap(() => {
                this.backgroundComponent.setMoving(false);
                this.layerService.getLayer("menu").alpha = 1;
                flapMenuComponent.showGameNameText(false);
                flapMenuComponent.showLukeTrimbyText(false);
                flapMenuComponent.showPlayButton(false);
            }),
            () => this.scoreComponent.show(false, 1),
            () => flapMenuComponent.showGameOverText(true, 0.5),
            () => this.columnComponent.show(false, 1),
            () => PromiseWrap(() => this.columnComponent.destroy()),
            () => PromiseDelay(2),
            () => flapMenuComponent.show(false, 0.5)
        ]);
    }
}