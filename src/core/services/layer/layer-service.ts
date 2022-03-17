import { AbstractService } from "../../data/abstract/abstract-service";
import { CanvasService } from "../canvas/canvas-service";
import { Services } from "../services";

export class LayerService extends AbstractService {

    protected gameStage: PIXI.Container;

    public init(): void {
        this.gameStage = Services.get(CanvasService).stage;
    }

    public registerLayers(...layers: PIXI.Container[]): void {
        [...layers].forEach((layer: PIXI.Container) => this.gameStage.addChild(layer));
    }
}