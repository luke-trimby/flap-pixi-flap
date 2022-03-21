import gsap from "gsap";
import { Container, Sprite } from "pixi.js";
import { Signal } from "signals";
import { AbstractComponent } from "../../core/data/abstract/abstract-component";
import { AssetService } from "../../core/services/asset/asset-service";
import { LayerService } from "../../core/services/layer/layer-service";
import { Services } from "../../core/services/services";

export class FlapMenuComponent extends AbstractComponent {

    public onPlayButtonPressed: Signal;
    protected layer: Container;
    protected playButton: Sprite;

    public init(): void {
        this.layer = Services.get(LayerService).getLayer("menu");
        this.layer.alpha = 1;
        this.onPlayButtonPressed = new Signal();
    }

    public create(): Promise<any> {
        return new Promise<any>((resolve: (value?: any) => any) => {
            this.layer.visible = true;
            this.layer.alpha = 1;
            this.playButton = Services.get(AssetService).createSprite("playButton");
            this.playButton.anchor.set(0.5);
            this.playButton.position.set(260, 450);
            this.playButton.alpha = 0;
            this.layer.addChild(this.playButton);

            gsap.to(this.playButton, {
                alpha: 1,
                duration: 1,
                delay: 1,
                onComplete: () => this.addPlayButtonListener()
            });
        });
    }

    protected addPlayButtonListener(): void {
        this.playButton.buttonMode = true;
        this.playButton.interactive = true;
        this.playButton.once("pointerdown", () => this.onPlayButtonPressed.dispatch());
    }
}