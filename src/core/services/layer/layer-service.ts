import { Log } from "enhance-log";
import { AbstractService } from "../../data/abstract/abstract-service";
import { ILayerConfig } from "../../data/interface/layer-config";
import { CanvasService } from "../canvas/canvas-service";
import { Services } from "../services";
import { Container } from "pixi.js";

export class LayerService extends AbstractService {

    protected gameStage: PIXI.Container;

    public init(): void {
        Log.d(`[LayerService] Initialising`);
        this.gameStage = Services.get(CanvasService).stage;
    }

    public registerLayers(...layerConfigs: ILayerConfig[]): void {
        layerConfigs.forEach((config: ILayerConfig) => {
            const layer: Container = new Container();
            layer.name = config.name;
            this.gameStage.addChild(layer);
        });
    }
}