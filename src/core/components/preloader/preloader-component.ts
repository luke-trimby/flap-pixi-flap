import { Log } from "enhance-log";
import { Container, Graphics } from "pixi.js";
import { SignalBinding } from "signals";
import { AbstractComponent } from "../../data/abstract/abstract-component";
import { AssetService } from "../../services/asset/asset-service";
import { LayerService } from "../../services/layer/layer-service";
import { PreloaderSerice } from "../../services/preloader/preloader-service";
import { Services } from "../../services/services";
import { limitToRange } from "../../utils/number-utils";

export class PreloaderComponent extends AbstractComponent {

    protected layer: Container;
    protected loaderBar: Graphics;
    protected stageLoadBinding: SignalBinding;

    public init(): void {
        Log.d(`[PreloaderComponent] Initialising`);
        this.layer = Services.get(LayerService).getLayer("preloader-layer");

        this.createLoadingBar();

        Services.get(PreloaderSerice).onLoadingProgress.add((progress: number, loaded: number, total: number) => this.onLoadingProgress(progress, loaded, total));
        this.stageLoadBinding = Services.get(PreloaderSerice).onStageLoaded.add((name: string, current: number, total: number) => this.onStageLoaded(name, current, total));
    }

    protected onLoadingProgress(progress: number, loaded: number, total: number): void {
        const segment: number = 100 / total;
        const previous: number = segment * loaded;
        const thisSegment: number = segment * (progress / 100);
        const currentPercentage: number = (previous + thisSegment) / 100;
        this.loaderBar.scale.x = limitToRange(0, 1, currentPercentage);
    }

    protected onStageLoaded(name: string, current: number, total: number): void {
        if (name === "PreloaderAssets") {
            this.createLoadingAssets();
            this.stageLoadBinding.detach();
        }
    }

    protected createLoadingBar(): void {
        this.loaderBar = new Graphics()
            .beginFill(0xEA1E63, 1)
            .drawRect(0, 0, 440, 10)
            .endFill();
        this.loaderBar.position.set(50, 450);
        this.loaderBar.scale.x = 0;

        this.layer.addChild(this.loaderBar);
    }

    protected createLoadingAssets(): void {
        const logo = Services.get(AssetService).createSprite("logo");
        logo.position.set( 110, 330 );
        this.layer.addChild(logo);
    }
}