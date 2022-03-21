import { Log } from "enhance-log";
import { Container } from "pixi.js";
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
    protected flapPixiComponent: FlapPixiComponent;
    protected flapColumnComponent: FlapColumnComponent;
    protected flapBackgroundComponent: FlapBackgroundComponent;
    protected flapScoreComponent: FlapScoreComponent;

    constructor(name: string, init: boolean = false) {
        super(name, init);
        this.layerService = Services.get(LayerService);
        this.flapPixiComponent = Components.get(FlapPixiComponent);
        this.flapColumnComponent = Components.get(FlapColumnComponent);
        this.flapBackgroundComponent = Components.get(FlapBackgroundComponent);
        this.flapScoreComponent = Components.get(FlapScoreComponent);
    }

    public onEnter(): Promise<any> {
        return new Promise<any>((resolve: (value?: any) => any) => {
            this.layer = this.layerService.getLayer("pixi");
            this.flapPixiComponent.enableUserInteraction();
            this.flapPixiComponent.onPixiDeath.addOnce(() => this.onPixiDeath().then(() => resolve()));
        }).then(() => this.complete());
    }

    protected onPixiDeath(): Promise<any> {
        const flapMenuComponent: FlapMenuComponent = Components.get(FlapMenuComponent);

        return PromiseChain([
            () => PromiseWrap(() => {
                this.flapBackgroundComponent.setMoving(false);
                this.flapColumnComponent.setMoving(false);
                this.layerService.getLayer("menu").alpha = 1;
                flapMenuComponent.showGameNameText(false);
                flapMenuComponent.showLukeTrimbyText(false);
                flapMenuComponent.showPlayButton(false);
            }),
            () => this.flapScoreComponent.show(false, 1),
            () => flapMenuComponent.showGameOverText(true, 0.5),
            () => PromiseDelay(2),
            () => flapMenuComponent.show(false, 0.5)
        ]);
    }
}