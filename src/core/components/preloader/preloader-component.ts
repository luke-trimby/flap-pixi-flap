import { Log } from "enhance-log";
import { Container, Graphics, Sprite, Text } from "pixi.js";
import { SignalBinding } from "signals";
import { FadeFromTo } from "../../commands/animation/fade-from-to";
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
    protected loadingLogo: Sprite;
    protected loadingLogoTargetY: number;
    protected loadingLogoTravelY: number;
    protected stageLoadBinding: SignalBinding;

    public init(): void {
        Log.d(`[PreloaderComponent] Initialising`);
        this.layer = Services.get(LayerService).getLayer("preloader-layer");
        this.loadingLogoTargetY = 375;
        this.loadingLogoTravelY = 50;

        this.createLoadingBar();

        this.preloaderService = Services.get(PreloaderSerice);
        this.preloaderService.onLoadingProgress.add(
            (progress: number, loaded: number, total: number) => this.onLoadingProgress(progress, loaded, total)
        );
        this.stageLoadBinding = this.preloaderService.onStageLoaded.add(
            (name: string, current: number, total: number) => this.onStageLoaded(name, current, total)
        );
    }

    public hidePreloader(duration: number = 1): Promise<any> {
        return FadeFromTo(this.layer, 1, 0, duration).then(() => this.layer.removeChildren());
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
        if (this.loadingLogo) {
            this.loadingLogo.position.y = this.loadingLogoTargetY + (this.loadingLogoTravelY - (this.loadingLogoTravelY * scale));
        }
    }

    protected onStageLoaded(name: string, current: number, total: number): void {
        if (name === "PreloaderAssets") {
            this.createLoadingAssets();
            this.stageLoadBinding.detach();
        }
    }

    protected createLoadingBar(): void {
        const barBacking = new Graphics().beginFill(0xff82ac, 1).drawRect(0, 0, 446, 19).endFill();
        barBacking.position.set(47, 498);
        this.layer.addChild(barBacking);

        this.loaderBar = new Graphics().beginFill(0xEA1E63, 1).drawRect(0, 0, 440, 15).endFill();
        this.loaderBar.position.set(50, 500);
        this.loaderBar.scale.x = 0;
        this.layer.addChild(this.loaderBar);

        this.loadingText = new Text("0 %", { fill: 0xffffff, "fontSize": 15 });
        this.loadingText.position.set(275, 501);
        this.loadingText.anchor.set(0.5, 0.1);
        this.layer.addChild(this.loadingText);
    }

    protected createLoadingAssets(): void {
        this.loadingLogo = Services.get(AssetService).createSprite("logo");
        this.loadingLogo.position.set(110, this.loadingLogoTargetY + this.loadingLogoTravelY);
        this.layer.addChild(this.loadingLogo);

        const logoMask: Graphics = new Graphics().beginFill(0x00ff00, 0.4).drawRect(0, 0, 440, 140).endFill();
        logoMask.position.set(50, 350);
        this.layer.addChild(logoMask);

        this.loadingLogo.mask = logoMask;
    }
}