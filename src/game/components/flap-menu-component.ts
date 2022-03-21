import { Container, Sprite, Text } from "pixi.js";
import { Signal } from "signals";
import { FadeFromTo } from "../../core/commands/animation/fade-from-to";
import { AbstractComponent } from "../../core/data/abstract/abstract-component";
import { AssetService } from "../../core/services/asset/asset-service";
import { LayerService } from "../../core/services/layer/layer-service";
import { Services } from "../../core/services/services";
import { flapGameNameTextStyle, flapGameOverTextStyle, flapLukeTrimbyTextStyle } from "../data/config/flap-text-styles";

export class FlapMenuComponent extends AbstractComponent {

    public onPlayButtonPressed: Signal;
    protected layer: Container;
    protected playButton: Sprite;
    protected gameNameText: Text;
    protected gameOverText: Text;
    protected lukeTrimbyText: Text;

    public init(): void {
        this.layer = Services.get(LayerService).getLayer("menu");
        this.onPlayButtonPressed = new Signal();
    }

    public create(): void {
        this.layer.visible = true;

        this.playButton = Services.get(AssetService).createSprite("playButton");
        this.playButton.anchor.set(0.5);
        this.playButton.position.set(260, 450);
        this.playButton.alpha = 1;
        this.layer.addChild(this.playButton);

        this.gameNameText = new Text("FLAP PIXI\nFLAP", flapGameNameTextStyle);
        this.gameNameText.anchor.set(0.5);
        this.gameNameText.position.set(270, 200);
        this.layer.addChild(this.gameNameText);

        this.gameOverText = new Text("GAME\nOVER", flapGameOverTextStyle);
        this.gameOverText.anchor.set(0.5);
        this.gameOverText.position.set(270, 270);
        this.gameOverText.alpha = 0;
        this.layer.addChild(this.gameOverText);

        this.lukeTrimbyText = new Text("Luke Trimby - 2022", flapLukeTrimbyTextStyle);
        this.lukeTrimbyText.position.set(520, 850);
        this.lukeTrimbyText.anchor.set(1, 0.5);
        this.layer.addChild(this.lukeTrimbyText);
        FadeFromTo(this.lukeTrimbyText, 0, 1, 2);

        this.playButton.buttonMode = true;
        this.playButton.interactive = true;
        this.playButton.on("pointerdown", () => this.onPlayButtonPressed.dispatch());
    }

    public setInteractionEnabled(enabled: boolean = true): void {
        this.playButton.interactive = enabled;
    }

    public show(show: boolean = true, duration: number = 0): Promise<any> {
        return FadeFromTo(this.layer, Number(!show), Number(show), duration);
    }

    public showPlayButton(show: boolean = true, duration: number = 0): Promise<any> {
        return FadeFromTo(this.playButton, Number(!show), Number(show), duration);
    }

    public showGameNameText(show: boolean = true, duration: number = 0): Promise<any> {
        return FadeFromTo(this.gameNameText, Number(!show), Number(show), duration);
    }

    public showGameOverText(show: boolean = true, duration: number = 0): Promise<any> {
        return FadeFromTo(this.gameOverText, Number(!show), Number(show), duration);
    }

    public showLukeTrimbyText(show: boolean = true, duration: number = 0): Promise<any> {
        return FadeFromTo(this.lukeTrimbyText, Number(!show), Number(show), duration);
    }
}