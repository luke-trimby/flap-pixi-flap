import { Log } from "enhance-log";
import { Container } from "pixi.js";
import { AbstractService } from "../../data/abstract/abstract-service";
import { ILayerConfig } from "../../data/interface/layer-config";
import { CanvasService } from "../canvas/canvas-service";
import { Services } from "../services";

export class LayerService extends AbstractService {

    protected gameStage: PIXI.Container;
    protected layers: Container[];

    public init(): void {
        Log.d(`[LayerService] Initialising`);
        this.layers = [];
        this.gameStage = Services.get(CanvasService).stage;
    }

    public registerLayers(...layerConfigs: ILayerConfig[]): void {
        layerConfigs.forEach((config: ILayerConfig) => {
            const layer: Container = new Container();
            layer.name = config.name;
            Log.i(`[LayerService] Adding layer`, config.name);
            this.layers.push(layer);
            this.gameStage.addChild(layer);
        });
    }

    public hasLayer(name: string): boolean {
        return this.layers.findIndex((layer: Container) => layer.name === name) > -1;
    }

    public getLayer(name: string): Container {
        return this.layers.find((layer: Container) => layer.name === name);
    }
}