import gsap from "gsap";
import { Container } from "pixi.js";
import { Components } from "../../core/components/components";
import { LayerService } from "../../core/services/layer/layer-service";
import { Services } from "../../core/services/services";
import { State } from "../../core/services/state-machine/state";
import { PromiseChain, PromiseDelay, PromiseWrap } from "../../core/utils/promise-utils";
import { FlapBackgroundComponent } from "../components/flap-background-component";
import { FlapColumnComponent } from "../components/flap-column-component";
import { FlapMenuComponent } from "../components/flap-menu-component";
import { ColumnSpeed } from "../data/flap-column-speed";

export class MenuState extends State {

    protected menuComponent: FlapMenuComponent;
    protected backgroundComponent: FlapBackgroundComponent;
    protected flapColumnComponent: FlapColumnComponent;

    constructor(name: string, init: boolean = false) {
        super(name, init);
        this.menuComponent = Components.get(FlapMenuComponent);
        this.backgroundComponent = Components.get(FlapBackgroundComponent);
        this.flapColumnComponent = Components.get(FlapColumnComponent);
    }

    public onEnter(): Promise<any> {
        return PromiseChain([
            () => this.menuComponent.showGameOverText(false),
            () => this.menuComponent.showGameNameText(true),
            () => this.menuComponent.showLukeTrimbyText(true),
            () => this.menuComponent.showPlayButton(true),
            () => PromiseDelay(1),
            () => this.menuComponent.show(true, 0.5),
            () => PromiseWrap(() => {
                this.backgroundComponent.setSpeed(0.1);
                this.backgroundComponent.setMoving();
                this.flapColumnComponent.setSpeed(ColumnSpeed.SLOW);
                this.flapColumnComponent.setMoving(false);
                this.menuComponent.setInteractionEnabled(true);
                this.menuComponent.onPlayButtonPressed.addOnce(() => this.onPlayButtonPressed());
            })
        ]);
    }

    protected onPlayButtonPressed(): void {
        const layerService: LayerService = Services.get(LayerService);
        const menuLayer: Container = layerService.getLayer("menu");
        gsap.to(menuLayer, { alpha: 0, duration: 0.5 });
        this.complete();
    }
}