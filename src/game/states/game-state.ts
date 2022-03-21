import { Container } from "pixi.js";
import { Components } from "../../core/components/components";
import { LayerService } from "../../core/services/layer/layer-service";
import { Services } from "../../core/services/services";
import { State } from "../../core/services/state-machine/state";
import { FlapPixiComponent } from "../components/flap-pixi-component";

export class GameState extends State {

    protected layer: Container;

    public onEnter(): Promise<any> {
        return new Promise<any>((resolve: (value?: any) => any, reject: (value?: any) => any) => {
            this.layer = Services.get(LayerService).getLayer("pixi");
            const flapPixiComponent: FlapPixiComponent = Components.get(FlapPixiComponent);
            flapPixiComponent.enableUserInteraction();
            flapPixiComponent.onPixiDeath.addOnce(() => resolve());
        }).then(() => this.complete())
    }
}