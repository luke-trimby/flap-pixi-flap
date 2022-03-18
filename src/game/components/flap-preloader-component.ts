import { Log } from "enhance-log";
import { Container, Text } from "pixi.js";
import { SignalBinding } from "signals";
import { AbstractComponent } from "../../core/data/abstract/abstract-component";
import { AssetService } from "../../core/services/asset/asset-service";
import { LayerService } from "../../core/services/layer/layer-service";
import { PreloaderSerice } from "../../core/services/preloader/preloader-service";
import { Services } from "../../core/services/services";

export class FlapPreloaderComponent extends AbstractComponent {

    protected layer: Container;
    protected stageLoadBinding: SignalBinding;

    public init(): void {
        Log.d(`[FlapPreloaderComponent] Initialising`);
        this.layer = Services.get(LayerService).getLayer("preloader-layer");

        this.stageLoadBinding = Services.get(PreloaderSerice).onStageLoaded.add(
            (name: string, current: number, total: number) => this.onStageLoaded(name, current, total)
        );
    }

    protected onStageLoaded(name: string, current: number, total: number): void {
        if (name === "GameAssets") {
            this.createLoadingAssets();
            this.stageLoadBinding.detach();
        }
    }

    protected createLoadingAssets(): void {
        const gitHubLogo = Services.get(AssetService).createSprite("github");
        gitHubLogo.position.set(40, 850);
        gitHubLogo.anchor.set(0.5, 0.5);
        gitHubLogo.scale.set(0.4, 0.4);
        this.layer.addChild(gitHubLogo);

        const githubText = new Text("luke-trimby", { fill: 0xdddddd, "fontSize": 15 });
        githubText.position.set(60, 850);
        githubText.anchor.set(0, 0.5);
        this.layer.addChild(githubText);

        const emailText = new Text("luketrimby@outlook.com", { fill: 0xdddddd, "fontSize": 15 });
        emailText.position.set(500, 850);
        emailText.anchor.set(1, 0.5);
        this.layer.addChild(emailText);
    }
}