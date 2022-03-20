import { Log } from "enhance-log";
import { Container } from "pixi.js";
import { AbstractComponent } from "../../core/data/abstract/abstract-component";
import { LayerService } from "../../core/services/layer/layer-service";
import { Services } from "../../core/services/services";

export class FlapPixiComponent extends AbstractComponent {

    protected layer: Container;

    public init(): void {
        Log.d(`[FlapPixiComponent] - init`);
        this.layer = Services.get(LayerService).getLayer("pixi");
    }
}