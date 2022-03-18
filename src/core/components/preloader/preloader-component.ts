import { Log } from "enhance-log";
import { Container, Graphics, Text } from "pixi.js";
import { SignalBinding } from "signals";
import { AbstractComponent } from "../../data/abstract/abstract-component";
import { AssetService } from "../../services/asset/asset-service";
import { LayerService } from "../../services/layer/layer-service";
import { PreloaderSerice } from "../../services/preloader/preloader-service";
import { Services } from "../../services/services";
import { limitToRange } from "../../utils/number-utils";

export class PreloaderComponent extends AbstractComponent {

    protected preloaderService: PreloaderSerice;
    protected layer: Container;
    protected loaderBar: Graphics;
    protected loadingText: Text;
    protected stageLoadBinding: SignalBinding;

    public init(): void {
        Log.d(`[PreloaderComponent] Initialising`);
        this.layer = Services.get(LayerService).getLayer("preloader-layer");

        this.createLoadingBar();

        this.preloaderService = Services.get(PreloaderSerice);
        this.preloaderService.onLoadingProgress.add(
            (progress: number, loaded: number, total: number) => this.onLoadingProgress(progress, loaded, total)
        );
        this.stageLoadBinding = this.preloaderService.onStageLoaded.add(
            (name: string, current: number, total: number) => this.onStageLoaded(name, current, total)
        );
    }

    protected onLoadingProgress(progress: number, loaded: number, total: number): void {
        const segment: number = 100 / total;
        const previous: number = segment * loaded;
        const thisSegment: number = segment * (progress / 100);
        const percentage: number = previous + thisSegment;
        const scale: number = percentage / 100;
        this.loaderBar.scale.x = limitToRange(0, 1, scale);
        if (this.loadingText) {
            this.loadingText.text = `${percentage} %`;
        }
    }

    protected onStageLoaded(name: string, current: number, total: number): void {
        if (name === "PreloaderAssets") {
            this.createLoadingAssets();
            this.stageLoadBinding.detach();
        }
    }

    protected createLoadingBar(): void {
        const barBacking = new Graphics().beginFill(0x222222, 1).drawRect(0, 0, 450, 25).endFill();
        barBacking.position.set(45, 495);
        this.layer.addChild(barBacking);

        this.loaderBar = new Graphics().beginFill(0xEA1E63, 1).drawRect(0, 0, 440, 15).endFill();
        this.loaderBar.position.set(50, 500);
        this.loaderBar.scale.x = 0;
        this.layer.addChild(this.loaderBar);

        this.loadingText = new Text("0 %", { fill: "#ffffff", "fontSize": 16 });
        this.loadingText.position.set(275, 500);
        this.loadingText.anchor.set(0.5, 0.1);
        this.layer.addChild(this.loadingText);
    }

    protected createLoadingAssets(): void {
        const logo = Services.get(AssetService).createSprite("logo");
        logo.position.set(110, 375);
        this.layer.addChild(logo);
    }
}