import { Log } from "enhance-log";
import { Container } from "pixi.js";
import { AbstractComponent } from "../../core/data/abstract/abstract-component";
import { AssetService } from "../../core/services/asset/asset-service";
import { CanvasService } from "../../core/services/canvas/canvas-service";
import { LayerService } from "../../core/services/layer/layer-service";
import { Services } from "../../core/services/services";
import { randomRangeInt } from "../../core/utils/number-utils";
import { parallaxElements } from "../data/config/flap-parallax-elements";
import { IParallaxElementConfig } from "../data/interface/flap-parallax-element-config";

export class FlapBackgroundComponent extends AbstractComponent {

    protected backgroundLayers: Container[];
    protected speed: number;
    protected moving: boolean;

    public init(): void {
        Log.d(`[FlapBackgroundComponent] Initialising`);
        this.speed = 1;
        this.moving = true;
        this.backgroundLayers = [];
    }

    public create(): Promise<any> {
        return new Promise((resolve: (value?: any) => any, reject: (value?: any) => any) => {
            const layerService: LayerService = Services.get(LayerService);
            const assetService: AssetService = Services.get(AssetService);
            parallaxElements.forEach((configs: IParallaxElementConfig[], index: number) => {
                const layer: Container = layerService.getLayer(`bg-${index}`);
                configs.forEach((config: IParallaxElementConfig) => {
                    config.sprite = assetService.createSprite(config.assetName, config.assetAtlas);
                    config.sprite.name = config.assetName;
                    config.sprite.x = config.position.x + randomRangeInt(config.positionVariationMin.x, config.positionVariationMax.x);
                    config.sprite.y = config.position.y + randomRangeInt(config.positionVariationMin.y, config.positionVariationMax.y);
                    config.sprite.scale.set(config.scale.width, config.scale.height);
                    layer.addChild(config.sprite);
                });
            });

            Services.get(CanvasService).registerForUpdates(() => this.onUpdate());
            resolve();
        });
    }

    protected onUpdate(): void {
        if (this.moving) {
            parallaxElements.forEach((configs: IParallaxElementConfig[]) => {
                configs.forEach((config: IParallaxElementConfig) => {
                    const nextX: number = config.sprite.x -= this.speed * config.speed;
                    if (nextX <= config.repositionAtX) {
                        config.sprite.x = config.repositionX + randomRangeInt(config.positionVariationMin.x, config.positionVariationMax.x);
                        config.sprite.y = config.position.y + randomRangeInt(config.positionVariationMin.y, config.positionVariationMax.y);
                    } else {
                        config.sprite.x -= this.speed * config.speed;
                    }
                });
            });
        }
    }
}